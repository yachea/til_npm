import { useEffect } from "react";
import { getTodos } from "./apis/todoApi";

function App() {
  // js 자리
  // 할일 목록 비동기 통신 함수

  useEffect(() => {
    getTodos();
  }, []);
  // jsx 자리
  return <div>App</div>;
}

export default App;
