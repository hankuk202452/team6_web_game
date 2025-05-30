document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const howToPlayBtn = document.getElementById("howtoplay-btn");
  const mainScreen = document.getElementById("main-screen");
  const gameScreen = document.getElementById("game-screen");
  const howToPlayModal = document.getElementById("howtoplay-modal");

  const roomImage = document.getElementById("room-image");
  const arrowUp = document.getElementById("arrow-up");
  const arrowLeft = document.getElementById("arrow-left");
  const arrowRight = document.getElementById("arrow-right");
  const arrowDown = document.getElementById("arrow-down");

  // 방별 이동 경로 (roomId: { 이미지, 연결된 방 })
  // 연결된 방이 없으면 null 또는 undefined
  // 좌우상하 순서로 연결 방 명시
  // 상: up, 하: down, 좌: left, 우: right
  const rooms = {
    "labroom": {
      img: "files/room_labroom.png",
      up: "lab",
      down: null,
      left: null,
      right: null
    },
    "lab": {
      img: "files/room_lab.png",
      up: null,
      down: "labroom",
      left: "storage",
      right: "corridor"
    },
    "corridor": {
      img: "files/room_corridor.png",
      up: null,
      down: null,
      left: "lab",
      right: null
    },
    "storage": {
      img: "files/room_storage.png",
      up: null,
      down: null,
      left: null,
      right: "lab"
    }
  };

  // 현재 위치 방 id 저장
  let currentRoomId = "labroom";

  // 시작 버튼 클릭 시 게임 시작
  startBtn.addEventListener("click", () => {
    mainScreen.style.display = "none";
    gameScreen.style.display = "block";

    currentRoomId = "labroom";
    updateRoom(currentRoomId);

    // 시작하면 설명 버튼과 모달 제거
    howToPlayBtn.remove();
    howToPlayModal.remove();
  });

  // 설명 버튼 클릭 시
  howToPlayBtn.addEventListener("click", () => {
    howToPlayModal.style.display = "flex";
  });

  // 설명 모달 클릭하면 닫기
  howToPlayModal.addEventListener("click", (event) => {
    if (event.target === howToPlayModal) {
      howToPlayModal.style.display = "none";
    }
  });

  // 방 이동 함수
  function updateRoom(roomId) {
    const room = rooms[roomId];
    if (!room) return;

    currentRoomId = roomId;
    roomImage.src = room.img;

    // 화살표 표시 업데이트
    arrowUp.style.display = room.up ? "block" : "none";
    arrowDown.style.display = room.down ? "block" : "none";
    arrowLeft.style.display = room.left ? "block" : "none";
    arrowRight.style.display = room.right ? "block" : "none";
  }

  // 화살표 클릭 이벤트 등록
  arrowUp.addEventListener("click", () => {
    const nextRoom = rooms[currentRoomId].up;
    if (nextRoom) updateRoom(nextRoom);
  });

  arrowDown.addEventListener("click", () => {
    const nextRoom = rooms[currentRoomId].down;
    if (nextRoom) updateRoom(nextRoom);
  });

  arrowLeft.addEventListener("click", () => {
    const nextRoom = rooms[currentRoomId].left;
    if (nextRoom) updateRoom(nextRoom);
  });

  arrowRight.addEventListener("click", () => {
    const nextRoom = rooms[currentRoomId].right;
    if (nextRoom) updateRoom(nextRoom);
  });
});
