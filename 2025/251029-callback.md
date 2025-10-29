최근 면접에서 자바스크립트 질문(특히 스코프, 클로저)에 제대로 답하지 못한 게 너무 아쉬워서,

기본기를 다시 정리해보기로 했다.

지식은 외우는 게 아니라 **“내 언어로 설명할 수 있을 때 진짜 내 것이 된다.”**

여러 질문들에 대해 복기 하면서 애매했던 개념들에 대해 다시 정리해보려 한다.

콜백함수

콜백함수를 검색하면 나오는 정의는 

“매개변수로 함수 객체를 전달해서 호출함수 내에서 매개변수 함수를 실행하는 것”

이라고 나온다. 난 아직도 이렇게 말하면 못알아 먹겠다.

그래서 구글링과 지피티와의 문답을 통해 나만의 개념을 잡으려 했고 내가 생각한 정의는 이렇다.

“함수는 어떠한 기능의 모음이다. 함수 내부에 값과 그 계산값만 넣고 싶은게 아니고 기능(함수)안에 기능을 넣고 싶을 때가 있을 것이다. 이때 인자로 넣어주는 기능의 모음, 즉 함수를 콜백함수라고 한다.”

예시로 보면 이런 느낌이다

```jsx
function moon(name, callback) {
  console.log(`안녕 ${name}`); // 첫 번째 인자 실행
  callback(); // 두 번째 인자(함수) 실행
}

function sayBye() {
  console.log("잘가");
}

moon("효진", sayBye); // 호출 시 sayBye 함수 자체를 전달
// 주의할점 !! 아래처럼 쓰면 즉시 실행됨. sayBye의 리턴값을 전달하게 된다.
moon("효진", sayBye()); 

/**
안녕 효진
잘가유
/
```

결국 나는 나만의 언어로 풀어서 이해해야 했고 좀 더 명확하게 알 수 있었다.

### **요약**

- 함수는 즉시 실행되지만 **콜백 함수는 ‘언제 실행할지’를 다른 함수가 결정**한다.
- 즉, **실행 시점을 제어할 수 있다.**
- 그래서 콜백은 “기능 안에 기능을 넣는 방법”이자, “함수 실행 시점을 제어하는 도구”다.

JS에서 비동기 처리를 할 때 자주 쓰인다.

```jsx
console.log("1");

setTimeout(() => {
  console.log("2 (1초 뒤 실행)");
}, 1000);

console.log("3");

//결과
1
3
2 (1초 뒤 실행)
```

() => { console.log("2") } 부분이 콜백 함수

실행 자체는 나중에 콜스택이 비워질 때 이벤트 루프가 처리

콜백은 보통 익명함수(Anonymous Function)으로 쓰는데 왜 그럴까 싶었다.

콜백은 **한 번만 쓰이는 짧은 로직**이라 굳이 이름을 붙일 필요 없다고 한다. 예시로 확인해보자.

```jsx
//nomarl
moon("효진", function() {
  console.log("익명 콜백 함수 실행!");
});
//arrow
moon("효진", () => {
  console.log("익명 콜백 실행!");
});
```

이렇게 되면 별도의 sayBye()함수를 정의할 필요가 없이 그자리에서 바로 콜백역할만 수행

| **구분** | **설명** | **예시** |
| --- | --- | --- |
| **콜백 함수** | 인자로 전달되어 나중에 실행되는 함수 | run(() => console.log("hi")) |
| **익명 콜백** | 이름 없이 인라인으로 선언된 콜백 | () => { ... } |
| **인자 구분법** | 값은 "문자", 함수는 function 혹은 ()=> 형태 | moon("효진", sayBye) |
| **괄호 주의** | sayBye() → 실행 결과 전달, sayBye → 함수 자체 전달 | ✅ sayBye / ❌ sayBye() |

화살표 함수로 사용할 때의 문법

- 표현식이므로 아래처럼 사용한다

```jsx
const moon = (name, callback) => {
  console.log(`안녕 ${name}`);
  callback();
};
```

**인자에 “값 없이 콜백 함수만” 넘겨주는 경우**

```jsx
setTimeout(() => {
  console.log("3초 뒤 실행");
}, 3000);
```

콜백만 받는 함수

```jsx
const run = (callback) => {
	console.log("콜백 전 실행");
	callback();
	console.log("콜백 후 실행");
}

run(()=>{
	console.log("콜백 내부 코드");
})

//결과
콜백 전 실행
콜백 내부 코드
콜백 후 실행
```

조건에 따라 콜백 실행

```jsx
const ifTrue = (condition, callback) => {
  if (condition) {
    callback();
  } else {
    console.log("조건이 false라서 콜백 안 실행");
  }
};

ifTrue(true, () => console.log("조건 충족! 실행!"));
ifTrue(false, () => console.log("이건 실행 안 됨"));
```

콜백 체이닝 (콜백 여러개 받기 )

```jsx
const process = (start, middle, end) => {
  start();
  middle();
  end();
};

process(
  () => console.log("시작"),
  () => console.log("중간"),
  () => console.log("끝")
);
```

이 구조는 나중에 “Promise”, “async/await”로 발전한다.

---

Call Stack

하나씩 파헤쳐 가다보니 왜 콜백은 나중에 실행되는가에 대한 의문이 생긴다. 여기서 전에 봤던 콜스택의 개념이 등장한다. “자바스크립트에서 함수를 실행할 때 관리하는 스택이며 나중에 들어온게 먼저 나간다.” 라는 개념으로 알고 있었다. 어느정도는 맞는 말일 수 있으나 콜백함수와 함께 정확한 개념을 다시 정리해보자.

콜스택은 자바스크립트 엔진(V8 등)이 함수 실행을 추적하는 **실행 기록 메모리 공간**

아래부터 쌓이고 위에서부터 빠져나간다 (LIFO: Last In, First Out)

```jsx
function first() {
  console.log("첫 번째");
}

function second() {
  first();
  console.log("두 번째");
}

second();

//실행 순서
	1.	second()가 호출되면 → 콜스택에 push
	2.	second 내부에서 first() 호출 → 콜스택 위에 push
	3.	first() 실행 끝나면 → 콜스택에서 pop
	4.	다시 second() 남은 부분 실행 후 → pop
```

**콜백 함수는 왜 “나중에” 실행될까?**
그 자체가 **비동기 API(Web API, Node API)** 에 의해 “스택 바깥으로 위임”되기 때문

```jsx
console.log("시작");

setTimeout(() => {
  console.log("콜백 실행");
}, 1000);

console.log("끝");

//실행 과정
	1.	console.log("시작") → 스택에 올라가서 실행 → pop
	2.	setTimeout(...) → 콜스택에 push
	•	하지만 JS 엔진은 타이머를 직접 실행하지 않는다.
	•	브라우저의 Web API 영역에 타이머를 위임한다.
	3.	setTimeout 함수는 콜스택에서 pop
	4.	1초 후, Web API가 “이 콜백 실행 준비 완료”를 Callback Queue로 보냄
	5.	Event Loop가 콜스택이 비는 순간 큐에서 콜백을 가져와 다시 스택에 push
```

정리

자바스크립트 엔진은 단일 스레드이지만,

Web API + Callback Queue + Event Loop 구조

비동기 콜백을 나중에 실행할 수 있다.

| **개념** | **설명** |
| --- | --- |
| **콜스택(Call Stack)** | 자바스크립트 엔진이 현재 실행 중인 함수의 순서를 관리 |
| **Web APIs** | 브라우저가 제공하는 비동기 처리 영역 (setTimeout, DOM Event, fetch 등) |
| **Callback Queue(Task Queue)** | 실행 준비가 완료된 콜백들이 대기하는 공간 |
| **Event Loop** | 스택이 비면 큐에서 하나씩 꺼내서 다시 스택에 넣는 관리자 역할 |

---
TODO

this
스코프
클로저
호이스팅

호이스팅
