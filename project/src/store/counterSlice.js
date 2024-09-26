import { createSlice } from "@reduxjs/toolkit";

// createSlice를 사용하여 'counter' 상태를 관리하는 slice를 생성합니다.
export const counterSlice = createSlice({
  // slice의 이름을 'counter'로 설정
  name: "counter",
  // 초기 상태 값 설정
  initialState: {
    value: 0, // 카운터의 초기 값은 0
  },
  // 상태를 변경하는 리듀서 함수 정의
  reducers: {
    // increment 리듀서: 상태의 value 값을 1 증가
    increment: (state) => {
      // Redux Toolkit은 리듀서에서 "변경(mutating)" 로직을 작성할 수 있게 합니다.
      // 실제로는 상태를 직접 변경하지 않고, immer 라이브러리를 사용하여
      // 변경된 "초안 상태(draft state)"를 감지하고 새로운 불변 상태를 반환합니다.
      state.value += 1;
    },
    // decrement 리듀서: 상태의 value 값을 1 감소
    decrement: (state) => {
      state.value -= 1;
    },
    // incrementByAmount 리듀서: 액션의 payload 값만큼 value를 증가
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 리듀서에서 자동으로 생성된 액션들(increment, decrement, incrementByAmount)을 export
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 아래 함수는 "thunk"라고 불리며 비동기 로직을 수행할 수 있게 해줍니다.
// `dispatch(incrementAsync(10))`과 같이 일반 액션처럼 디스패치할 수 있습니다.
// 이 thunk는 첫 번째 인자로 `dispatch` 함수를 받아서 비동기 코드를 실행하고,
// 필요할 때 다른 액션을 디스패치할 수 있습니다.
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount)); // 1초 후에 incrementByAmount 액션 디스패치
  }, 1000);
};

// 아래 함수는 "selector"라고 불리며 상태에서 값을 선택할 수 있습니다.
// 이 selector는 상태에서 counter의 value 값을 반환합니다.
// selector는 다른 곳에서 인라인으로 정의될 수도 있습니다.
// 사용방법 : useSelector(selectCount);
export const selectCount = (state) => state.counter.value;

// counterSlice에서 생성된 리듀서를 기본 내보내기(export) 합니다.
export default counterSlice.reducer;
