
/**
 * 스코프와 Scope
    스코프는 변수나 함수가 어디에서 접근 가능한지를 결정하는 규칙

    전역 스코프(Global Scope)
    전역 스코프에 정의된 변수는 코드 어디에서든 접근 가능
    var, let, const로 선언된 변수 중 전역 범위에 선언된 변수는 모두 전역 스코프를 가진다.
*/
    let globalVar = "I am global!";
    function logGlobal() {
        console.log(globalVar); // "I am global!"
    }
    logGlobal();
        console.log(globalVar); // "I am global!"   
    
/*    함수 스코프(Function Scope)
    함수 내부에 선언된 변수는 함수 내부에서만 접근 가능하며 외부에서는 접근할 수 없다.
    var는 함수 스코프를 따른다.
 */
    function example() {
        var localVar = "I am local!";
        console.log(localVar); // "I am local!"
    }
    example();
        console.log(localVar); // ReferenceError: localVar is not defined

/**
 * 블록 스코프(Block Scope)
    {} 블록 내부에 선언된 변수는 블록 외부에서 접근할 수 없다.
    let과 const는 블록 스코프를 따른다.
 */    
    {
        let blockVar = "I am in a block!";
        console.log(blockVar); // "I am in a block!"
    }
        console.log(blockVar); // ReferenceError: blockVar is not defined
    
/**
 * 스코프 체인(Scope Chain)
    내부 스코프에서 변수를 찾을 때, 먼저 자신의 스코프를 확인하고 
    없으면 외부 스코프를 순차적으로 탐색한다.
    전역 스코프까지 도달해도 변수를 찾지 못하면 ReferenceError가 발생한다.
 */
    let outerVar = "I am outer!";

    function outer() {
        let innerVar = "I am inner!";
        
        function inner() {
            console.log(outerVar); // "I am outer!"
            console.log(innerVar); // "I am inner!"
        }
        
        inner();
    }
    outer();


/**
 * 클로저(Closure)
 * 클로저는 함수와 그 함수가 선언된 렉시컬 환경(Lexical Environment)의 조합이다. 
 * 즉, 클로저는 외부 함수의 스코프에 접근할 수 있는 내부 함수이다.
 */
function outer() {
    let outerVar = "I am from outer!";
    
    function inner() {
      console.log(outerVar); // "I am from outer!"
    }

    return inner;
}

  const innerFunc = outer(); // outer()가 실행되어 inner 함수를 반환
  innerFunc(); // "I am from outer!" 출력

/**
 * 클로저의 특징
    외부 함수의 변수에 접근 가능
    - 내부 함수는 외부 함수의 변수를 참조할 수 있다.
    외부 함수 실행이 끝난 후에도 변수 유지
    - 클로저는 외부 함수의 실행 컨텍스트가 사라진 뒤에도 변수를 유지
 */
    // 클로저는 상태를 저장하거나 비공개 데이터를 관리하는 데 유용하다.
    // 상태 유지
    function counter() {
        let count = 0;
        return function () {
            count++;
            return count;
            };
        }
        
        const increment = counter();
        console.log(increment()); // 1
        console.log(increment()); // 2
        console.log(increment()); // 3
