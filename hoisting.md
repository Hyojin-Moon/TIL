## 호이스팅(Hoisting)이란?
자바스크립트의 **변수, 함수 선언이 코드 실행 전에 해당 스코프의 최상단으로 끌어올려지는 것처럼 동작**하는 현상

## 1. 변수 호이스팅
변수 선언이 코드의 상단으로 끌어올려지지만, 초기화(데이터값, 할당값)은 끌어올려지지 않는다.
선언 방식에 따라 다르게 동작한다.

### 1.1 var
- 선언과 초기화가 분리되어 호이스팅 된다.
- 선언은 호이스팅되지만, 초기화는 해당 위치에 그대로 남아 있다.
- 초기화 이전에 변수에 접근하면 undefined가 된다.
```js
console.log(a); // undefined
var a = 10;
console.log(a); // 10

```
위 코드는 다음과 같이 해석된다.
```js
var a;          // 선언이 호이스팅됨
console.log(a); // undefined (초기화되지 않음)
a = 10;         // 초기화
console.log(a); // 10

```
### 1.2 let, const
- 호이스팅은 되지만, "일시적 사각지대(TDZ, Temporal Dead Zone)"에 의해 초기화 이전에 접근하면 오류가 발생한다.
```js
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;

const c = 30;
console.log(c); // 30

```

## 2. 함수 호이스팅
함수 선언 방식에 따라 다르게 동작한다.

### 2.1 함수 선언식
- 함수 선언식은 선언과 동시에 초기화가 이루어지며, 호이스팅 된다.
- 선언 위치와 관계없이 호출할 수 있다.
```js
foo(); // "Hello, World!"

function foo() {
  console.log("Hello, World!");
}

```
### 2.2 함수 표현식
- 함수 표현식은 변수 호이스팅의 규칙을 따른다.
- 선언된 변수는 undefined로 초기화되며, 초기화 후에야 사용할 수 있다.
```js
bar(); // TypeError: bar is not a function
var bar = function () {
  console.log("Hello!");
};

```
## 호이스팅이 발생하는 이유
자바스크립트는 두 단계로 코드를 실행한다.

- 컴파일 단계: 변수와 함수 선언이 스코프에 등록된다.
- 실행 단계: 코드는 순서대로 실행됩니다.
> 호이스팅은 컴파일 단계에서 선언이 상단으로 이동되면서 발생한다.
즉, 실행 전에 정보수집을 마치고 현재 컨텍스트 LexicalEnvironment에 기록해둔 가상개념 같은것이다.

## 호이스팅을 피하기 위한 팁
- let과 const 사용: var 대신 let이나 const를 사용하여 TDZ로 의도치 않은 접근을 방지.
- 선언 위치를 고려한 코드 작성: 변수와 함수를 사용하기 전에 명확히 선언.
- 함수 표현식 활용: 함수의 실행 시점을 명확히 제어.
