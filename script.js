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

  const puzzleComputer = document.getElementById("puzzle-computer");
  const puzzleBook = document.getElementById("puzzle-book");
  const puzzleModal = document.getElementById("puzzle-modal");
  const puzzleModalImg = document.getElementById("puzzle-modal-img");

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
      up: "lobby",
      down: "labroom",
      left: "storage",
      right: "corridor"
    },
    "lobby": {
      img: "files/room_looby.png",
      up: null,
      down: "lab",
      left: null,
      right: "corner"
    },
    "corner": {
      img: "files/room_corner.png",
      up: null,
      down: "corridor",
      left: "lobby",
      right: null
    },
    "corridor": {
      img: "files/room_corridor.png",
      up: "corner",
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

  let currentRoomId = "labroom";

  startBtn.addEventListener("click", () => {
    mainScreen.style.display = "none";
    gameScreen.style.display = "block";

    currentRoomId = "labroom";
    updateRoom(currentRoomId);

    howToPlayBtn.remove();
    howToPlayModal.remove();
  });

  howToPlayBtn.addEventListener("click", () => {
    howToPlayModal.style.display = "flex";
  });

  howToPlayModal.addEventListener("click", (event) => {
    if (event.target === howToPlayModal) {
      howToPlayModal.style.display = "none";
    }
  });

  puzzleComputer.addEventListener("click", () => {
    puzzleModalImg.src = "files/computerfull.png";
    puzzleModal.style.display = "flex";
  });

  puzzleBook.addEventListener("click", () => {
    puzzleModalImg.src = "files/bookfull.png";
    puzzleModal.style.display = "flex";
  });

  puzzleModal.addEventListener("click", (event) => {
    if (event.target === puzzleModal) {
      puzzleModal.style.display = "none";
    }
  });

  function updateRoom(roomId) {
    const room = rooms[roomId];
    if (!room) return;

    currentRoomId = roomId;
    roomImage.src = room.img;

    arrowUp.style.display = room.up ? "block" : "none";
    arrowDown.style.display = room.down ? "block" : "none";
    arrowLeft.style.display = room.left ? "block" : "none";
    arrowRight.style.display = room.right ? "block" : "none";

    puzzleComputer.style.display = (roomId === "labroom") ? "block" : "none";
    puzzleBook.style.display = (roomId === "lab") ? "block" : "none";
  }

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
