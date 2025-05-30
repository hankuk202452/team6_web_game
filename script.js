var target = document.querySelectorAll('.btn_open');
var btnPopClose = document.querySelectorAll('.pop_wrap .btn_close');
var targetID;

// 팝업 열기
for(var i = 0; i < target.length; i++){
  target[i].addEventListener('click', function(){
    targetID = this.getAttribute('href');
    document.querySelector(targetID).style.display = 'block';
  });
}

// 팝업 닫기
for(var j = 0; j < target.length; j++){
  btnPopClose[j].addEventListener('click', function(){
    this.parentNode.parentNode.style.display = 'none';
  });
}

function checkInput() {
      const userInput = document.getElementById('success').value;
      const correctValue = "1234";

      if (userInput === correctValue) {
        // 조건이 맞으면 페이지 이동
        window.location.href = "../finish_page/final.html";
      } else {
        // 틀리면 경고창 표시
        alert("입력값이 올바르지 않습니다.");
      }
}
