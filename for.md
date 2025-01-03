## 1. for문
- 반복 횟수를 명확히 알고 있을 때 유용하다.
- 배열이나 숫자 범위를 순회할 때 주로 사용된다.
### 구조
```js
for (초기식; 조건식; 증감식) {
  // 실행할 코드
}

```


### 예시
```js
// 1부터 5까지 출력
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

```

## 2. while문
- 조건이 참인 동안 계속 반복
- 반복 횟수를 사전에 알 수 없거나 조건 기반 반복이 필요한 경우 사용
### 구조
```js
while (조건식) {
  // 실행할 코드
}
```


### 예시
```js
// 1부터 5까지 출력
let i = 1;
while (i <= 5) {
  console.log(i);
  i++;
}

```

## 3. do...while문

- 코드 블록을 최소한 한 번은 실행
- 조건을 나중에 평가한다.

### 구조
```js
do {
  // 실행할 코드
} while (조건식);

```
### 예시
```js
let i = 6;
do {
  console.log(i);
  i++;
} while (i <= 5); // 조건이 거짓이라도 한 번 실행됨

```

## 4. for...of문

- 배열, 문자열, Map, Set 등 반복 가능한(iterable) 객체를 순회할 때 사용된다.
- 반복되는 각 요소의 값을 반환한다.

### 구조
```js
for (const 변수 of iterable) {
  // 실행할 코드
}

```
### 예시
```js
const fruits = ['apple', 'banana', 'cherry'];
for (const fruit of fruits) {
  console.log(fruit);
}
// 출력: apple, banana, cherry

```

## 5. for...in문
- 객체의 열거 가능한(enumerable) 속성을 순회한다.
- 속성 이름(키)을 반환한다.

### 구조
```js
for (const 변수 in 객체) {
  // 실행할 코드
}

```
### 예시
```js
const user = { name: 'John', age: 30 };
for (const key in user) {
  console.log(key, user[key]);
}
// 출력: name John, age 30

```

# 배열 메소드와 반복
## 6.forEach
- 배열에서 각 요소를 순회하며 콜백 함수에 요소를 전달한다.
- 내부적으로 배열의 길이만큼 자동으로 순회한다.
- 반환값이 없고, 반복을 중간에 종료할 수 없다 (break 불가).

### 구조
```js
array.forEach((요소, 인덱스, 배열) => {
  // 실행할 코드
});

```
### 매개변수
- 요소: 현재 순회 중인 배열의 값
- 인덱스(옵션): 현재 요소의 인덱스
- 배열(옵션): forEach가 호출된 배열 자체

### 예시
```js
const fruits = ['apple', 'banana', 'cherry'];

// 단순 순회
fruits.forEach((fruit) => {
  console.log(fruit);
});
// 출력: apple, banana, cherry

// 요소와 인덱스 사용
fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});
// 출력:
// 0: apple
// 1: banana
// 2: cherry

```

## 7. map()
- 배열의 각 요소를 변환하여 새로운 배열을 반환한다.
```js
const numbers = [1, 2, 3];
const squares = numbers.map((num) => num ** 2);
console.log(squares);
// 출력: [1, 4, 9]

```
## 8. filter()
- 조건에 맞는 요소들만 걸러내 새로운 배열을 반환한다.
```js
const numbers = [1, 2, 3, 4];
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers);
// 출력: [2, 4]

```
## 9. reduce()
- 배열을 누적하여 하나의 값으로 줄입니다.
```js
const numbers = [1, 2, 3];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum);
// 출력: 6

```

## 10. 중첩반복문
> 중첩 반복문은 하나의 반복문 안에서 또 다른 반복문을 사용하는 구조이다. 이 방식은 **다차원 배열을 순회**하거나 **두 개의 데이터 구조를 비교**할 때 자주 사용된다.

**주의사항**
- 시간 복잡도
중첩 반복문 사용시 O(n²) 이상의 시간 복잡도를 가질 수 있어 데이터가 많을 경우 성능에 문제가 발생할 수 있다.

- 가독성
너무 깊은 중첩은 가독성을 해치므로 map이나 reduce를 사용하여 간소화 하려고 하는것이 좋다.

### 다차원배열 순회
- #### for문 구조
```js
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(matrix[i][j]);
  }
}
// 출력: 1, 2, 3, 4, 5, 6, 7, 8, 9

```
- #### forEach 구조
```js
matrix.forEach((row) => {
  row.forEach((element) => {
    console.log(element);
  });
});
// 출력: 1, 2, 3, 4, 5, 6, 7, 8, 9

```

### 배열 비교
```js
const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5];

arr1.forEach((item1) => {
  arr2.forEach((item2) => {
    if (item1 === item2) {
      console.log(`공통 요소: ${item1}`);
    }
  });
});
// 출력: 공통 요소: 3

```

## 반복문 사용시 주의할 점
### 1. 무한 루프 방지
 - 조건이 항상 true라면 반복문이 종료되지 않으므로 조건식을 주의깊게 살펴야 한다.
### 2. 효율성
 - 반복이 많아질수록 성능에 영향을 줄 수 있다.
 
>  반복문에 대해 간단하게 정리해 보았다. 배열메소드에 관련해서
 다음번에 더 자세히 다루어 보아야겠다.
