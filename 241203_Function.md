### **1.기본 함수 선언과 호출**

- `sayHello`라는 이름의 함수를 선언하고, 이 함수는 "Hello, JavaScript!"라는 문장을 출력하게 하세요.
- 함수를 호출하여 메시지가 출력되도록 하세요.

```js
function sayHello(){
    console.log("Hello, JavaScript!");
};
sayHello();
```

### 2. **매개변수를 사용하는 함수**

- `greetUser`라는 이름의 함수를 선언하고, `name`이라는 매개변수를 받아서 "Hello, [name]!"을 출력하게 하세요.
- 이 함수를 호출하여 자신의 이름을 넣어 출력해 보세요.

```js
function greetUser(name){
    console.log("Hello," + [name]+"!");
};
greetUser("Hyojin");
```

### 3. **리턴 값을 가지는 함수**

- `multiply`라는 이름의 함수를 선언하고, 두 개의 숫자 `a`와 `b`를 매개변수로 받아서 그 곱을 반환하게 하세요.
- 이 함수를 호출하여 임의의 두 숫자를 곱한 결과를 변수에 저장하고, 그 변수를 `console.log()`로 출력하세요.

```js
function multiply(a,b){
    return (a*b);
}
let mtp = multiply(1,2);
console.log(mtp);
```

### 4. **여러 개의 매개변수를 사용하는 함수**

- `calculateRectangleArea`라는 함수를 선언하고, `width`와 `height`라는 두 매개변수를 받아 직사각형의 넓이를 반환하게 하세요.
- 이 함수를 사용해 가로 5, 세로 10인 직사각형의 넓이를 계산하고 출력하세요.

```js
function calculateRectangleArea(width, height){
    return(width * height);
}
let oblong = calculateRectangleArea(5,10);
console.log(oblong);
```

### 5. **기본 매개변수 값**

- `greetWithDefault`라는 함수를 선언하고, `name` 매개변수에 기본값을 "Guest"로 설정하여 "Hello, [name]!"을 출력하게 하세요.
- 이 함수를 호출할 때 이름을 전달하지 않으면 "Hello, Guest!"가 출력되도록 하세요.

```js
function greetWithDefault(name="Guest"){
    console.log(`Hello, ${name}!`);
};
greetWithDefault();
greetWithDefault("Hyojin");
```
