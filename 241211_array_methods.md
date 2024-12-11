## 1. forEach
설명: 배열의 각 요소에 대해 주어진 콜백 함수를 한 번씩 실행한다.
특징: 반환값이 없으며, 주로 배열의 각 요소를 순회하며 부수 효과를 발생시키는 데 사용된다.
```js
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(num * 2));
// 출력: 2, 4, 6, 8, 10
```
## 2. map
설명: 배열의 각 요소를 변환하여 새로운 배열을 생성한다.
특징: 원본 배열은 변경되지 않는다.
```js
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]
```
## 3. filter
설명: 조건을 만족하는 요소들로만 이루어진 새로운 배열을 반환한다.
특징: 조건에 맞지 않는 요소는 필터링 된다.
```js
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
```
## 4. reduce
설명: 배열을 단일 값으로 축소한다. 누산기(accumulator)를 사용하여 각 요소를 반복적으로 처리한다.
특징: 초기값을 설정할 수 있으며, 콜백 함수의 결과를 누적한다.
```js
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```
## 5. find
설명: 조건을 만족하는 첫 번째 요소를 반환한다.
특징: 조건을 만족하는 요소가 없으면 undefined를 반환한다.

```js
const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const user = users.find(user => user.id === 2);
console.log(user); // { id: 2, name: 'Bob' }
```
## 6. findIndex
설명: 조건을 만족하는 첫 번째 요소의 인덱스를 반환한다.
특징: 조건에 맞는 요소가 없으면 -1을 반환한다.
```js
const numbers = [10, 20, 30];
const index = numbers.findIndex(num => num === 20);
console.log(index); // 1
```
## 7. some
설명: 배열의 요소 중 하나라도 조건을 만족하면 true를 반환한다.
특징: 하나라도 조건을 만족하면 반복을 중단한다.

```js
const numbers = [1, 2, 3];
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true
```
## 8. every
설명: 배열의 모든 요소가 조건을 만족하면 true를 반환한다.
특징: 하나라도 조건을 만족하지 않으면 false를 반환한다.

```js
const numbers = [2, 4, 6];
const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // true
```
## 9. sort
설명: 배열을 정렬한다.
특징: 기본적으로 요소를 문자열로 취급하며, 숫자를 정렬하려면 비교 함수를 전달해야 한다.

```js
const numbers = [3, 1, 4, 1, 5];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 1, 3, 4, 5]
```
## 10. splice
설명: 배열의 요소를 추가, 제거 또는 교체 한다.
특징: 원본 배열을 변경한다.

```js
const numbers = [1, 2, 3, 4];
numbers.splice(1, 2, 99, 100); // 1번 인덱스에서 2개 제거 후 추가
console.log(numbers); // [1, 99, 100, 4]
```
## 11. slice
설명: 배열의 일부를 추출하여 새로운 배열을 반환한다.
특징: 원본 배열은 변경되지 않는다.

```js
const numbers = [1, 2, 3, 4];
const subArray = numbers.slice(1, 3); // 1번 인덱스부터 3번 인덱스 직전까지
console.log(subArray); // [2, 3]
```