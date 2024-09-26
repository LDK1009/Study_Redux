# 개념

> 액션(Action)
* 액션은 type, payload 필드를 가진 **JS 객체(Object)**입니다.
* type 필드에는 애플리케이션에서 발생한 작업을 설명하는 문자열이 들어갑니다.<br/>
ex) todos/todoAdded
* payload 필드에는 작업에 대한 추가 정보가 들어갑니다.

```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```

> 액션 생성자(Action Creators)
* 액션 생성자는 **액션 객체를 생성하고 반환하는 함수**입니다.
* 액션 생성자를 통해 액션 객체를 생성할 수 있으므로 매번 액션 객체를 직접 작성할 필요가 없습니다.

```js
/**
 * addTodo라는 함수명을 가진 함수를 선언한다.
 * 해당 함수는 text 라는 인수를 갖는다.
 * 해당 함수는 해당 text값을 payload에 대입한 Action 객체를 생성하여 반환한다.
 */
const addTodo = (text) => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}
```

> 리듀서(Reducers)
* 리듀서는 현재 상태(state)와 액션 객체(action)을 인수로 받아 새로운 상태를 반환하는 함수입니다. 
* 리듀서는 수신된 액션(이벤트) 유형에 따라 이벤트를 처리하는 이벤트 리스너로 생각할 수 있습니다.

> 리듀서 규칙(Reducers Rules)
1. 상태(state)와 액션(action) 인수를 기반으로 새 상태 값만 계산해야 합니다. 
2. 기존 상태를 수정할 수 없습니다.
대신 기존 상태를 복사하고 복사된 값을 변경하는 방식으로 변경 불가능한 업데이트를 수행해야 합니다.
3. 비동기 로직을 수행하거나 임의의 값을 계산하거나 기타 "부작용"을 일으키지 않아야 합니다.

> 스토어(store)
* Redux에서 상태는 스토어(store)에 저장됩니다.
* 스토어는 configureStore 함수를 통해 생성되며 인수로 리듀서를 전달 해야합니다.
* getState 메서드를 통해 현재 상태 값을 알 수 있습니다.
* dispatch 메서드를 통해 상태를 업데이트 할 수 있습니다.

```js
// 아래는 예시코드이며 일부 코드가 작성되어 있다고 가정합니다.
import { configureStore } from '@reduxjs/toolkit'

// 스토어 생성
/** 
 * 인수로 객체를 전달하며 reducer 필드에 counterReducer를 전달한다.
 * 이 때 counterReducer가 작성되어 있다고 가정한다.
 * */
const store = configureStore({ reducer: counterReducer })

// 현재 상태값 가져오기
console.log(store.getState()) // {value: 0}

// 상태 업데이트
/** 
 * 인수로 액션(Action) 객체를 전달하며 type으로 아래와 같은 문자열을 전달한다.
 * 이 때, 스토어에 인수로 전달한 타입에 해당하는 리듀서가 작성되어 있다고 가정한다. (state를 1 증가시키는 리듀서)
*/
store.dispatch({ type: 'counter/increment' })

// 현재 상태값 가져오기
// 리듀서에 의해 state가 1증가한 것을 확인할 수 있다.
console.log(store.getState()) // {value: 1}
```

> 액션 생성자
윗 부분 코드에서 dispatch 인수를 전달할 때 액션 생성자를 이용할 수 있다.

```js
const increment = () => {
  return {
    type: 'counter/increment'
  }
}

store.dispatch(increment())

console.log(store.getState()) // {value: 2}
```


> 선택자
윗 부분 코드에서 getState로 state값을 읽을 때 생성자를 통해 반복되는 코드 작성을 피할 수 있다.

```js
const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue) // 2
```

# 실습

[실습 코드 링크](https://codesandbox.io/p/sandbox/github/reduxjs/redux-essentials-counter-example/tree/master/?from-embed)

[실습 코드 해석](https://ko.redux.js.org/tutorials/essentials/part-2-app-structure)

> 폴더 구조
```
project/
│
├── src/                    # 소스 코드 폴더 (React 컴포넌트와 Redux 파일들)
│   ├── components/         # UI 컴포넌트들이 위치하는 폴더
│   │   └── Counter.js      # Counter 컴포넌트 (카운터 관련 UI 로직을 처리)
│   ├── store/              # Redux 관련 파일들이 위치하는 폴더
│   │   ├── counterSlice.js # Redux slice 파일, 상태와 리듀서 정의 (카운터 관련 리듀서 및 액션)
│   │   └── store.js        # Redux 스토어 설정 파일 (리듀서 결합 및 스토어 설정)
│   ├── App.js              # 메인 App 컴포넌트 파일 (최상위 컴포넌트)
│   └── index.js            # ReactDOM.render를 통해 App을 렌더링하는 엔트리 파일
└──
```



> 1. store.js 생성
* Redux 스토어를 중앙에서 관리하고, 애플리케이션의 모든 상태(state)를 한 곳에서 관리할 수 있도록 설정하기 위해서 store.js 파일을 생성합니다.
* 이후 과정에서 counterSlice.js (리듀서)를 작성할 것이니 임포트 오류는 잠시 무시한다. 

```js
import { configureStore } from '@reduxjs/toolkit'; // Redux Toolkit에서 스토어를 설정하는 함수 import
import counterReducer from './counterSlice';       // counterSlice에서 생성된 리듀서 import

// Redux 스토어를 설정하여 export
export default configureStore({
  // reducer 속성에 각 리듀서를 등록
  reducer: {
    // 'counter' 상태는 counterReducer로 관리됩니다.
    counter: counterReducer,  // counterSlice에서 가져온 리듀서를 'counter' 상태로 설정
  },
});

```

> 2. <App /> 컴포넌트를 <Provider /> 로 감싸기
* Redux 스토어를 React 컴포넌트 트리 전체에 주입하여, 모든 하위 컴포넌트가 Redux 스토어에 접근할 수 있도록 하기 위해 <App /> 컴포넌트를 <Provider /> 로 감싸줍니다.


```js
// App.js

// 기본 임포트
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Redux 관련
import { Provider } from "react-redux";
import store from "../src/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Provider 컴포넌트를 사용하여 Redux 스토어를 React 애플리케이션에 주입합니다. */}
    {/* Provider는 react-redux 패키지에서 제공하는 컴포넌트로, Redux 스토어를 React 컴포넌트 트리 안에서 사용할 수 있게 해줍니다. */}
    {/* App 컴포넌트는 Redux 스토어에 연결된 최상위 컴포넌트입니다.
      Provider로 감싸져 있기 때문에 App 컴포넌트와 그 하위 컴포넌트는
      Redux 스토어에 접근할 수 있습니다. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
```

> 3. 리듀서(counterSlice) 작성
* 위 1,2 과정이 세팅 과정이라면 리듀서를 작성하는 3번 과정부터는 counterSlice.js 파일을 생성하여 상태(state)를 관리하고, 액션(action)에 따라 상태를 변경하는 로직을 정의하는 코드를 작성합니다.
* createSlice 함수를 사용하여 상태 관리 slice를 생성합니다.
* 이 때 useState 훅을 연상하면 이해하기 쉽습니다.
* initialState는 state의 초기 상태 값을 설정합니다. 
( ex)useState({value: 0,}) 과 비슷합니다.)
* reducers 함수 정의는 setValue((prev) => prev + 1 ) 와 비슷합니다.
* 이 때 리듀서 규칙(Reducers Rules)을 어기는 특정 함수들은 slice 외부에 따로 정의합니다.

```js
import { createSlice } from '@reduxjs/toolkit'

// createSlice를 사용하여 'counter' 상태를 관리하는 slice를 생성합니다.
export const counterSlice = createSlice({
  // slice의 이름을 'counter'로 설정
  name: 'counter',
  
  // 초기 상태 값 설정(useState 훅을 생각하면 이해하기 쉽다.)
  initialState: {
    value: 0, // 카운터의 초기 값은 0
  },

  // 상태를 변경하는 리듀서 함수 정의
  /** 
   * 이 때 createSlice 함수를 사용했기 때문에 리듀서와 함께 자동으로 액션 생성자 함수들이 정의됩니다.
   * 인수로 state만 받는 리듀서는 고정된 로직을 실행하며, 주어진 상태에서 어떤 추가 정보도 필요 없이 상태를 업데이트합니다.
   * 인수로 state와 action을 모두 받는 리듀서는 액션의 payload(추가 데이터)를 사용하여 상태를 동적으로 업데이트합니다.
   * 즉, action.payload에 담긴 값을 참조하여 상태를 그 값만큼 증가시키거나, 특정 데이터에 따라 상태를 변경하는 작업을 수행합니다.
   * 각각 사용방법은 아래와 같습니다.
   * dispatch(increment()) | dispatch(incrementByAmount(5))
  */
  reducers: {
    // increment 리듀서: 상태의 value 값을 1 증가
    increment: (state) => {
      state.value += 1
    },
    // decrement 리듀서: 상태의 value 값을 1 감소
    decrement: (state) => {
      state.value -= 1
    },
    // incrementByAmount 리듀서: 액션의 payload 값만큼 value를 증가
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// 리듀서에서 자동으로 생성된 액션들(increment, decrement, incrementByAmount)을 export 합니다.
// 이 때 createSlice함수를 사용했기 때문에 counterSlice.actions가 자동으로 생성된 것을 확인할 수 있습니다.
export const { increment, decrement, incrementByAmount } = counterSlice.actions

/** 
 * 아래 함수는 "thunk"라고 불리며 비동기 로직을 수행할 수 있게 해줍니다.
 * `dispatch(incrementAsync(10))`과 같이 일반 액션처럼 디스패치할 수 있습니다.
 * 이 thunk는 첫 번째 인자로 `dispatch` 함수를 받아서 비동기 코드를 실행하고, 필요할 때 다른 액션을 디스패치할 수 있습니다.
 * thunk가 고차 함수로 작성되는 이유는 비동기 작업과 비즈니스 로직을 처리하면서 Redux의 액션 디스패치 기능을 사용할 수 있게 하기 위함입니다.
*/
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount)) // 1초 후에 incrementByAmount 액션 디스패치
  }, 1000)
}

/** 
 * 아래 함수는 "selector"라고 불리며 상태에서 값을 선택할 수 있습니다.
 * 이 selector는 상태에서 counter의 value 값을 반환합니다.
 * selector는 다른 곳에서 인라인으로 정의될 수도 있습니다.
 * 객체지향프로그래밍의 DTO를 생각하시면 이해가 쉽습니다.
 * 사용방법 : `useSelector(selectCount)`
* */ 
export const selectCount = (state) => state.counter.value

// counterSlice에서 생성된 리듀서를 기본 내보내기(export) 합니다.
export default counterSlice.reducer

```