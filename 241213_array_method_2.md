## 1. slice 메서드

> 동작 방식
- 배열의 특정 구간을 복사하여 새 배열을 반환.
- 원본 배열은 변경되지 않음.
- slice(start, end) 형태로 사용하며, start는 시작 인덱스(포함), end는 종료 인덱스(미포함).

```js
const arr = [1, 2, 3, 4, 5];

// 인덱스 1부터 3까지 추출 (3은 포함되지 않음)
const sliced = arr.slice(1, 3);

console.log(sliced); // [2, 3]
console.log(arr);    // [1, 2, 3, 4, 5] (원본 배열은 변경되지 않음)

```
## 2. splice 메서드

> 동작 방식
- 배열의 특정 위치에 데이터를 삽입하거나 삭제.
- 원본 배열이 변경됨.
splice(start, deleteCount, item1, item2, ...) 형태로 사용.
start: 작업을 시작할 인덱스.
deleteCount: 삭제할 요소의 개수.
item1, item2, ...: 삽입할 요소들.

```js
const arr = [1, 2, 3, 4, 5];

// 인덱스 2부터 2개 요소 삭제
const removed = arr.splice(2, 2);

console.log(removed); // [3, 4]
console.log(arr);     // [1, 2, 5]

// 인덱스 1에 새로운 값 삽입
arr.splice(1, 0, 6, 7);

console.log(arr);     // [1, 6, 7, 2, 5]

```
## 3. reverse 메서드
> 동작 방식
- 배열의 요소를 역순으로 정렬.
- 원본 배열이 변경됨.

```js
const arr = [1, 2, 3, 4, 5];

// 배열을 역순으로 정렬
arr.reverse();

console.log(arr); // [5, 4, 3, 2, 1]

```

## 실습 예제
#### 1. 3가지 메서드 활용
```js
const arr = [1, 2, 3, 4, 5, 6, 7];

// 1. 중간 3개 요소 추출
const middle = arr.slice(2, 5);

// 2. 추출한 요소를 역순으로 정렬
middle.reverse();

// 3. 원래 배열 끝에 삽입
arr.splice(arr.length, 0, ...middle);

console.log(arr); // [1, 2, 3, 4, 5, 6, 7, 5, 4, 3]

```
#### 2. 짝수만 추출하고, 역순으로 정렬하여 새 배열 반환

- 배열에서 짝수만 필터링.
- 필터링된 배열을 역순으로 정렬.
```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// 짝수만 필터링
const evenNumbers = arr.filter(num => num % 2 === 0);

// 역순 정렬
const reversedEvens = evenNumbers.reverse();

console.log(reversedEvens); // [8, 6, 4, 2]

```
#### 3. 배열에서 특정 요소 제거 후 다른 값 삽입

- 특정 요소를 포함한 인덱스를 찾아 제거.
- 동일한 위치에 새로운 값을 삽입.
```js
const arr = [1, 2, 3, 4, 5];

// 인덱스 2의 요소를 제거하고 새로운 값을 삽입
arr.splice(2, 1, 6, 7);

console.log(arr); // [1, 2, 6, 7, 4, 5]

```
#### 4. 문자열 배열 뒤집고 특정 구간 추출
- 문자열 배열을 reverse로 뒤집기.
- 뒤집힌 배열에서 특정 구간을 slice로 추출.
```js
const arr = ["apple", "banana", "cherry", "date", "elderberry"];

// 배열 뒤집기
arr.reverse();

// 특정 구간 추출 (인덱스 1부터 3까지)
const sliced = arr.slice(1, 4);

console.log(sliced); // ["date", "cherry", "banana"]

```