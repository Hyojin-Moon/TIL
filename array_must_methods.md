### forEach()
forEach 메서드는 배열의 각 요소에 대해 콜백 함수를 실행하며, 순서대로 요소에 접근할 수 있다.

- **기본코드**
```js
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(num * 2));
// 출력: 2, 4, 6, 8, 10

```
- **배열 요소에 조건부 작업 수행**
```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = [];
const oddNumbers = [];

numbers.forEach((number) => {
  if (number % 2 === 0) {
    evenNumbers.push(number);
  } else {
    oddNumbers.push(number);
  }
});

console.log("Even Numbers:", evenNumbers); // [2, 4, 6, 8, 10]
console.log("Odd Numbers:", oddNumbers);   // [1, 3, 5, 7, 9]

```
- **객체 배열의 특정 키 값 수정**
```js
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 19 },
  { id: 3, name: "Charlie", age: 30 }
];

users.forEach((user) => {
  if (user.age >= 25) {
    user.name = `${user.name} (Adult)`;
  }
});

console.log(users);
/* 
[
  { id: 1, name: 'Alice (Adult)', age: 25 },
  { id: 2, name: 'Bob', age: 19 },
  { id: 3, name: 'Charlie (Adult)', age: 30 }
]
*/

```
- **중첩 배열 평탄화**
```js
const nestedArray = [[1, 2], [3, 4], [5, 6]];
const flatArray = [];

nestedArray.forEach((subArray) => {
  subArray.forEach((item) => {
    flatArray.push(item);
  });
});

console.log(flatArray); // [1, 2, 3, 4, 5, 6]

```
- **요소의 통계 계산**
```js
const scores = [85, 90, 78, 92, 88];
let total = 0;

scores.forEach((score) => {
  total += score;
});

const average = total / scores.length;

console.log("Total:", total);    // 433
console.log("Average:", average); // 86.6

```
- **에러 핸들링이 필요한 작업**
```js
const data = [10, "20", null, 30, "invalid", 40];
let sum = 0;

data.forEach((value) => {
  if (typeof value === "number" && !isNaN(value)) {
    sum += value;
  }
});

console.log("Valid Data Sum:", sum); // 80

```
- **인덱스를 활용한 복합 작업**
```
const numbers = [1, 2, 3, 4];
const results = [];

numbers.forEach((number, index) => {
  results.push({ index: index, square: number ** 2 });
});

console.log(results);
/* 
[
  { index: 0, square: 1 },
  { index: 1, square: 4 },
  { index: 2, square: 9 },
  { index: 3, square: 16 }
]
*/

```

아래는 배열의 요소를 추가하거나 삭제할 때 사용하는 메서드이다.

### 1. push
- 배열 끝에 요소를 추가한다.
- 배열의 새로운 길이를 반환한다.

```js
const arr = [1, 2, 3];
arr.push(4); // [1, 2, 3, 4]
console.log(arr); // [1, 2, 3, 4]
```
### 2. pop
- 배열 끝의 요소를 제거한다.
- 제거된 요소를 반환한다.

```js
const arr = [1, 2, 3, 4];
const removedElement = arr.pop(); // [1, 2, 3]
console.log(removedElement); // 4
console.log(arr); // [1, 2, 3]
```
### 3. shift
- 배열 앞의 요소를 제거한다.
- 제거된 요소를 반환한다.

```
const arr = [1, 2, 3];
const firstElement = arr.shift(); // [2, 3]
console.log(firstElement); // 1
console.log(arr); // [2, 3]
```
### 4. unshift
- 배열 앞에 요소를 추가한다.
- 배열의 새로운 길이를 반환한다.

```js
const arr = [2, 3];
arr.unshift(1); // [1, 2, 3]
console.log(arr); // [1, 2, 3]
```
### 5. splice
- 배열의 특정 위치에 요소를 추가하거나 제거한다.
- 첫 번째 매개변수: 시작 인덱스
- 두 번째 매개변수: 제거할 요소의 개수
- 세 번째 이후 매개변수: 추가할 요소들

**요소 제거**
```js
const arr = [1, 2, 3, 4];
arr.splice(1, 2); // [1, 4]
console.log(arr); // [1, 4]
```
**요소 추가**
```js
const arr = [1, 4];
arr.splice(1, 0, 2, 3); // [1, 2, 3, 4]
console.log(arr); // [1, 2, 3, 4]
```
**요소 교체**
```js
const arr = [1, 2, 3, 4];
arr.splice(2, 1, 99); // [1, 2, 99, 4]
console.log(arr); // [1, 2, 99, 4]

```
