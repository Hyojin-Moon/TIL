# 함수 (Function)
JavaScript에서 함수는 특정 작업을 수행하거나 값을 계산하는 코드 블록이다. 함수는 프로그램을 구조화하고 재사용성을 높이는 데 중요한 역할을 한다. 

## 1. 함수의 특징
- 재사용성: 함수를 한 번 정의하면 여러 번 호출하여 사용할 수 있다.
- 모듈화: 복잡한 작업을 여러 개의 함수로 나누어 코드 관리를 쉽게 할 수 있다.
- 매개변수와 반환값: 함수를 호출할 때 값을 전달받고, 결과값을 반환할 수 있다.
- 스코프(Scope): 함수는 독립적인 변수 영역을 가진다.
- 클로저(Closure): 함수는 자신이 정의된 환경(스코프 체인)을 기억한다.
## 2. 함수 구문
```js
function name (name1, name2, ...) {
	// 수행할 코드
    return 반환값; //반환값이 있을 경우
}
```
- 함수 내에 선언된 변수는 함수의 지역변수가 된다. 지역 변수는 함수 내에서만 접근할 수 있으며 함수가 시작될 때 생성되고 함수가 완료되면 삭제된다
### 2.1 함수 선언식
```js
function add(x) {
  var y = x * 1;
  return y;
}
```
### 2.2 함수 표현식
변수를 선언하고 함수를 대입하는 방식을 함수 표현식이라고 한다.
함수 이름 없이 작성하면 익명 함수(Anonymous Function)가 된다.
```js
const multiply = function (a, b) {
    return a * b;
};

console.log(multiply(4, 5)); // 출력: 20
```
함수 선언식과 함수 표현식의 차이로는 **호이스팅**이라는 현상의 차이가 있다.

#### 함수 표현식과 함수 선언문의 차이
- 함수 선언문
함수는 주요 코드 흐름 중간에 독자적인 구문 형태로 존재한다.
함수 선언문이 정의되기 전에도 호출 가능하다.
- 함수 표현식
함수는 표현식이나 구문 구성 내부에 생성된다.
실제 실행 흐름이 해당 함수에 도달했을 때 함수를 생성한다. 따라서 실행 흐름이 함수에 도달했을 때부터 해당 함수를 사용할 수 있다.
위와 같이 가능한 이유는 JavaScript 내부의 알고리즘 때문이다.

JavaScript는 Script를 실행하기 전, 준비 단계에서 전역에 선언된 함수 선언문을 찾고 해당 함수를 생성한다. 즉, Script가 진짜 실행되기 전 '초기화 단계'에서 함수 선언 방식으로 정의한 함수가 생성되는 것이다.

Script는 함수 선언문이 모두 처리된 이후에서야 실행된다. 따라서 Script 어디서든 함수 선언문으로 선언된 함수에 접근할 수 있다.

> _**위 함수표현식, 함수선언문의 내용은 호이스팅,스코프에 대해 검색하던 중 정리가 잘 된 블로그 내용을 참고하여 가져왔다.**_

## 3. 함수 이름 지정

- 함수 이름은 함수의 동작을 명확히 나타내야 한다. 예: addNumber,
fetchData.
- 이름은 문자, 숫자, 밑줄(_), 달러($) 기호만 사용할 수 있으며, 숫자로 시작할 수 없다.
- CamelCase(낙타표기법)를 사용하는 것이 일반적

## 4. 함수 선언
**함수 선언(Function Declaration)**은 function 키워드로 시작하며, 함수 이름과 매개변수를 지정한다.
```js
// 함수 선언
function greet(name) {
    console.log(`Hello, ${name}!`);
}
```
## 5. 함수 호출
함수를 호출하려면 함수 이름 뒤에 괄호를 사용한다. 괄호 안에는 매개변수에 전달할 값을 입력 한다.

greet("Hyojin"); // 출력: Hello, Hyojin!
함수를 호출하기 전까지는 함수 내부의 코드 구문들은 실행되지 않는다.

## 7. 매개변수 (Parameters)
매개변수는 함수가 호출될 때 전달받는 입력값을 정의합니다.
함수 정의 시 괄호 안에 매개변수를 나열합니다.
기본값을 설정할 수도 있습니다:
```js
function sayHello(name = "Guest") {
    console.log(`Hello, ${name}!`);
}

sayHello(); // 출력: Hello, Guest!
sayHello("Moon"); // 출력: Hello, Moon!
```

## 8. return 명령문
- 함수가 특정 값을 반환하도록 하려면 return 키워드를 사용한다.
- return은 함수의 실행을 종료시키고, 지정된 값을 호출부로 반환한다.
```js
function add(a, b) {
    return a + b; // a와 b를 더한 값을 반환
}

const result = add(2, 3); // result는 5
console.log(result); // 출력: 5
```
return 문 뒤에 오는 코드는 실행되지 않는다.

## 9. 예시
- 매개변수와 반환값을 포함한 함수의 예제
```js
function calculateArea(width, height = 1) {
    return width * height; // 면적 계산 후 반환
}

console.log(calculateArea(5, 10)); // 출력: 50
console.log(calculateArea(4));    // 출력: 4 (기본값 1 사용)
```

## 정리

- 함수는 작업을 모듈화하고 재사용성을 높이는 도구
- return 문을 통해 결과값을 반환하며, 매개변수로 동적인 값을 전달받을 수 있다.
- 다양한 함수 정의 방식이 있지만, 목적에 맞는 방식을 사용하는 것이 중요하다.
