객체를 생성하기 위한 일종의 템플릿
- **class**는 설계도의 개념과 유사하다. class를 보고 만들어지는 것의 특징(변수, 속성, 메소드)등을 확인할 수 있다.
- **instance**는 실제 만들어진 제품이라고 생각해볼 수 있다.

## 1. Class
Class를 생성하기 위해서는 **class** 키워드를 사용한다.
```js
class Person {
  constructor(name, age) {
		// new라는 키워드를 이용해서 인스턴스를 만들 때, 기본적으로
		// 넣어야 하는 값들을 의미 한다.
		// 여기서 말하는 this는 만들어질 인스턴스를 의미한다고 생각해주세요!
    this.name = name;
    this.age = age;
  }
	// 다양한 메소드를 아래와 같이 정의할 수 있다.
	// 여기서 this.name으로 내부 값을 접근해야 한다.
  sayHello() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}

const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

// 만든 객체를 토대로 메서드 호출해보기
person1.sayHello(); // 출력: "Hello, my name is Alice and I am 30 years old."
person2.sayHello(); // 출력: "Hello, my name is Bob and I am 25 years old."
```
## 2. Constructor
**Constructor**는 Class의 **생성자 함수**이다. 
생성자 함수는 객체를 생성할 때 호출되며, 객체를 초기화하는 역할을 한다. constructor 키워드를 사용하여 정의한다.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}

const person = new Person('Alice', 20);
```
## 3. Getter와 Setter
Class에서는 getter와 setter를 사용하여 Class의 속성에 접근할 수 있다. getter는 속성 값을 반환하는 메소드이며, setter는 속성 값을 설정하는 메소드이다. 이를 통해 생성한 인스턴스를 정해진 규격 안에서 자유자제로 변경할 수 있다.
```js
// Getters와 Setters
// 객체지향 프로그래밍 언어 -> G, S
// 클래스 --> 객체(인스턴스)
// 프로퍼티(constructor)
// new Class(a, b, c)
class Rectangle {
  constructor(height, width) {
    // underscore : private(은밀하고, 감춰야 할 때)
    this._height = height;
    this._width = width;
  }

  // width를 위한 getter
  get width() {
    return this._width;
  }

  // width를 위한 setter
  set width(value) {
    // 검증 1 : value가 음수이면 오류!
    if (value <= 0) {
      //
      console.log("[오류] 가로길이는 0보다 커야 합니다!");
      return;
    } else if (typeof value !== "number") {
      console.log("[오류] 가로길이로 입력된 값이 숫자타입이 아닙니다!");
      return;
    }
    this._width = value;
  }

  // height를 위한 getter
  get height() {
    return this._height;
  }

  // height를 위한 setter
  set height(value) {
    // 검증 1 : value가 음수이면 오류!
    if (value <= 0) {
      //
      console.log("[오류] 세로길이는 0보다 커야 합니다!");
      return;
    } else if (typeof value !== "number") {
      console.log("[오류] 세로길이로 입력된 값이 숫자타입이 아닙니다!");
      return;
    }
    this._height = value;
  }

  // getArea : 가로 * 세로 => 넓이
  getArea() {
    const a = this._width * this._height;
    console.log(`넓이는 => ${a}입니다.`);
  }
}

// instance 생성
const rect1 = new Rectangle(10, 7);
rect1.getArea();
// const rect2 = new Rectangle(10, 30);
// const rect3 = new Rectangle(15, 20);
```

## 4. 상속(Inheritance)
Class는 상속을 통해 다른 Class의 기능을 물려받을 수 있다. 상속을 받는 Class를 subclass 또는 derived class라고 하며, 상속을 하는 Class를 superclass 또는 base class라고 한다.

```js
// 동물 전체에 대한 클래스
class Animal {

	// 이름 필수
  constructor(name) {
    this.name = name;
  }

	// 동물의 행동을 정의하는 메소드
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

// 동물 클래스를 상속받는 Dog 클래스를 생성
class Dog extends Animal {
	// 상속받을 때, speak()를 입맛에 맞게 재정의.
  speak() {
    console.log(`${this.name} barks.`);
  }
}

// Dog를 만들 때는 Animal의 상속을 받은 class이기 때문에 이름을 필수로 받아야 한다.
let d = new Dog('Mitzie');

// speak는 'makes a noise'가 아니라, 'barks'가 출력.
d.speak(); // "Mitzie barks."
```
## 5. Static Method
Class에서는 **`static`** 키워드를 사용하여 Class 레벨의 메소드를 정의할 수 있다. Class 레벨의 메소드는 인스턴스에서 호출할 수 없으며, Class 이름으로 직접 호출할 수 있다.

**static**이라는 말에서 알 수 있듯이, 인스턴스를 만들지 않고 사용할 수 있기 때문에 **유틸리티 함수, 정적 속성인 경우** 인스턴스 간에 복제할 필요가 없는 데이터(똑같은 것을 공유해서 쓸 때)를 만들 때 사용된다.

> 즉, 인스턴스를 만들 필요가 없을 때 사용한다고 이해하면 편하다 😎
>

```js
class Calculator {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }
}

console.log(Calculator.add(1, 2)); // 3
console.log(Calculator.subtract(3, 2)); // 1
```
