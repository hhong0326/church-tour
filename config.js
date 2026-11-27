/*
 * 온라인 교회 투어 설정 파일
 * 이 파일만 고치면 우리 교회 투어가 됩니다. index.html 은 건드리지 않아도 됩니다.
 *
 * 좌표 찾는 법: 주소 끝에 #edit 를 붙여 열고, 사진에서 원하는 곳을 누르면
 * yaw / pitch 값이 나옵니다. 그 값을 아래 hotspots 에 붙여 넣으세요.
 *   yaw   : 좌우 각도 (-180 ~ 180, 사진 가운데가 0)
 *   pitch : 상하 각도 (-90 ~ 90, 수평이 0, 위가 +)
 */
window.TOUR = {
  church: {
    name: "예임교회",
    tagline: "문을 열고 천천히 둘러보세요",
  },

  // 오른쪽 위 "초대장" 버튼과 첫 화면에 나오는 내용
  invite: {
    title: "예임교회로 초대합니다",
    lines: [
      "일시: 11월 29일 주일 오전 11시",
      "장소: 서울특별시 광진구 용마산로 171, 4층 예임교회",
      "문의: 연락처를 적어주세요",
    ],
    note: "처음 오시는 분도 편하게 오세요. 4층에서 내리시면 안내해 드립니다.",
    // 초대장 아래 "지도 보기" 버튼. 없으면 버튼이 나오지 않습니다.
    map: "https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B4%91%EC%A7%84%EA%B5%AC%20%EC%9A%A9%EB%A7%88%EC%82%B0%EB%A1%9C%20171",
  },

  start: "elevator1f",

  // 동선: 1층 엘리베이터 앞 → 엘리베이터 안 → 4층 엘리베이터 앞 → 교회 입구 → 본당 → 무대
  // 폰 360도 파노라마(가로가 세로의 3.5배쯤)는 hfov: 360 만 적으면 세로 각도는 자동으로 맞춰집니다.
  scenes: {
    elevator1f: {
      name: "1층 엘리베이터 앞",
      image: "photos/elevator-1f.jpg",
      hfov: 360,
      startYaw: -142,
      hotspots: [
        { type: "go", to: "elevator", yaw: -137, pitch: -4, label: "엘리베이터 타기" },
        {
          type: "info", yaw: -95, pitch: 4, label: "환영합니다",
          title: "환영합니다",
          body: "예임교회에 오신 것을 환영합니다.\n엘리베이터를 타고 4층으로 올라오시면 됩니다.",
        },
      ],
    },

    // 엘리베이터 안: 층 버튼 옆에 이동 표시를 붙입니다.
    elevator: {
      name: "엘리베이터",
      image: "photos/elevator-in.jpg",
      hfov: 360,
      startYaw: -125,
      hotspots: [
        { type: "go", to: "hall4f", yaw: -139, pitch: 12,  label: "4층" },
        { type: "go", to: "hall3f", yaw: -139, pitch: -2,  label: "3층" },
        { type: "go", to: "elevator1f", yaw: -139, pitch: -16, label: "1층" },
      ],
    },

    // TODO: 3층 사진을 받으면 hfov 와 좌표를 맞춥니다. 3층에 카페가 있습니다.
    hall3f: {
      name: "3층",
      image: "photos/3f-hall.jpg",
      startYaw: 0,
      hotspots: [
        { type: "go", to: "cafe", yaw: 0, pitch: -6, label: "카페로" },
        { type: "go", to: "elevator", yaw: 180, pitch: -4, label: "엘리베이터" },
      ],
    },

    hall4f: {
      name: "4층",
      image: "photos/4f-hall.jpg",
      hfov: 360,
      startYaw: -150,
      hotspots: [
        { type: "go", to: "lobby4f", yaw: -146, pitch: -6, label: "교회로 들어가기" },
        { type: "go", to: "elevator", yaw: 32, pitch: -6, label: "엘리베이터" },
      ],
    },

    lobby4f: {
      name: "교회 입구",
      image: "photos/4f-lobby.jpg",
      hfov: 360,
      startYaw: -110,
      hotspots: [
        { type: "go", to: "sanctuary", yaw: -140, pitch: -6, label: "본당으로" },
        {
          type: "info", yaw: -140, pitch: 22, label: "예임교회",
          title: "예수님이 임재하시는 교회",
          body: "2010년부터 이 자리에서 함께 예배드리고 있습니다.",
        },
        { type: "go", to: "hall4f", yaw: 16, pitch: -8, label: "엘리베이터 쪽으로" },
      ],
    },

    sanctuary: {
      name: "본당",
      image: "photos/sanctuary.jpg",
      hfov: 360,
      startYaw: -100,
      hotspots: [
        { type: "go", to: "stage", yaw: -135, pitch: -8, label: "무대 앞으로" },
        {
          type: "info", yaw: -137, pitch: 12, label: "예배 안내",
          title: "예배 안내",
          body: "예배 시간표를 여기에 적어주세요.",
        },
        { type: "go", to: "lobby4f", yaw: 11, pitch: -4, label: "입구로" },
      ],
    },

    stage: {
      name: "무대",
      image: "photos/stage.jpg",
      hfov: 360,
      startYaw: 30,
      hotspots: [
        // 악기: id 는 아래 instruments 의 이름입니다. 없는 악기는 줄을 지우면 됩니다.
        { type: "instrument", id: "piano",   yaw: -16, pitch: -8,  label: "피아노" },
        { type: "instrument", id: "keys2",   yaw: 4,   pitch: -10, label: "세컨 피아노" },
        { type: "instrument", id: "bass",    yaw: 52,  pitch: -8,  label: "베이스" },
        { type: "instrument", id: "drums",   yaw: 84,  pitch: 0,   label: "드럼" },
        { type: "instrument", id: "aguitar", yaw: 106, pitch: -8,  label: "통기타" },
        { type: "instrument", id: "eguitar", yaw: 128, pitch: -2,  label: "일렉 기타" },
        { type: "go", to: "sanctuary", yaw: 20, pitch: 4, label: "본당 뒤쪽으로" },
      ],
    },

    // TODO: 카페 사진을 받으면 hfov 와 좌표를 맞춥니다.
    cafe: {
      name: "카페",
      image: "photos/cafe.jpg",
      startYaw: 0,
      hotspots: [
        { type: "cafe", yaw: 0, pitch: -8, label: "커피 받기" },
        { type: "go", to: "hall3f", yaw: 180, pitch: -6, label: "3층 복도로" },
      ],
    },
  },

  // 연주할 수 있는 악기. image 는 연주 화면 위에 나오는 사진입니다 (없으면 생략됩니다).
  // kind: keys(건반) / drums(드럼 패드) / strings(코드 + 줄)
  // sound: 건반은 piano, epiano / 줄 악기는 acoustic, electric, bass
  instruments: {
    piano:   { name: "피아노",     kind: "keys",    sound: "piano",    image: "photos/inst-piano.jpg" },
    keys2:   { name: "세컨 피아노", kind: "keys",    sound: "epiano",   image: "photos/inst-keys2.jpg" },
    drums:   { name: "드럼",       kind: "drums",                      image: "photos/inst-drums.jpg" },
    bass:    { name: "베이스",     kind: "strings", sound: "bass",     image: "photos/inst-bass.jpg" },
    eguitar: { name: "일렉 기타",   kind: "strings", sound: "electric", image: "photos/inst-eguitar.jpg" },
    aguitar: { name: "통기타",     kind: "strings", sound: "acoustic", image: "photos/inst-aguitar.jpg" },
  },

  // 따라 칠 수 있는 곡. 다음에 칠 것에 불이 켜지고, 누를 때까지 기다려 줍니다.
  //   notes  : 건반용 멜로디. C4(가운데 도) ~ E5 범위, 반음은 F#4 처럼 적습니다.
  //   chords : 기타, 베이스, 드럼용 코드 진행. G C D Em Am F 를 쓸 수 있습니다.
  //            | 는 마디 구분(읽기 편하라고 넣는 것), C-G 는 한 마디에 두 코드입니다.
  //   drums  : (선택) 드럼에서 칠 순서. kick snare hat open tom crash 를 적습니다.
  //            없으면 코드 하나마다 "킥, 스네어"를 치고 마지막에 크래시를 칩니다.
  // 저작권이 끝난 곡만 넣어주세요. (아래 세 곡은 모두 1800년대 이전 곡조입니다)
  songs: [
    { title: "나 같은 죄인 살리신",
      notes: "D4 G4 B4 G4 B4 A4 G4 E4 D4  D4 G4 B4 G4 B4 A4 D5  B4 D5 B4 D5 B4 G4 D4 E4 G4 G4 E4 D4  D4 G4 B4 G4 B4 A4 G4",
      chords: "G G C G | G G D D | G G C G | Em D G G" },
    { title: "기뻐하며 경배하세",
      notes: "E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4  E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 D4 C4 C4",
      chords: "C G C G | C G C-G C" },
    { title: "예수 사랑하심은",
      notes: "G4 E4 E4 D4 E4 G4 G4  A4 A4 C5 A4 A4 G4 G4  G4 E4 E4 D4 E4 G4 G4  A4 A4 G4 C4 E4 D4 C4  G4 E4 G4 A4 C5  G4 E4 C4 E4 D4  G4 E4 G4 A4 C5  A4 G4 C4 E4 D4 C4",
      chords: "C C F C | C C G C | C F C G | C F C-G C" },
  ],

  // 배경 음악. 둘러보는 동안 작게 반복됩니다. 끄려면 이 부분을 지우거나 songs 를 비웁니다.
  //   volume : 0 ~ 1 (기본 0.35)
  //   tempo  : 1분에 4분음표 몇 개
  //   parts  : 첫 줄이 멜로디, 다음 줄부터 반주(알토, 테너, 베이스). "음이름:박자" 로 적고, 쉼표는 R:박자
  // 저작권이 끝난 곡조와 편곡만 넣어주세요. 아래 두 곡은 Open Hymnal Project 의 공개(public domain) 악보에서 옮겼습니다.
  bgm: {
    volume: 0.35,
    songs: [
    // TERRA BEATA, 영국 민요 / 편곡 Edward Shippen Barnes, 1926
    { title: "참 아름다워라", tempo: 100,
      parts: [
        "D#4:0.5 F4:0.5 G4:1 A#4:1 G4:1 F4:1 D#4:3 F4:0.5 G4:0.5 G#4:1 C5:1 A#4:1 G4:1 F4:3 C5:1 A#4:1 G4:1 G4:1 F4:0.5 D#4:0.5 G4:1 F4:1 D#4:1 A#3:1 D#4:0.5 F4:0.5 G4:1 A#4:1 F4:0.5 G4:0.5 D#4:3 A#4:1 D#5:1 A#4:1 C5:1 D5:1 D#5:3 D#5:0.5 D5:0.5 C5:1 D#5:1 D5:1 C5:1 A#4:3 C5:0.5 C5:0.5 A#4:1 G4:1 G4:1 F4:0.5 D#4:0.5 G4:1 F4:1 D#4:1 A#3:1 D#4:0.5 F4:0.5 G4:1 A#4:1 F4:0.5 G4:0.5 D#4:3",
        "D#4:1 D#4:1 D#4:1 D#4:1 D4:1 D#4:3 F4:0.5 E4:0.5 F4:1 F4:1 F4:1 D#4:1 D4:3 D4:1 D#4:1 D#4:1 D4:1 C4:1 D4:1 B3:1 C4:1 A#3:1 D#4:1 D#4:1 D#4:1 F4:1 D#4:3 D#4:0.5 F4:0.5 G4:0.5 G#4:0.5 G4:0.5 F4:0.5 D#4:1 G#4:1 G4:3 G4:1 G4:1 G4:1 F4:1 D#4:1 D4:3 D4:0.5 D4:0.5 D#4:1 D#4:1 D#4:1 D4:0.5 C4:0.5 B3:1 D4:1 C4:1 A#3:1 D#4:1 D#4:1 D#4:1 D4:0.5 D4:0.5 D#4:3",
        "G3:0.5 G#3:0.5 A#3:1 A#3:1 A#3:1 G#3:1 G3:3 C4:1 C4:1 G#3:1 F3:1 G3:0.5 G#3:0.5 A#3:3 A#3:1 A#3:1 A#3:1 B3:1 G3:1 G3:1 G3:1 G3:1 G#3:1 G3:0.5 G#3:0.5 A#3:1 A#3:1 G#3:0.5 A#3:0.5 G3:3 G3:0.5 G#3:0.5 A#3:1 A#3:1 G#3:1 G#3:1 A#3:3 C4:0.5 B3:0.5 C4:1 A#3:1 A3:1 G3:0.5 A3:0.5 A#3:3 G#3:0.5 G#3:0.5 G3:1 A#3:1 G3:1 G3:1 G3:1 G3:1 G3:1 G#3:1 G3:0.5 G#3:0.5 A#3:1 A#3:1 G#3:0.5 A#3:0.5 G3:3",
        "D#3:1 D#3:1 G2:1 A#2:1 A#2:1 C3:3 G#3:0.5 G3:0.5 F3:1 D#3:1 D3:1 D#3:1 A#2:3 G#3:1 G3:1 D#3:1 G2:1 C3:1 B2:1 G#2:1 C3:1 D3:1 D#3:1 D#3:1 G2:1 A#2:1 D#3:3 D#3:1 D#3:0.5 F3:0.5 G3:1 G#3:0.5 G3:0.5 F3:1 D#3:3 C3:0.5 D3:0.5 D#3:1 C3:1 F3:1 F3:1 A#3:3 A#2:0.5 A#2:0.5 A#2:1 A#2:1 B2:1 C3:1 G2:1 B2:1 C3:1 D3:1 D#3:1 D#3:1 G2:0.5 G#2:0.5 A#2:0.5 A#2:0.5 D#3:3",
      ] },
    // ANTIOCH, 헨델 원곡 / 편곡 Lowell Mason, 1836
    { title: "기쁘다 구주 오셨네", tempo: 80,
      parts: [
        "D5:1 C#5:0.75 B4:0.25 A4:1.5 G4:0.5 F#4:1 E4:1 D4:1.5 A4:0.5 B4:1.5 B4:0.5 C#5:1.5 C#5:0.5 D5:1.5 D5:0.5 D5:0.5 C#5:0.5 B4:0.5 A4:0.5 A4:0.75 G4:0.25 F#4:0.5 D5:0.5 D5:0.5 C#5:0.5 B4:0.5 A4:0.5 A4:0.75 G4:0.25 F#4:0.5 F#4:0.5 F#4:0.5 F#4:0.5 F#4:0.5 F#4:0.25 G4:0.25 A4:1.5 G4:0.25 F#4:0.25 E4:0.5 E4:0.5 E4:0.5 E4:0.25 F#4:0.25 G4:1.5 F#4:0.25 E4:0.25 D4:0.5 D5:1 B4:0.5 A4:0.75 G4:0.25 F#4:0.5 G4:0.5 F#4:1 E4:1 D4:2",
        "F#4:1 A4:0.75 G4:0.25 F#4:1.5 E4:0.5 D4:1 C#4:1 D4:1.5 D4:0.5 G4:1.5 G4:0.5 E4:1.5 E4:0.5 F#4:1.5 F#4:0.5 F#4:0.5 A4:0.5 G4:0.5 F#4:0.5 F#4:0.75 E4:0.25 D4:0.5 F#4:0.5 F#4:0.5 A4:0.5 G4:0.5 F#4:0.5 F#4:0.75 E4:0.25 D4:0.5 D4:0.5 D4:0.5 D4:0.5 D4:0.5 D4:0.25 E4:0.25 F#4:1.5 E4:0.25 D4:0.25 C#4:0.5 C#4:0.5 C#4:0.5 C#4:0.25 D4:0.25 E4:1.5 D4:0.25 C#4:0.25 D4:0.5 F#4:1 G4:0.5 F#4:0.75 E4:0.25 D4:0.5 E4:0.5 D4:1 C#4:1 D4:2",
        "D4:1 D4:0.75 D4:0.25 D4:1.5 B3:0.5 A3:1.5 G3:0.5 F#3:1.5 D4:0.5 D4:1.5 D4:0.5 A3:1.5 A3:0.5 A3:1.5 A3:0.5 A3:1 D4:1 D4:1.5 A3:0.5 A3:1 D4:1 D4:1.5 R:0.5 R:1.5 A3:0.5 A3:0.5 A3:0.5 A3:0.5 A3:0.5 A3:2 A3:1.5 A3:0.25 G3:0.25 F#3:0.5 A3:1 D4:0.5 D4:1.5 B3:0.5 A3:1 A3:0.5 G3:0.5 F#3:2",
        "D3:1 D3:0.75 D3:0.25 D3:1.5 G2:0.5 A2:1 A2:1 D3:1.5 F#3:0.5 G3:1.5 G3:0.5 A3:1.5 A3:0.5 D3:1.5 D3:0.5 D3:1 D3:1 D3:1.5 D3:0.5 D3:1 D3:1 D3:1.5 R:0.5 R:1.5 D3:0.5 D3:0.5 D3:0.5 D3:0.5 D3:0.5 A3:1.5 A2:0.5 A2:0.5 A2:0.5 A2:0.5 A2:0.5 D3:1.5 D3:0.5 D3:1.5 G2:0.5 A2:1 A2:1 D3:2",
      ] },
    ],
  },

  cafe: {
    title: "교회 카페",
    intro: "한 잔 골라보세요.",
    menu: ["아메리카노", "카페라떼", "유자차", "아이스티"],
    // 쿠폰 화면에 나오는 문구. 실제로 음료를 드릴 계획이 없으면 문구를 바꿔주세요.
    couponTitle: "음료 한 잔 쿠폰",
    couponNote: "교회에 오셔서 카페에서 이 화면을 보여주세요.",
  },
};
