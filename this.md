this는 현재 실행중인 실행컨텍스트를 나타낸다. 호출방식에 따라 무엇을 참조하는지 결정된다.

## 1. 전역공간(global scope)에서의 this
- 브라우저 환경: 전역 객체(window)를 참조한다.
- Node.js 환경: global 객체를 참조하거나, 모듈 시스템에서는 undefined가 될 수 있다(엄격 모드에서).
<브라우저 환경 this 확인>
```js
console.log(this);
console.log(window);
console.log(this === window);
```
<node 환경 this 확인>
```js
console.log(this);
console.log(global);
console.log(this === global);
```
## 2. 객체에서의 this
- 객체의 메서드를 호출할 때, this는 메서드를 호출한 객체 자신을 참조한다.
```js
const obj = {
  name: 'JavaScript',
  sayName() {
    console.log(this.name); // this는 obj를 참조
  },
};

obj.sayName(); // JavaScript

```
## 3. 함수에서의 this
- 기본 함수 호출에서는 전역 객체를 참조한다.
- 엄격 모드(strict mode) 에서는 this가 undefined가 된다.
```js
function showThis() {
  console.log(this);
}

showThis(); // 브라우저: window, Node.js: global

```
## 4. 메서드의 내부 함수에서의 this
- 메서드 내부에서 정의된 함수(내부 함수)는 메서드의 this와 다르게 동작한다.
- 메서드는 호출한 객체를 this로 사용.
- 내부 함수는 독립적인 함수로 간주되어, 기본적으로 전역 객체나 undefined를 참조.
```js
const obj = {
  name: 'MyObject',
  showThis() {
    console.log(this.name); // MyObject

    function innerFunction() {
      console.log(this); // 브라우저: window, 엄격 모드: undefined
    }

    innerFunction();
  },
};

obj.showThis();

```
## 5. 메서드의 내부 함수에서의 this 우회
- 내부 함수의 this를 원하는 객체로 유지하는 방법
### (1) self 또는 that 사용
- 외부의 this를 변수에 저장하여 참조.
```js
const obj = {
  name: 'MyObject',
  showThis() {
    const self = this; // 외부 `this` 저장

    function innerFunction() {
      console.log(self.name); // MyObject
    }

    innerFunction();
  },
};

obj.showThis();

```
### (2) 화살표 함수에서의 this
- 화살표 함수는 상위 스코프의 this 를 그대로 사용한다. 즉, 화살표 함수 자체는 this를 생성하지 않는다.
```js
const obj = {
  name: 'Arrow',
  regularFunction: function () {
    console.log(this.name); // this는 obj
  },
  arrowFunction: () => {
    console.log(this.name); // this는 전역 객체 (window/undefined)
  },
};

obj.regularFunction(); // Arrow
obj.arrowFunction(); // undefined (엄격 모드), window.name (비엄격 모드)

```
### (3) bind로 명시적 바인딩
- bind를 사용하여 내부 함수의 this를 고정.
```js
const person = { name: 'Jane' };

function introduce() {
  console.log(`My name is ${this.name}`);
}

const boundIntroduce = introduce.bind(person);
boundIntroduce(); // My name is Jane

```

## 6. 생성자 함수 내부에서의 this
- 생성자 함수는 new 키워드로 호출될 때 새로운 객체를 생성한다.
- 생성자 함수 내부의 this는 생성된 객체를 참조한다.
```js
function Person(name) {
  this.name = name;
  this.sayName = function () {
    console.log(`My name is ${this.name}`);
  };
}

const person = new Person('Alice');
person.sayName(); // My name is Alice

```
## 7. 콜백 함수 호출 시 그 함수 내부에서의 this
- 콜백 함수에서 this를 명시적으로 바인딩하지 않으면 글로벌 객체 또는 undefined를 참조할 수 있다.
- 콜백함수 : **“어떠한 함수, 메서드의 인자(매개변수)로 넘겨주는 함수”**
- 콜백 함수도 함수기 때문에 this는 전역 객체를 참조하지만(호출 주체가 없음), 콜백함수를 넘겨받은 함수에서 콜백 함수에 별도로 this를 지정한 경우는 예외적으로 그 대상을 참조
```js
class DelayedLogger {
  constructor() {
    this.message = 'Delayed Hello!';
  }

  logMessage() {
    setTimeout(function () {
      console.log(this.message); // undefined (엄격 모드) 또는 글로벌 객체
    }, 1000);
  }

  logMessageWithBind() {
    setTimeout(function () {
      console.log(this.message); // 바인딩으로 정상 출력
    }.bind(this), 1000);
  }

  logMessageWithArrow() {
    setTimeout(() => {
      console.log(this.message); // 화살표 함수로 바인딩 문제 해결
    }, 1000);
  }
}

const logger = new DelayedLogger();
logger.logMessage(); // undefined
logger.logMessageWithBind(); // Delayed Hello!
logger.logMessageWithArrow(); // Delayed Hello!

```
## 명시적 this 바인딩 (Explicit Binding)
JavaScript에서는 call, apply, bind 메서드를 사용하여 this를 명시적으로 설정할 수 있다.
### call과 apply
- 함수 호출과 동시에 this를 설정.
- 차이점: call은 인수를 개별적으로, apply는 배열로 전달.
```js
const person = { name: 'John' };

function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

greet.call(person, 'Hello'); // Hello, John
greet.apply(person, ['Hi']); // Hi, John

```
### bind
새로운 함수를 생성하며, this가 고정된 상태로 반환.
```js
const person = { name: 'Jane' };

function introduce() {
  console.log(`My name is ${this.name}`);
}

const boundIntroduce = introduce.bind(person);
boundIntroduce(); // My name is Jane

```
## 정리
- 독립 함수: this는 전역 객체를 참조 (엄격 모드에서는 undefined).
- 메서드 내부 함수: this는 전역 객체를 참조하지만, self, 화살표 함수, bind로 우회 가능.
- 생성자 함수: this는 새로 생성된 객체를 참조.
- 콜백 함수: this는 전역 객체를 참조 하지만 콜백함수를 넘겨받은 함수에서 콜백 함수에 별도로 this를 지정한 경우는 예외적으로 그 대상을 참조
