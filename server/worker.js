/*
 * 도트 게임 "함께하기" 서버 (Cloudflare Workers + Durable Objects)
 *
 * 하는 일: 같은 방(room)에 접속한 사람들끼리 캐릭터 위치와 정해진 인사(이모트 번호)만 주고받는다.
 * 하지 않는 일: 이름, 채팅, 로그인, 저장. 접속이 끊기면 아무것도 남지 않는다.
 *
 * 주소: wss://<워커 주소>/room/<방 이름>
 * 게임(game.html)은 config.js 의 game.multi.server 에 이 워커 주소를 적으면 연결한다.
 */
import { DurableObject } from "cloudflare:workers";

const MAX_PEOPLE = 60;          // 한 방 최대 인원
const BURST = 10, PER_SEC = 20; // 위치는 한 번에 10개까지, 그 뒤로는 1초에 20개까지만 받는다
const MIN_EMO_MS = 1000;        // 인사는 1초에 한 번
const DIRS = ["up", "down", "left", "right"];
const COLOR = /^#[0-9a-fA-F]{6}$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const m = url.pathname.match(/^\/room\/([A-Za-z0-9_-]{1,32})$/);
    if (!m) return new Response("church-tour room server", { status: 200 });
    if (request.headers.get("Upgrade") !== "websocket") return new Response("WebSocket only", { status: 426 });
    // 허용한 사이트에서만 접속 (wrangler.toml 의 ALLOWED_ORIGINS, 쉼표로 여러 개)
    const allowed = String(env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
    const origin = request.headers.get("Origin") || "";
    if (allowed.length && !allowed.includes(origin)) return new Response("Forbidden", { status: 403 });
    const stub = env.ROOM.get(env.ROOM.idFromName(m[1]));
    return stub.fetch(request);
  },
};

export class Room extends DurableObject {
  async fetch(request) {
    if (this.ctx.getWebSockets().length >= MAX_PEOPLE) return new Response("Room full", { status: 503 });
    const [client, server] = Object.values(new WebSocketPair());
    this.ctx.acceptWebSocket(server);
    const me = { id: crypto.randomUUID().slice(0, 8), x: 0, y: 0, dir: "down", look: {}, ready: false, tokens: BURST, at: Date.now(), lastEmo: 0 };
    server.serializeAttachment(me);
    // 새로 온 사람에게 지금 있는 사람들을 알려 준다
    const others = this.people().filter((p) => p.ready && p.id !== me.id).map(publicOf);
    server.send(JSON.stringify({ t: "hello", id: me.id, others }));
    return new Response(null, { status: 101, webSocket: client });
  }

  people() {
    return this.ctx.getWebSockets().map((ws) => ws.deserializeAttachment()).filter(Boolean);
  }

  broadcast(from, msg) {
    const text = JSON.stringify(msg);
    for (const ws of this.ctx.getWebSockets()) {
      if (ws === from) continue;
      try { ws.send(text); } catch (e) {}
    }
  }

  async webSocketMessage(ws, raw) {
    if (typeof raw !== "string" || raw.length > 300) return;
    let m;
    try { m = JSON.parse(raw); } catch (e) { return; }
    const me = ws.deserializeAttachment();
    if (!me) return;
    const now = Date.now();
    if (m.t === "pos") {
      me.tokens = Math.min(BURST, me.tokens + ((now - me.at) / 1000) * PER_SEC); me.at = now;
      if (me.tokens < 1) { ws.serializeAttachment(me); return; }
      me.tokens -= 1;
      const x = m.x | 0, y = m.y | 0;
      if (x < 0 || y < 0 || x > 200 || y > 200) return;
      me.x = x; me.y = y; me.dir = DIRS.includes(m.dir) ? m.dir : "down";
      const look = m.look || {};
      me.look = { hair: COLOR.test(look.hair) ? look.hair : "#2b2b2b", shirt: COLOR.test(look.shirt) ? look.shirt : "#3a6fb5" };
      me.ready = true;
      ws.serializeAttachment(me);
      this.broadcast(ws, { t: "pos", ...publicOf(me) });
    } else if (m.t === "emo") {
      const e = m.e | 0;
      if (e < 0 || e > 9 || now - me.lastEmo < MIN_EMO_MS || !me.ready) return;
      me.lastEmo = now;
      ws.serializeAttachment(me);
      this.broadcast(ws, { t: "emo", id: me.id, e });
    }
  }

  async webSocketClose(ws, code, reason) {
    this.leave(ws);
    try { ws.close(code, reason); } catch (e) {}
  }

  async webSocketError(ws) {
    this.leave(ws);
  }

  leave(ws) {
    const me = ws.deserializeAttachment();
    if (me && me.ready) this.broadcast(ws, { t: "leave", id: me.id });
  }
}

function publicOf(p) {
  return { id: p.id, x: p.x, y: p.y, dir: p.dir, look: p.look };
}
