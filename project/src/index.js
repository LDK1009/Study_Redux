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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
