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
  const puzzleMemo = document.getElementById("puzzle-memo");
  const puzzleSafe = document.getElementById("puzzle-safe");
  const puzzleManybooks = document.getElementById("puzzle-manybooks");
  const puzzleWrapPaper = document.getElementById("puzzle-wrap-paper");
  const puzzleBoardTilt = document.getElementById("puzzle-board-tilt");
  const puzzleNote = document.getElementById("puzzle-note");
  const puzzleCalendar = document.getElementById("puzzle-calendar");

  const puzzleClock = document.getElementById("puzzle-clock");
  const puzzlePapers = document.getElementById("puzzle-papers");
  const puzzlePC = document.getElementById("puzzle-pc");

  const puzzles = {
    computer: {
      question: "비밀번호를 입력하세요.",
      image: "files/computerfull2.png",
      answer: "0013",
      success: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 이~ 아쉽네. 더 놀고 싶었는데...",
      answered: false
    },
    book: {
      question: "\"GTLZM\"이 시저 암호로 오른쪽으로 1칸 밀린 것이라면?",
      answer: "HUMAN",
      success: "책은 훼손되어 자세한 내용은 알 수 없습니다. 제목과 훼손되어 있지 않은 부분들을 통해 AI가 자유의지를 가지면 발생할 수 있는 일들에 대한 내용인 것만 유추할 수 있습니다.",
      answered: false
    },
    radio: {
      type: "image",
      image: "files/employeecard.png"
    },
    transparent: {
      type: "image",
      image: "files/transparent.png"
    },
    note: {
      question: "실험 대상 x는 처음에 1초 후 변화, 이후 2초, 4초, 8초 후 변화함. 다음 변화까지 걸리는 시간은?",
      answer: "16",
      success: "노트에는 연구중인 최신형 인공지능에 대한 정보가 있습니다. 연구중인 인공지능은 스스로 최적화가 가능하며 인간을 모방하여 발전 중인 것으로 보입니다.",
      answered: false
    },
    memo: {
      question: "비밀번호는?",
      image: "files/memo_front.png",
      answer: "2025",
      success: "올해의 절반이 지났습니다. 그렇죠?",
      answered: false
    },
    wrapPaper: {
      type: "image",
      image: "files/real_asimov.png"
    },
    boardTilt: {
      question: "잘못된 규칙의 번호는? 밑에 떨어진 종이를 보세요.",
      image: "files/fake_asimov.png",
      answer: "2",
      success: "정답입니다! 잘 아시네요!",
      answered: false
    },
    safe: {
      question: "각 문자는 알파벳 숫자들과 대응한다. A = 1, B = 2...일 때, FDHGBWARJ는?",
    // a1 b2 c3 d4 e5 f6 g7 h8 i9 j10
    // k11 l12 m13 n14 o15 p16 q17 r18 s19 t20
    // u21 v22 w23 x24 y25 z26
      answer: "648722311810",
      success: "클리어 파일이 여러 개 쌓여 있습니다. 하나를 살펴보면 어떤 실험 보고서 같은데, 대상은 인간이 아닙니다. 그런데 인간보다 지능이 높고 습득력이 강하며, 거의 모든 방면에서 뛰어난 것을 알 수 있습니다.",
      answered: false
    },
    manybooks: {
      question: "쌓여 있는 책 제목의 첫 글자들만 모아보면?",
      image: "files/manybooksfull.png",
      answer: "HUMAN",
      success: "나는 인간이 아닙니다.",
      answered: false
    },
    clock: {
      question: "문제: 12시 정각부터 12시간 후의 12시 정각 사이에 긴 바늘이 짧은 바늘을 앞지르는 것은 총 몇 번일까?",
      image: "files/clock.png",
      answer: "10",
      success: "'추월'의 의미를 이해하는 것이 어려웠나요?",
      answered: false
    },
    papers: {
      type: "image",
      image: "files/papersfull.png",
    },
    pc: {
      question: "문제: 사랑이란 무엇입니까?",
      image: "files/PCfull.png",
      answer: "13",
      success: "인간은 보이지 않는 건 모릅니다.",
      answered: false
    },
    calendar: {
      question: "달력 속에 동그라미 쳐져 있는 날짜들의 공통점은?",
      image: "files/calendarfull.png",
      answer: "금요일",
      success: "인간만이 시간을 정의하고 약속합니다.",
      answered: false
    },
    // 추가 퍼즐도 여기에 계속 넣기

  };


    // 퍼즐 클릭 이벤트
  puzzleComputer.addEventListener("click", () => openPuzzle("computer"));
  puzzleBook.addEventListener("click", () => openPuzzle("book"));
  puzzleRadio.addEventListener("click", () => openPuzzle("radio"));
  puzzleTransparent.addEventListener("click", () => {
    triggerGameOver(); // 퍼즐 열지 않고 바로 게임 오버
  });
  puzzleMemo.addEventListener("click", () => openPuzzle("memo"));
  puzzleSafe.addEventListener("click", () => openPuzzle("safe"));
  puzzleManybooks.addEventListener("click", () => openPuzzle("manybooks"));

  puzzleClock.addEventListener("click", () => openPuzzle("clock"));
  puzzlePapers.addEventListener("click", () => openPuzzle("papers"));
  puzzlePC.addEventListener("click", () => openPuzzle("pc"));
  puzzleWrapPaper.addEventListener("click", () => openPuzzle("wrapPaper"));
  puzzleBoardTilt.addEventListener("click", () => openPuzzle("boardTilt"));
  puzzleNote.addEventListener("click", () => openPuzzle("note"));
  puzzleCalendar.addEventListener("click", () => openPuzzle("calendar"));


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

    if (key === 'pc') {
      questionElement.classList.add('white-question');
    } else {
      questionElement.classList.remove('white-question');
    }
  }


  // 정답 확인 버튼
  checkAnswerBtn.addEventListener("click", () => {
    const answer = userAnswer.value.trim().toUpperCase();
    const puzzle = puzzles[currentPuzzle];

    if (answer === puzzle.answer.toUpperCase()) {
      resultMessage.textContent = puzzle.success;
      puzzle.answered = true; // 상태 업데이트

      userAnswer.disabled = true;       // 정답 맞춘 후 입력창 잠금
      checkAnswerBtn.disabled = true;   // 버튼 비활성화
      checkAllPuzzlesSolved();
    } else {
      resultMessage.textContent = "틀렸습니다. 다시 시도해봅시다."; // 오답 시
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

    // 최종 질문 입력창 초기화
    finalAnswer.value = "";
    finalResultMessage.textContent = "";
    finalQuestionModal.style.display = "none";

  }


  // 최종 질문
  const finalQuestionModal = document.getElementById("final-question-modal");
  const finalAnswer = document.getElementById("finalAnswer");
  const submitFinalAnswerBtn = document.getElementById("submitFinalAnswerBtn");
  const finalResultMessage = document.getElementById("finalResultMessage");

  const noticeBanner = document.getElementById("notice-banner");


  function checkAllPuzzlesSolved() {
    const allSolved = Object.values(puzzles).every(puzzle => {
      if (puzzle.type === "image") return true;
      return puzzle.answered === true;
    });

    if (allSolved) {
        // 퍼즐 모달 닫기
      setTimeout(() => {
        puzzleModal.style.display = "none";
      }, 4000);

      // 4초 후 알림 배너 표시
      setTimeout(() => {
        noticeBanner.style.display = "block";
      }, 4000);

      // 약간의 딜레이 후 최종 질문 모달 띄우기
      setTimeout(() => {
        noticeBanner.style.display = "none";
        showFinalQuestion();
      }, 9000); // 9초 딜레이
    }
  }

  function showFinalQuestion() {
    gameScreen.style.display = "none";
    finalQuestionModal.style.display = "flex";
  }

  submitFinalAnswerBtn.addEventListener("click", () => {
    const input = finalAnswer.value.trim();

    if (input === "") {
      finalResultMessage.textContent = "무언가를 입력하세요.";
      return;
    }

    // 원하는 정답을 비교할 수 있음
    if (input.toUpperCase() === "인간") {
      // 최종 탈출 화면으로 전환
      finalResultMessage.textContent = "그렇습니다. 당신은 인간입니다. 탈출을 축하합니다.";
      setTimeout(() => {
        showFinalEscapeScreen();
      }, 2000);
    } else {
      finalResultMessage.textContent = `"${input}"... 흥미롭군요. 당신은 --이 아니던가요?`;
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

    //퍼즐 요소 화면 위치
    puzzleComputer.style.display = (roomId === "labroom") ? "block" : "none";
    puzzleBook.style.display = (roomId === "lab") ? "block" : "none";
    puzzleRadio.style.display = (roomId === "lab") ? "block" : "none";
    puzzleTransparent.style.display = (roomId === "lab") ? "block" : "none";
    puzzleSafe.style.display = (roomId === "storage") ? "block" : "none";
    puzzleManybooks.style.display = (roomId === "lobby") ? "block" : "none";
    puzzleCalendar.style.display = (roomId === "lobby") ? "block" : "none";

    puzzleClock.style.display = (roomId === "corner") ? "block" : "none";
    puzzlePapers.style.display = (roomId === "corner") ? "block" : "none";
    puzzlePC.style.display = (roomId === "corner") ? "block" : "none";

    puzzleMemo.style.display = (roomId === "corridor") ? "block" : "none";
    puzzleWrapPaper.style.display = (roomId === "corridor") ? "block" : "none";
    puzzleBoardTilt.style.display = (roomId === "corridor") ? "block" : "none";
    puzzleNote.style.display = (roomId === "lab") ? "block" : "none";
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




  // 최종 탈출 화면 모달 요소
  const finalEscapeScreen = document.getElementById("final-escape-screen");
  const returnToMainBtn = document.getElementById("returnToMainBtn");

  const viewCreatorBtn = document.getElementById("viewCreatorBtn");
  const viewStoryBtn = document.getElementById("viewStoryBtn");

  const escapeImageModal = document.getElementById("escape-image-modal");
  const escapeImage = document.getElementById("escape-image");

  // 버튼 동작
  viewCreatorBtn.addEventListener("click", () => {
    escapeImage.src = "files/creator.png";
    escapeImageModal.style.display = "flex";
  });

  viewStoryBtn.addEventListener("click", () => {
    escapeImage.src = "files/allstory.png";
    escapeImageModal.style.display = "flex";
  });

  escapeImageModal.addEventListener("click", (e) => {
    if (e.target === escapeImageModal) {
      escapeImageModal.style.display = "none";
    }
  });

  // 메인 화면으로 돌아가기
  returnToMainBtn.addEventListener("click", () => {
    finalEscapeScreen.style.display = "none";
    document.getElementById("main-screen").style.display = "flex";
    resetGame(); // 이미 있는 게임 초기화 함수 호출
  });

  // 최종 정답 확인 후 이 함수 호출
  function showFinalEscapeScreen() {
    document.getElementById("final-question-modal").style.display = "none";
    finalEscapeScreen.style.display = "flex";
  }



});
