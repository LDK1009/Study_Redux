import React, { useState } from "react"; // React와 useState를 import
import { useSelector, useDispatch } from "react-redux"; // Redux에서 상태를 선택하고 액션을 디스패치하기 위한 훅
import { decrement, increment, incrementByAmount, incrementAsync, selectCount } from "../store/counterSlice"; // 필요한 Redux 액션과 selector를 import

// Counter 컴포넌트 정의
export function Counter() {
  // useSelector 훅을 사용해 Redux 스토어에서 count 값을 가져옴
  const count = useSelector(selectCount);
  // useDispatch 훅을 사용해 액션을 디스패치할 함수 가져옴
  const dispatch = useDispatch();
  // 로컬 상태로 사용되는 incrementAmount, 기본값은 문자열 "2"
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div>
        {/* increment 액션을 디스패치하여 count 값을 1 증가 */}
        {/* dispatch({ type: "counter/increment" })와 동일한 결과를 도출한다. */}
        <button onClick={() => dispatch(increment())}>+</button>
        {/* 현재 count 값 표시 */}
        <span>{count}</span>
        {/* decrement 액션을 디스패치하여 count 값을 1 감소 */}
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <div>
        {/* 입력된 값을 incrementAmount 상태로 저장 */}
        <input value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)} />
        {/* incrementByAmount 액션을 디스패치하여 입력된 값만큼 count 증가 */}
        <button onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>Add Amount</button>
        {/* incrementAsync 액션을 디스패치하여 입력된 값만큼 비동기적으로 count 증가 */}
        <button onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}>Add Async</button>
      </div>
    </div>
  );
}
