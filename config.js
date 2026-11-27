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
      // 한 줄을 { text, url } 로 적으면 누를 수 있는 링크가 됩니다
      { text: "문의: 인스타그램 @yesim_christian", url: "https://www.instagram.com/yesim_christian/" },
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
      // 거울에 비친 사람 부분을 잘라낸 사진이라 360도가 아닌 314도입니다. (세로 각도는 원래 360도 사진과 같게)
      hfov: 314, vfov: 100,
      startYaw: -10,
      hotspots: [
        { type: "go", to: "hall4f", yaw: -19, pitch: 12,  label: "4층" },
        { type: "go", to: "hall3f", yaw: -19, pitch: -2,  label: "3층" },
        { type: "go", to: "elevator1f", yaw: -19, pitch: -16, label: "1층" },
        { type: "info", yaw: 6, pitch: 5, label: "5층 · 준비 중", title: "5층도 예임교회예요", body: "지금은 새 공간을 준비하고 있어요. 다음에 꼭 보여 드릴게요!" },
      ],
    },

    hall3f: {
      name: "3층",
      image: "photos/3f-hall.jpg",
      hfov: 360,
      startYaw: -130,
      hotspots: [
        { type: "go", to: "room3f", yaw: -139, pitch: -4, label: "안으로 들어가기" },
        { type: "go", to: "elevator", yaw: 41, pitch: -6, label: "엘리베이터" },
      ],
    },

    room3f: {
      name: "3층 안쪽",
      image: "photos/3f-room.jpg",
      hfov: 360,
      startYaw: -130,
      hotspots: [
        { type: "go", to: "cafe", yaw: -146, pitch: 4, label: "카페로" },
        { type: "go", to: "hall3f", yaw: 22, pitch: -4, label: "엘리베이터 쪽으로" },
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
          body: "주일 대예배  주일 오전 11시\n청년 예배  금요일 저녁 7시 30분\n수요 예배  수요일 저녁 7시 30분",
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

    // 360도가 아닌 넓은 각도 사진 (폰 0.6배 렌즈). 좌우 130도, 위아래 84도쯤 담겨 있습니다.
    cafe: {
      name: "카페 예:O",
      image: "photos/cafe.jpg",
      hfov: 130, vfov: 84,
      startYaw: 0,
      hotspots: [
        { type: "cafe", yaw: -2, pitch: -6, label: "커피 받기" },
        { type: "go", to: "room3f", yaw: 52, pitch: -4, label: "돌아가기" },
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

  // 따라 치기 곡. 악기 화면에 곡 버튼이 생기고, 다음에 칠 것에 불이 켜지며 누를 때까지 기다려 줍니다.
  //   parts  : 첫 줄은 멜로디(건반으로 따라 칠 음), 다음 줄부터 반주 성부. "음이름:박자", 쉼표는 R:박자
  //            맞게 누를 때마다 그 부분의 반주가 같이 울립니다. 멜로디는 C4 ~ E5 안에 있어야 건반에 나옵니다.
  //   tempo  : 반주 빠르기 (1분에 4분음표 몇 개).  meter : 한 마디 박 수.  pickup : 못갖춘마디 박 수 (없으면 생략)
  //   chords : 기타, 베이스, 드럼용 코드. 마디마다 하나, 한 마디에 둘이면 C-G 처럼. G C D Em Am F A 를 쓸 수 있습니다.
  //            반주와 맞도록 악보의 화음에 맞춰 적어야 합니다.
  //   drums  : (선택) 드럼에서 칠 순서. kick snare hat open tom crash. 없으면 코드마다 킥, 스네어, 끝에 크래시
  //   notes  : parts 없이 멜로디만 넣을 때 (반주 없음). 예: "C4 D4 E4"
  // 저작권이 끝난 곡조와 편곡만 넣어주세요. 아래 세 곡은 Open Hymnal Project 의 공개(public domain) 악보에서 옮겼습니다.
  songs: [
    // NEW BRITAIN, 1831 / 편곡 Edwin O. Excell, 1900
    { title: "나 같은 죄인 살리신", tempo: 90, meter: 3, pickup: 1,
      chords: "G G-D Em-C G | G G-D G G | G G C G | Em-G G-D G G",
      parts: [
        "D4:1 G4:2 B4:0.5 G4:0.5 B4:2 A4:1 G4:2 E4:1 D4:2 D4:1 G4:2 B4:0.5 G4:0.5 B4:2 A4:1 D5:5 B4:1 D5:1.5 B4:0.5 D5:0.5 B4:0.5 G4:2 D4:1 E4:1.5 G4:0.5 G4:0.5 E4:0.5 D4:2 D4:1 G4:2 B4:0.5 G4:0.5 B4:2 A4:1 G4:5",
        "B3:1 B3:2 D4:1 D4:2 C4:1 B3:2 C4:1 B3:2 B3:1 B3:2 D4:1 D4:2 D4:1 D4:5 D4:1 D4:2 D4:1 D4:2 D4:1 C4:1.5 D4:0.5 C4:1 B3:2 D4:1 B3:2 D4:1 G4:2 F#4:1 D4:5",
        "G3:1 D3:2 G3:1 G3:2 F#3:1 G3:2 G3:1 G3:2 G3:1 D3:2 G3:1 G3:2 F#3:1 G3:5 G3:1 B3:1.5 G3:0.5 B3:0.5 G3:0.5 G3:2 G3:1 G3:2 E3:0.5 G3:0.5 G3:2 G3:1 G3:2 G3:0.5 B3:0.5 D4:2 C4:1 B3:5",
        "G2:1 G2:2 G2:0.5 B2:0.5 D3:2 D3:1 E3:2 C3:1 G2:2 G2:1 G2:2 G2:0.5 B2:0.5 D3:2 C3:1 B2:5 G2:1 G3:2 G3:1 B2:2 B2:1 C3:1.5 B2:0.5 C3:1 G2:2 B2:1 E3:2 D3:1 D3:2 D3:1 G3:5",
      ] },
    // 베토벤 환희의 송가 / 편곡 The Methodist Hymnal, 1905
    { title: "기뻐하며 경배하세", tempo: 112, meter: 4,
      chords: "G D-G G G-D | G-C Am G D-G | D-G D-G D-G A-D | G-C Am G D-G",
      parts: [
        "B4:1 B4:1 C5:1 D5:1 D5:1 C5:1 B4:1 A4:1 G4:1 G4:1 A4:1 B4:1 B4:1.5 A4:0.5 A4:2 B4:1 B4:1 C5:1 D5:1 D5:1 C5:1 B4:1 A4:1 G4:1 G4:1 A4:1 B4:1 A4:1.5 G4:0.5 G4:2 A4:1 A4:1 B4:1 G4:1 A4:1 B4:0.5 C5:0.5 B4:1 G4:1 A4:1 B4:0.5 C5:0.5 B4:1 A4:1 G4:1 A4:1 D4:2 B4:1 B4:1 C5:1 D5:1 D5:1 C5:1 B4:1 A4:1 G4:1 G4:1 A4:1 B4:1 A4:1.5 G4:0.5 G4:2",
        "D4:1 D4:1 D4:1 D4:1 D4:1 E4:0.5 F#4:0.5 G4:1 D4:1 D4:1 D4:1 F#4:1 G4:1 G4:1.5 F#4:0.5 F#4:2 G4:1 D4:1 E4:1 F4:1 F4:1 E4:1 D4:1 E4:1 D4:1 D4:1 F#4:1 G4:1 F#4:1.5 G4:0.5 G4:2 F#4:1 D4:1 D4:1 G4:1 F#4:1 G4:0.5 F#4:0.5 G4:1 G4:1 F#4:1 F#4:1 F#4:1 D#4:1 E4:0.5 D4:0.5 C#4:1 D4:2 D4:1 D4:1 E4:1 F4:1 F4:1 E4:1 D4:1 E4:1 D4:1 D4:1 F#4:1 G4:1 F#4:1.5 G4:0.5 G4:2",
        "G3:1 G3:1 A3:1 B3:1 B3:1 A3:1 G3:1 F#3:1 G3:1 B3:1 C4:1 D4:1 D4:1.5 D4:0.5 D4:2 D4:1 D4:1 C4:1 B3:1 G3:1 A3:1 B3:1 C4:1 B3:1 B3:1 C4:1 D4:1 C4:1.5 B3:0.5 B3:2 D4:1 F#3:1 G3:1 B3:1 C4:1 B3:0.5 A3:0.5 G3:1 B3:1 C4:1 B3:0.5 A3:0.5 B3:1 B3:1 B3:1 A3:0.5 G3:0.5 F#3:2 G3:1 D4:1 C4:1 B3:1 G3:1 A3:1 B3:1 C4:1 B3:1 B3:1 C4:1 D4:1 C4:1.5 B3:0.5 B3:2",
        "G3:1 G3:1 G3:1 G3:1 D3:1 D3:1 D3:1 C3:1 B2:1 B2:1 A2:1 G2:1 D3:1.5 D3:0.5 D3:2 G3:1 G3:1 G3:1 G3:1 C3:1 C3:1 C3:1 C3:1 D3:1 D3:1 D3:1 D3:1 D3:1.5 G3:0.5 G3:2 D3:1 D3:1 D3:1 D3:1 D3:1 D3:1 D3:1 D3:1 D3:1 D3:1 D#3:1 B2:1 E3:1 A2:1 D3:2 G3:1 G3:1 G3:1 G3:1 C3:1 C3:1 C3:1 C3:1 D3:1 D3:1 D3:1 D3:1 D3:1.5 G3:0.5 G3:2",
      ] },
    // William B. Bradbury, 1862 / 편곡 같은 사람, 1866 (원래 Eb 를 C 로 옮김)
    { title: "예수 사랑하심은", tempo: 112, meter: 4,
      chords: "C C F C | C C F-C G-C | C F C G | C F C C",
      parts: [
        "G4:1 E4:1 E4:1 D4:1 E4:1 G4:1 G4:2 A4:1 A4:1 C5:1 A4:1 A4:1 G4:1 G4:2 G4:1 E4:1 E4:1 D4:1 E4:1 G4:1 G4:2 A4:1 A4:1 G4:1 C4:1 E4:1 D4:1 C4:2 G4:2 E4:1 G4:1 A4:1 C5:3 G4:2 E4:1 C4:1 E4:1 D4:3 G4:2 E4:1 G4:1 A4:1 C5:2 A4:1 G4:1 C4:1 E4:1.5 D4:0.5 C4:4",
        "E4:1 C4:1 C4:1 B3:1 C4:1 E4:1 E4:2 F4:1 F4:1 A4:1 F4:1 F4:1 E4:1 E4:2 E4:1 C4:1 C4:1 B3:1 C4:1 E4:1 E4:2 F4:1 F4:1 E4:1 C4:1 C4:1 B3:1 C4:2 E4:2 C4:1 E4:1 F4:1 A4:3 E4:2 C4:1 C4:1 C4:1 B3:3 C4:2 C4:1 E4:1 F4:1 A4:2 F4:1 E4:1 C4:1 C4:1.5 B3:0.5 C4:4",
        "G3:1 G3:1 G3:1 G3:1 G3:1 G3:1 G3:2 F3:1 F3:1 F3:1 F3:1 F3:1 G3:1 G3:2 G3:1 G3:1 G3:1 G3:1 G3:1 G3:1 G3:2 F3:1 F3:1 E3:1 E3:1 G3:1 F3:1 E3:2 E3:2 G3:1 C4:1 C4:1 C4:3 C4:2 G3:1 G3:1 G3:1 G3:3 G3:2 G3:1 C4:1 C4:1 C4:2 C4:1 C4:1 G3:1 G3:1.5 F3:0.5 E3:4",
        "C3:1 C3:1 C3:1 G2:1 C3:1 C3:1 C3:2 F2:1 F2:1 F2:1 A2:1 C3:1 C3:1 C3:2 C3:1 C3:1 C3:1 G2:1 C3:1 C3:1 C3:2 F2:1 A2:1 C3:1 C3:1 G3:1 G2:1 C3:2 C3:2 C3:1 C3:1 F2:1 F2:3 C3:2 C3:1 E3:1 G2:1 G2:3 E3:2 C3:1 C3:1 F2:1 F2:2 A2:1 C3:1 E3:1 G3:1.5 G2:0.5 C3:4",
      ] },
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
    title: "카페 예:O",
    image: "photos/cafe-counter.jpg",   // 메뉴 위에 나오는 사진 (없으면 생략)
    intro: "한 잔 골라보세요.",
    menu: ["아메리카노", "카페라떼", "유자차", "아이스티"],
    // 쿠폰 화면에 나오는 문구. 실제로 음료를 드릴 계획이 없으면 문구를 바꿔주세요.
    couponTitle: "음료 한 잔 쿠폰",
    couponNote: "교회에 오셔서 카페에서 이 화면을 보여주세요.",
  },
  // 도트 게임 모드 (game.html). 위에서 내려다보는 지도를 걸어 다니며 사람과 이야기하고, 미션을 따라 교회를 둘러봅니다.
  // 지도는 한 칸에 한 글자입니다.
  //   . 타일 바닥   , 나무 바닥   _ 무대   # 벽   w 창문 벽   x 십자가 벽   b 책장   h 긴 의자
  //   t 탁자   c 의자   k 카운터   p 화분   g 유리문   D 문   L 강대상   (빈칸) 막힌 곳
  //   E 엘리베이터 (부딪히면 층 고르기, EE 두 칸이면 양쪽 문)   s 계단 (밟으면 지도의 stairs 로 이동, way: "up"/"down")
  // objects 의 type
  //   person : 말 거는 사람. say(대사), sayAt(미션 번호별 대사, done 은 다 했을 때), look(머리, 옷 색)
  //            give: { need, get } 이면 need 아이템을 주고 get 아이템을 받음 (sayGive, sayAfter). cry: 우는 표시
  //            invite: true 면 미션을 다 했을 때 초대장
  //   inst : 악기 (id 는 instruments 의 이름).   cafe : 카페 카운터.   sign : 안내판 (say)
  // finds : 살펴보면 아이템이 나오는 칸.  look : 아무것도 없는 칸을 살펴봤을 때 문구 (지도 글자별)
  // areas : 구역 이름과 "사진으로 보기"에서 열 360도 공간.  quests : 화면 위 미션 (until: talk:사람, get:아이템, coupon, map:지도 …)
  // multi : 함께 접속한 사람이 보이는 곳. server 가 비어 있으면 혼자 하는 게임으로 동작합니다.
  game: {
    title: "시온이의 성경책",
    subtitle: "예임교회에서 잃어버린 성경책을 찾아 주세요",
    start: { map: "1f", x: 6, y: 5, dir: "up" },
    intro: ["방향 버튼으로 걸어 다니고, 사람이나 물건 앞에서 A 를 눌러 보세요.", "어디선가 아이 울음소리가 들려요…"],
    // soon 이 있는 층은 고르면 안내 문구만 나옵니다 (준비 중인 공간)
    elevator: [
      { label: "5층", soon: ["5층도 예임교회예요.", "지금은 새 공간을 준비하고 있어요. 다음에 꼭 보여 드릴게요!"] },
      { label: "4층 본당", map: "4f", x: 4, y: 28, dir: "up" },
      { label: "3층 카페", map: "3f", x: 4, y: 21, dir: "up" },
      { label: "1층", map: "1f", x: 1, y: 1, dir: "down" },
    ],
    items: {
      // icon: 가방 그림 (bible, coupon, ticket, box),  color: 겉 색
      bible: { name: "시온이의 성경책", desc: "앞장에 '시온' 이라고 적힌 작은 파란 성경책", icon: "bible", color: "#2f5fae" },
      // total 이 있으면 여러 개를 모으는 아이템 (가방에 3/6 처럼 나옴). 숨은 곳은 finds 에 적고, 가끔 반짝입니다
      candy: { name: "말랑 캔디", desc: "교회 곳곳에 숨어 있는 달콤한 캔디", icon: "candy", color: "#e8506a", total: 6, doneText: "말랑 캔디 6개를 모두 찾았어요! 대단해요" },
      coupon: { name: "커피 쿠폰", icon: "coupon", desc: "카페 예:O 에서 실제 음료 교환권으로 바꿀 수 있어요" },
    },
    quests: [
      { text: "3층에서 들리는 울음소리를 따라가 보세요", until: "talk:zion" },
      { text: "4층 본당 의자에서 시온이의 성경책을 찾아 보세요", until: "get:bible" },
      { text: "3층의 시온이에게 성경책을 돌려주세요", until: "get:coupon" },
      { text: "카페 예:O 에서 쿠폰을 음료 교환권으로 바꾸세요", until: "coupon" },
      { text: "4층 교회 입구의 안내 집사님께 초대장을 받으세요", until: "talk:guide" },
    ],
    doneText: "미션 완료! 축제 날 교환권을 꼭 쓰세요",
    look: { h: "의자를 살펴봤어요. 아무것도 없어요.", b: "책이 가득 꽂혀 있어요.", t: "탁자 위에는 아무것도 없어요." },
    finds: [
      { map: "4f", x: 13, y: 12, item: "bible", say: ["의자 밑에 작은 파란 성경책이 있어요!", "앞장에 '시온' 이라고 적혀 있어요. 시온이 거예요!"],
        // 성경책을 찾는 동안 다른 의자를 살펴보면: [먼 곳, 가까운 곳, 바로 옆]
        hint: ["여기는 아닌 것 같아요. 시온이는 오른쪽 의자에 앉는다고 했는데…", "이 근처일지도 몰라요. 조금만 더 찾아볼까요?", "바로 옆 의자 같아요! 거의 다 왔어요."] },
      { map: "1f", x: 7, y: 1, item: "candy", say: ["의자 위에 말랑 캔디가 하나 있어요!"] },
      { map: "3f", x: 10, y: 4, item: "candy", say: ["카페 탁자 위에 말랑 캔디가 있어요!"] },
      { map: "3f", x: 1, y: 10, item: "candy", say: ["책 사이에 말랑 캔디가 끼어 있어요!"] },
      { map: "3f", x: 8, y: 12, item: "candy", say: ["탁자 밑에 말랑 캔디가 떨어져 있어요!"] },
      { map: "4f", x: 3, y: 8, item: "candy", say: ["의자 위에 말랑 캔디가 있어요!"] },
      { map: "4f", x: 11, y: 18, item: "candy", say: ["책장 위에 말랑 캔디가 숨어 있어요!"] },
    ],
    multi: {
      server: "",                     // 배포한 실시간 서버 주소 (예: wss://church-tour-room.아이디.workers.dev). 비우면 혼자 하기
      room: "yeim",
      zone: { map: "4f", x: 0, y: 0, w: 22, h: 17, name: "본당" },   // 이 안에 있을 때만 서로 보임
      emotes: ["반가워요", "아멘", "할렐루야", "👏"],
    },
    maps: {
      "1f": {
        name: "1층",
        rows: [
          "#EE##w##w###",
          "#.....hhh..#",
          "#..........#",
          "#.p......p.#",
          "#..........#",
          "#..........#",
          "####gggg####",
        ],
        areas: [{ x: 0, y: 0, w: 12, h: 7, name: "1층 엘리베이터 앞", scene: "elevator1f" }],
        objects: [
          { type: "person", id: "greeter", x: 8, y: 4, dir: "left", name: "안내 청년", look: { hair: "#4a3020", shirt: "#4f8a3c" },
            say: ["안녕하세요! 예임교회에 오신 걸 환영해요.", "교회는 이 건물 3층부터 5층까지예요. 5층은 지금 준비 중이에요.", "그런데… 3층에서 아이 울음소리가 들리는 것 같아요.", "왼쪽 위 엘리베이터로 걸어가면 층을 고를 수 있어요."],
            sayAt: { "done": ["미션을 다 하셨군요! 축제 날 꼭 만나요."] } },
          { type: "sign", x: 4, y: 0, say: ["건물 안내 · 예임교회", "3층: 카페 예:O\n4층: 본당\n5층: 준비 중", "엘리베이터를 타고 올라오세요."] },
        ],
      },
      "4f": {
        name: "4층",
        stairs: { to: "3f", way: "down", x: 3, y: 20, dir: "right", label: "계단으로 3층에 내려왔어요" },
        rows: [
          "########x#############",
          "#.._____L_____.......#",
          "#..___________.......#",
          "#...................##",
          "#...................w ",
          "#...................# ",
          "#.hhhhhh..hhhhhh...w# ",
          "#..................#  ",
          "#.hhhhhh..hhhhhh...w  ",
          "#.................##  ",
          "#.hhhhhh..hhhhhh..w   ",
          "#.................#   ",
          "#.hhhhhh..hhhhh..w#   ",
          "#................#    ",
          "#.hhhhhh..hhhhh..w    ",
          "#...............##    ",
          "#...............#     ",
          "######D##########     ",
          "#........bbbb..##     ",
          "#..............#      ",
          "#..............#      ",
          "#.............##      ",
          "#............p#       ",
          "######g########       ",
          "#............##       ",
          "#............#        ",
          "#ss..........#        ",
          "#ss.........##        ",
          "#ss.........#         ",
          "####EE#######         ",
        ],
        areas: [
          { x: 0, y: 0, w: 22, h: 5, name: "본당 무대", scene: "stage" },
          { x: 0, y: 5, w: 22, h: 12, name: "본당", scene: "sanctuary" },
          { x: 0, y: 17, w: 22, h: 6, name: "교회 입구", scene: "lobby4f" },
          { x: 0, y: 23, w: 22, h: 7, name: "4층 엘리베이터 앞", scene: "hall4f" },
        ],
        objects: [
          { type: "inst", id: "piano", x: 3, y: 3 },
          { type: "inst", id: "keys2", x: 5, y: 3 },
          { type: "inst", id: "bass", x: 13, y: 3 },
          { type: "inst", id: "drums", x: 16, y: 2 },
          { type: "inst", id: "eguitar", x: 18, y: 2 },
          { type: "inst", id: "aguitar", x: 17, y: 3 },
          { type: "person", id: "band", x: 11, y: 4, dir: "down", name: "찬양팀", look: { hair: "#5a3a22", shirt: "#3a6fb5" },
            say: ["찬양팀이에요! 무대에 악기가 여섯 개 있어요.", "악기 앞에서 A 를 누르면 연주할 수 있어요.", "곡을 고르면 불이 켜진 곳만 따라 누르면 돼요. 반주도 같이 나와요!"],
            sayAt: { "1": ["성경책? 무대 쪽에서는 못 봤어요.", "시온이는 늘 오른쪽 의자에 앉던데요?"] } },
          { type: "person", id: "pastor", x: 8, y: 3, dir: "down", name: "목사님", look: { hair: "#3b3b3b", shirt: "#1f2a44" },
            say: ["할렐루야! 예임교회에 오신 모든 분들 축복합니다.", "주일 대예배는 오전 11시예요. 편하게 오세요."] },
          { type: "person", id: "guide", x: 10, y: 20, dir: "down", name: "안내 집사님", look: { hair: "#6b6b6b", shirt: "#2f6f4f" }, invite: true,
            say: ["반가워요! 저는 안내를 맡고 있어요.", "3층에서 시온이가 울고 있던데, 한번 가 보시겠어요?"],
            sayAt: {
              "4": ["시온이를 도와주셨다면서요? 정말 고마워요.", "11월 29일 주일 오전 11시, 이곳에서 기다릴게요.", "초대장을 드릴게요!"],
              "done": ["또 와 주셨네요! 초대장을 다시 보여 드릴게요.", "주일 대예배는 오전 11시, 청년 예배와 수요 예배는 저녁 7시 30분이에요."],
            } },
          { type: "sign", x: 5, y: 17, say: ["예수님이 임재하시는 교회", "예임교회 · Since 2010"] },
          { type: "sign", x: 8, y: 17, say: ["예배 안내", "주일 대예배: 주일 오전 11시\n청년 예배: 금요일 저녁 7시 30분\n수요 예배: 수요일 저녁 7시 30분"] },
        ],
      },
      "3f": {
        name: "3층",
        stairs: { to: "4f", way: "up", x: 3, y: 27, dir: "right", label: "계단으로 4층에 올라왔어요" },
        rows: [
          "############x#####",
          "#,,,,,,,,,,,,,,,,#",
          "#,,,,,,,,kkkkk,,,#",
          "#,,,,,,,,,,,,,,,##",
          "#,,tt,,,,ctt,t,,# ",
          "#,,c,,,,,,ttct,,# ",
          "#,,,,,,,,,,,,,,## ",
          "#b,,,,,,,,,,,,,#  ",
          "#b,,,,,,,,,,,,,#  ",
          "#b,,,,ctt,,,,,##  ",
          "#b,,,,,,,,,,,,#   ",
          "#b,,,,,,,,,,,##   ",
          "#b,,,,ctt,,,,#    ",
          "#b,,,,,,,,,,,#    ",
          "#b,,,,,,,,p,##    ",
          "#b,,,,,,,,,,#     ",
          "####D########     ",
          "#..........##     ",
          "#..........#      ",
          "#ss........#      ",
          "#ss.......##      ",
          "#ss.......#       ",
          "####EE#####       ",
        ],
        areas: [
          { x: 0, y: 0, w: 18, h: 7, name: "카페 예:O", scene: "cafe" },
          { x: 0, y: 7, w: 18, h: 9, name: "3층 안쪽", scene: "room3f" },
          { x: 0, y: 16, w: 18, h: 7, name: "3층 엘리베이터 앞", scene: "hall3f" },
        ],
        objects: [
          { type: "cafe", x: 11, y: 2 },
          { type: "person", id: "barista", x: 11, y: 1, dir: "down", name: "바리스타", look: { hair: "#3b2a20", shirt: "#1f2a44" },
            say: ["어서 오세요, 카페 예:O 입니다!", "커피 쿠폰이 있으면 카운터에서 A 를 눌러 주세요.", "실제 음료 교환권으로 바꿔 드려요."] },
          { type: "person", id: "zion", x: 3, y: 12, dir: "down", name: "시온", look: { hair: "#3b2a20", shirt: "#7fb3d5" }, cry: true,
            say: ["흑흑… 제 파란 성경책이 없어졌어요.", "아까 4층 본당 예배 때 의자에 두고 온 것 같아요…", "찾아 주실 수 있어요?"],
            give: { need: "bible", get: "coupon" },
            sayGive: ["앗, 제 성경책이에요! 찾아 주셔서 고마워요!", "이거 받으세요. 엄마가 준 커피 쿠폰이에요.", "카페 예:O 에 가져가면 진짜 음료로 바꿔 줘요!"],
            sayAfter: ["성경책 찾아 주셔서 고마워요!", "시온은 성경에도 나오는 이름이에요. 하나님이 사랑하시는 곳이래요."] },
          { type: "person", id: "friend", x: 10, y: 8, dir: "left", name: "교회 친구", look: { hair: "#8a5a2b", shirt: "#c0392b" },
            say: ["여기는 3층이에요. 책도 읽고, 이야기도 나누고, 커피도 마시는 곳이에요.", "4층으로는 저기 계단으로도 갈 수 있어요."] },
        ],
      },
    },
  },
};
