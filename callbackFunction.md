## 1. 콜백 함수의 기본 개념
#### 정의
다른 코드의 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수
콜백 함수를 위임받은 코드는 자체적으로 내부 로직에 의해 이 콜백 함수를 적절한 시점에 실행 한다.
#### 특징
함수 자체를 인수로 전달.
필요한 시점에서 호출.
## 2. 콜백 함수의 동작 원리
콜백 함수는 자바스크립트의 함수형 프로그래밍 특징과 비동기 처리 구조에 의해 작동한다.

- #### 동기 콜백: 즉시 실행되는 함수.
- #### 비동기 콜백: 작업이 완료된 이후 실행되는 함수.
```js
// 동기 콜백
function processSync(callback) {
  console.log("동기 작업 시작");
  callback();
  console.log("동기 작업 끝");
}

processSync(() => {
  console.log("콜백 함수 실행");
});

// 비동기 콜백
function processAsync(callback) {
  console.log("비동기 작업 시작");
  setTimeout(() => {
    callback();
    console.log("비동기 작업 끝");
  }, 1000);
}

processAsync(() => {
  console.log("콜백 함수 실행");
});

```
## 3. 콜백 함수의 주요 사용 사례
#### 1. 배열 메서드에서의 콜백
자바스크립트 배열 메서드(map, filter, forEach 등)는 콜백 함수로 요소를 처리한다.
```js
const numbers = [1, 2, 3, 4, 5];

// forEach
numbers.forEach((num) => console.log(num));

// map
const squares = numbers.map((num) => num ** 2);
console.log(squares);

// filter
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers);

```

#### 2. 이벤트 처리
HTML 요소의 이벤트 리스너로 콜백 함수 사용.
```js
const button = document.querySelector("button");
button.addEventListener("click", () => {
  console.log("버튼 클릭!");
});

```
#### 3. 비동기 작업
setTimeout, setInterval 같은 타이머 함수나, fetch 및 프로미스(Promise)에서 콜백 함수가 사용된다.
```js
// setTimeout
setTimeout(() => {
  console.log("1초 후 실행");
}, 1000);

// fetch (비동기 네트워크 요청)
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((data) => console.log(data));

```
#### 4. 커스텀 함수
콜백을 활용해 동작을 유연하게 구성할 수 있다.
```js
function greet(name, callback) {
  console.log(`안녕하세요, ${name}님!`);
  callback();
}

greet("홍길동", () => {
  console.log("콜백 함수가 실행되었습니다.");
});

```
## 4. 콜백 지옥 (Callback Hell)
중첩된 콜백 함수가 많아져 코드의 가독성이 떨어지는 현상.

```js
setTimeout(
  function (name) {
    var coffeeList = name;
    console.log(coffeeList);

    setTimeout(
      function (name) {
        coffeeList += ", " + name;
        console.log(coffeeList);

        setTimeout(
          function (name) {
            coffeeList += ", " + name;
            console.log(coffeeList);

            setTimeout(
              function (name) {
                coffeeList += ", " + name;
                console.log(coffeeList);
              },
              500,
              "카페라떼"
            );
          },
          500,
          "카페모카"
        );
      },
      500,
      "아메리카노"
    );
  },
  500,
  "에스프레소"
);

```
### 해결 방법
#### 1. 기명함수로 변환
```js
var coffeeList = '';

var addEspresso = function (name) {
	coffeeList = name;
	console.log(coffeeList);
	setTimeout(addAmericano, 500, '아메리카노');
};

var addAmericano = function (name) {
	coffeeList += ', ' + name;
	console.log(coffeeList);
	setTimeout(addMocha, 500, '카페모카');
};

var addMocha = function (name) {
	coffeeList += ', ' + name;
	console.log(coffeeList);
	setTimeout(addLatte, 500, '카페라떼');
};

var addLatte = function (name) {
	coffeeList += ', ' + name;
	console.log(coffeeList);
};

setTimeout(addEspresso, 500, '에스프레소');
```
한 번 쓰고 안쓰기 때문에 효율성이 떨어진다.
#### 2. Promise 사용
```js
var addCoffee = function (name) {
	return function (prevName) {
		return new Promise(function (resolve) {
			setTimeout(function () {
				var newName = prevName ? (prevName + ', ' + name) : name;
				console.log(newName);
				resolve(newName);
			}, 500);
		});
	};
};

addCoffee('에스프레소')()
	.then(addCoffee('아메리카노'))
	.then(addCoffee('카페모카'))
	.then(addCoffee('카페라떼'));
```
#### 3. async/await 사용
```js
var addCoffee = function (name) {
	return new Promise(function (resolve) {
		setTimeout(function(){
			resolve(name);
		}, 500);
	});
};
var coffeeMaker = async function () {
	var coffeeList = '';
	var _addCoffee = async function (name) {
		coffeeList += (coffeeList ? ', ' : '') + await addCoffee(name);
	};
	await _addCoffee('에스프레소');
	console.log(coffeeList);
	await _addCoffee('아메리카노');
	console.log(coffeeList);
	await _addCoffee('카페모카');
	console.log(coffeeList);
	await _addCoffee('카페라떼');
	console.log(coffeeList);
};
coffeeMaker();
```
## 5. this 바인딩 문제

콜백 함수 내에서 this가 원치 않는 값을 가리킬 수 있으므로 주의해야 한다.
→ bind, 화살표 함수 사용으로 해결 가능.
```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  setTimeout(function () {
    console.log(`안녕하세요, ${this.name}`);
  }.bind(this), 1000);
};

const person = new Person("홍길동");
person.greet(); // 안녕하세요, 홍길동

```

