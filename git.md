## 1. 필수 리눅스 명령어
pwd - 
ls - 
ls -a -
## 2. Git&Github의 개념
코드변경점기록
코드를 백업, 공유, 협업하는 곳

## 3. Git 필수 명령어
git init - 코드관리 시작(세팅) 프로젝트 시작시 한 번만 하면 된다.
git add 파일명 - 저장할 파일 지정 (특정부분만 하고싶을 때 사용)
git add. - 모든 변경사항 지정
git commit -m "메세지" - 저장
git status - 저장여부(변경상태) 확인
git log - 저장내역 확인

## 4. Github로 코드 백업하기

git push origin main - github에 저장내용 반영
## 5. Github 협업 기초와 충돌 해결법(conflict)
git clone - 코드 복사해오기
git pull - 변경사항 덮어쓰기
같은파일의 같은위치의 코드 변경하고 git push시 - conflict(충돌)발생
<< == >> 삭제하고 원하는 코드로 수정 후 git push
