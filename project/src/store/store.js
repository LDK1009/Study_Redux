import { configureStore } from "@reduxjs/toolkit"; // Redux Toolkit에서 스토어를 설정하는 함수 import
import counterReducer from "./counterSlice"; // counterSlice에서 생성된 리듀서 import

// Redux 스토어를 설정하여 export
export default configureStore({
  // reducer 속성에 각 리듀서를 등록
  reducer: {
    // 'counter' 상태는 counterReducer로 관리됩니다.
    counter: counterReducer, // counterSlice에서 가져온 리듀서를 'counter' 상태로 설정
  },
});
