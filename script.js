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

  const puzzleModal = document.getElementById("puzzle-modal");
  const puzzleModalImg = document.getElementById("puzzle-modal-img");
  const questionElement = document.getElementById("question");
  const userAnswer = document.getElementById("userAnswer");
  const resultMessage = document.getElementById("resultMessage");
  const checkAnswerBtn = document.getElementById("checkAnswerBtn");



  const rooms = { // 방
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
      img: "files/room_lobby.png",
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

    // 버튼 제거 ❌
    // howToPlayBtn.remove();
    // howToPlayModal.remove();

    // 대신 설명보기 버튼만 숨김
    howToPlayBtn.style.display = "none";
    howToPlayModal.style.display = "none";
  });

  // 설명보기
  howToPlayBtn.addEventListener("click", () => {
    howToPlayModal.style.display = "flex";
  });

  // 설명보기 닫기
  howToPlayModal.addEventListener("click", (event) => {
    if (event.target === howToPlayModal) {
      howToPlayModal.style.display = "none";
    }
  });

  // 퍼즐 모달 닫기
  puzzleModal.addEventListener("click", (event) => {
    if (event.target === puzzleModal) {
      puzzleModal.style.display = "none";
    }
  });
  // 힌트/스토리 이미지 닫기
  const imageModal = document.getElementById("image-modal");
  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      imageModal.style.display = "none";
    }
  });



  const puzzleComputer = document.getElementById("puzzle-computer");
  const puzzleBook = document.getElementById("puzzle-book");
  const puzzleRadio = document.getElementById("puzzle-radio");
  const puzzleTransparent = document.getElementById("puzzle-transparent");
  const puzzleClock = document.getElementById("puzzle-clock");



  const puzzles = {
    computer: {
      question: "문제: 컴퓨터가 무엇인가요?",
      image: "files/computerfull.png",
      answer: "전자기기",
      success: "정답입니다! 컴퓨터는 똑똑하죠!",
      answered: false
    },
    book: {
      question: "문제: 책은 무엇을 알려주나요?",
      // image: "files/bookfull.png",
      answer: "지식",
      success: "정답입니다! 책은 지식의 보고입니다!",
      answered: false
    },
    radio: {
      type: "image",
      image: "files/computerfull.png"
    },
    transparent: {
      type: "image",
      image: "files/startscreen.png"
    },
    clock: {
      question: "문제: 12시 정각부터 12시간 후의 12시 정각 사이에 긴 바늘이 짧은 바늘을 앞지르는 것은 총 몇 번일까?",
      image: "files/clock.png",
      answer: "10",
      success: "'추월'의 의미를 이해하는 것이 어려웠나요?",
      answered: false
    }
    // 추가 퍼즐도 여기에 계속 넣기




  };


    // 퍼즐 클릭 이벤트
  puzzleComputer.addEventListener("click", () => openPuzzle("computer"));
  puzzleBook.addEventListener("click", () => openPuzzle("book"));
  puzzleRadio.addEventListener("click", () => openPuzzle("radio"));
  puzzleTransparent.addEventListener("click", () => {
    triggerGameOver(); // 퍼즐 열지 않고 바로 게임 오버
  });
  puzzleClock.addEventListener("click", () => openPuzzle("clock"));







  let currentPuzzle = ""; // 현재 열려 있는 퍼즐 식별용


  function openPuzzle(key) {
    currentPuzzle = key;
    const puzzle = puzzles[key];

    // 모달 모두 초기화
    puzzleModal.style.display = "none";
    imageModal.style.display = "none";

    if (puzzle.type === "image") {
      // 이미지 전용 퍼즐은 image-modal로 보여줌
      const imageModalImg = document.getElementById("image-modal-img");
      imageModalImg.src = puzzle.image;
      imageModal.style.display = "flex";
      return;
    }

    // 일반 퍼즐 모달 열기
    puzzleModal.style.display = "flex";

    // 문제 텍스트
    questionElement.textContent = puzzle.question || "";

    // 이미지 표시 여부
    if (puzzle.image) {
      puzzleModalImg.src = puzzle.image;
      puzzleModalImg.style.display = "block";
    } else {
      puzzleModalImg.style.display = "none";
    }

    // 정답 입력 및 버튼
    userAnswer.style.display = "block";
    checkAnswerBtn.style.display = "inline-block";
    resultMessage.style.display = "block";

    if (puzzle.answered) {
      resultMessage.textContent = puzzle.success;
      userAnswer.value = puzzle.answer;
      userAnswer.disabled = true;
      checkAnswerBtn.disabled = true;
    } else {
      resultMessage.textContent = "";
      userAnswer.value = "";
      userAnswer.disabled = false;
      checkAnswerBtn.disabled = false;
    }
  }


  // 정답 확인 버튼
  checkAnswerBtn.addEventListener("click", () => {
    const answer = userAnswer.value.trim();
    const puzzle = puzzles[currentPuzzle];

    if (answer === puzzle.answer) {
      resultMessage.textContent = puzzle.success;
      puzzle.answered = true; // 상태 업데이트

      userAnswer.disabled = true;       // 정답 맞춘 후 입력창 잠금
      checkAnswerBtn.disabled = true;   // 버튼 비활성화
    } else {
      resultMessage.textContent = "틀렸습니다. 다시 시도해보세요!"; // 오답 시
    }
  });


  //게임 오버
  const gameOverScreen = document.getElementById("game-over-screen");

  function triggerGameOver() {
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
  }

  // 게임 오버 후 아무 키나 누르면 리셋
  document.addEventListener("keydown", (e) => {
    if (gameOverScreen.style.display === "flex") {
      gameOverScreen.style.display = "none";
      mainScreen.style.display = "flex";

      resetGame(); // 초기화 함수 호출
    }
  });


  function resetGame() {
    // 현재 방 초기화
    currentRoomId = "labroom";
    updateRoom(currentRoomId);

    // 퍼즐 정답 상태 초기화
    Object.values(puzzles).forEach(puzzle => {
      puzzle.answered = false;
    });

    // 퍼즐 입력창 초기화
    userAnswer.value = "";
    userAnswer.disabled = false;
    checkAnswerBtn.disabled = false;
    resultMessage.textContent = "";

    // 메인 화면 버튼들 복원
    howToPlayBtn.style.display = "inline-block";
  }





  function updateRoom(roomId) {
    const room = rooms[roomId];
    if (!room) return;

    currentRoomId = roomId;
    roomImage.src = room.img;

    arrowUp.style.display = room.up ? "block" : "none";
    arrowDown.style.display = room.down ? "block" : "none";
    arrowLeft.style.display = room.left ? "block" : "none";
    arrowRight.style.display = room.right ? "block" : "none";

    //퍼즐 요소 화면 위치
    puzzleComputer.style.display = (roomId === "labroom") ? "block" : "none";
    puzzleBook.style.display = (roomId === "lab") ? "block" : "none";
    puzzleRadio.style.display = (roomId === "lab") ? "block" : "none";
    puzzleTransparent.style.display = (roomId === "lab") ? "block" : "none";
    puzzleClock.style.display = (roomId === "corner") ? "block" : "none";

    



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
