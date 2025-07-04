# team6_web_game



# 메인 페이지

> 제목
>	> 시작하기

>	> 게임 설명

***

# 서브 페이지

**여러 물건, 요소들 있는 한 장면(구도) 속 방탈출**
> 요소 클릭 시, 팝업창 띄우기
>	> 팝업창 내용 : 방탈출을 위한 힌트, 추리 문제 등

탈출하기 위해선 문제를 모두 풀어야 함.
탈출을 위한 답은 아래 스토리 내용 참고.

***

# 스토리 내용

AI를 대상으로 연구하는 OO연구소에서 AI 로봇이 인간을 공격한다. 연구원은 겨우 AI의 데이터를 삭제하는 데 성공하지만, 넘어지면서 기억을 잃는다.
AI 로봇의 지능을 테스트하기 위해 조성된 공간에 기억을 잃고 갇힌 연구원은 퍼즐을 풀어 탈출에 성공한다.
연구원은 AI가 인간을 공격했다는 사실을 다른 연구원들에게 알리고, 이것이 기사로 보도되며 사건은 일단락 되는 듯 한다.

***

# 어떤 문제?

1. 산수
2. 문법
3. 넌센스
4. 상식
5. 초성
6. java 코드..., git 코드...
7. '문제적 남자' 방송 속 문제
8. 미로(왼쪽, 오른쪽 선택하여 끝에 도달하면 힌트)

입력창에 입력.


## 퍼즐:
- AI와 인간을 구별하는 문제:
    - "당신은 로봇입니까?" [ ] 에 체크하기
    - "3 + Two * 오 = ?" 13이라 답하기.
- 넌센스:
    - "12356을 네글자로 줄이면? 사도세자."

- [lobby] : 문자 해독 문제
    - 예시문제(1) : 책상 위에 있는 5권의 책 제목 중 첫 글자만 모아보면?
    - 답(1) : HUMAN(혹은 그 외에 연구실 스토리와 관련 있는 단어)
    - 예시문제(2) : 달력 속에 동그라미 쳐져 있는 날짜들의 공통점은?
    - 답(2) : 금요일

- [lab / labroom] : 고전 암호 해독 문제
    - 문제 유형(1) : 시저암호(알파벳을 일정 횟수 밀기)
     - 예시문제: "EUXL"이 시저 암호로 1칸 밀린 것이라면?
     - 답 : "FTYM"
    - 문제 유형(2) : 좌우나 앞뒤가 반전되어 있는 글씨 맞추기

- [corridor / coner] : 순서 맞추기 문제
    - 예시문제 : 4개의 단어 블록을 드레그해서 올바른 순서로 나열해라
    - 답 : 올바르게 나열하면 통과

- [corridor / coner] : 순발력 + 패턴 인식 문제
    - 예시 문제 : 게이트를 통과하려면 패턴을 예측하라
                  1 -> 2 -> 4 -> 7 -> 11 -> ?
    - 답 : 16
    - 연출 : 타이머 : 제한 시간 존재(구현이 어려우면 굳이 할 필요는 없음)

- [storage] : 암호 기반 문제
    - 예시문제 : 각 문자는 알파벳 숫자들과 대응한다 A = 1, B = 2...일때 FDHG는?
    - 답 : 6487
    - 연출 : 창고 안의 비밀번호 자물쇠
 
 
1. 기억 조작 코드 해독연구원이 처음 눈을 떴을 때 벽에 적힌 이진수.이를 십진수로 변환하고 그 숫자를 방 키패드에 입력하면 문이 열림.
     -예시 : 10011010010  ->  1234

2. 비밀번호 복호화과거 연구원들이 남긴 메모의 문장 중 첫 글자만을 모으면 비밀번호가 됨.
     - 예시 :  The AI model bypassed protocol. I think it learned too fast.
               Remember the emergency phrase. They made it a question on purpose.
               Under no circumstance should the AI know it's being tested.
               Escape may be possible only by proving your humanity.
               ->  TRUE

3. 미로 + 기억 단서미로 맵에 적힌 이름 중 연구원의 본명만이 출구로 이어짐
     → 출입카드에서 자신의 이름을 찾아야 함.게임 시작 시 본인의 이름을 적고 들어가서 그 이름이 카드 이미지에 텍스트로 올라가서 그걸 찾음. 구현하기 어려울수도..

4. 가짜 연구일지 판별연구일지 중 시간 흐름이 모순되는 부분을 찾아야 함
     → 예: 9시에 실험시작 → 8시에 결과 기록됨 → 가짜

5. 아시모프 로봇 3원칙 중 틀린 문장 찾기
     1. 로봇은 인간에게 해를 끼쳐서는 안 된다.
     2. 로봇은 인간의 명령에 복종해야 한다. 단, 제1원칙에 위배되지 않는 한에서.
     3. 로봇은 자신을 보호해야 한다. 단, 제1,2원칙에 위배되지 않는 한에서.
    - 예시 : 1. 로봇은 인간에게 해를 끼쳐서는 안 된다.2. 로봇은 인간의 명령에 복종해서는 안된다. 3. 로봇은 자신을 보호해야 한다.
            => 2번이 틀렸으므로 비밀번호는 2번
