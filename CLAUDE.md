# 온라인 교회 투어

교회 사진으로 만드는 360도 가상 투어. 전도축제 초대 링크용이며 다른 교회도 쓰도록 공개하는 프로젝트.
무엇을 왜 만드는지, 남은 일과 범위는 `PLAN.md` 를 먼저 읽을 것. 홍보 계획은 `MARKETING.md`.
`PLAN.md` 11번의 "사용자에게 확인할 것"은 추측해서 채우지 말고 물어볼 것.

## 규칙
- 정적 파일만 쓴다. 빌드 도구, 프레임워크, npm 의존성, 서버, DB 를 추가하지 않는다.
- `index.html` 은 모든 교회가 같이 쓰는 엔진이다. 특정 교회의 이름, 문구, 좌표, 사진 경로를 넣지 않는다.
  예외: 맨 위의 공유 미리보기(`og:`) 메타 태그. 미리보기 수집기는 JS 를 실행하지 않아 `config.js` 로 뺄 수 없다.
- 교회별 내용은 `config.js` 와 `photos/` 에만 둔다. 새 기능은 `config.js` 에서 켜고 끌 수 있게 만들고, 설정이 없어도 동작하는 기본값을 둔다.
- 소리는 Web Audio 로 합성한다. 음원 파일, 찬양 가사를 저장소에 넣지 않는다. 곡은 저작권이 끝난 것만 넣는다.
- 사진에 사람 얼굴이 보이면 올리기 전에 사용자에게 알린다.
- 화면 문구는 한국어, 처음 교회에 오는 사람이 읽는다고 생각하고 쓴다.
- 모바일 세로 화면(폭 390px)을 기준으로 먼저 확인한다.
- `config.js` 형식을 바꾸면 `README.md` 도 같이 고친다.

## 실행
```
python3 -m http.server 8000
```
- 투어: http://localhost:8000
- 좌표 찾기: http://localhost:8000/#edit (사진을 누르면 yaw, pitch 가 나온다)

## 코드 위치 (index.html 의 script 안)
- WebGL 파노라마, 시점: `draw`, `rayAt`, `project`, `clampView`
- 사진 불러오기, 임시 배경: `loadScene`, `setCover`, `placeholder`
- 표시(핫스팟): `buildSpots`, `act`, `go`
- 악기: `INST`, `openInst`, `renderKeys`, `renderDrums`, `renderStrings`
- 따라 치기: 곡 데이터 `songModel`, 코드 구간 `chordWindows`, 곡 버튼 `songRow`/`songsFor`, 건반은 `renderKeys` 안의 `follow`, 드럼 `drumSeq`, 각 `render*` 안의 `mark`/`advance`
- 따라 치기 반주: `playSpan`(구간 반주, 앞 구간 취소), `playVoice`(배경 음악과 같은 음색)
- 소리: `noteOn`(건반), `ksBuffer`/`pluck`(줄), `drum`
- 배경 음악: `parseTimed`, `bgmStart`, `bgmPump`(미리 예약), `bgmNote`, `bgmDuck`(악기 열 때 줄임)
- 카페: `openCafe`
- 다른 페이지에 넣기: `#embed` (`Q`, `notify`, `userClose`). game.html 이 iframe 으로 쓴다

## 도트 게임 (game.html 의 script 안)
- 그림: `TILE`(바닥, 벽), `THING`(악기, 물건), `personImg`(사람 16x16 도트, `POSE`)
- 지도, 움직임: `maps`, `walkable`, `tryMove`, `tick`(rAF + 타이머 보조), `draw`
- 살펴보기, 대화, 엘리베이터: `interact`, `talk`/`advance`, `elevatorMenu`/`menuPick`
- 할 일: `emit`, `updateQuest`. 투어 화면 띄우기: `openTour`, `message` 수신
- 소리: `chipStart`/`chipPump`(bgm 을 사각파로), `blip`, `ding`, `fanfare`
