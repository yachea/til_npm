import { animate, createDraggable } from "animejs";
import { useEffect, useRef } from "react";
// import anime from "animejs";

function AniPage() {
  // js자리
  const BoxWrap = {
    position: "relative",
    width: "80%",
    height: "50vh",
    backgroundColor: "yellowgreen",
  };
  const BoxStyle = {
    position: "absolute",
    left: 100,
    top: 250,
    width: 100,
    height: 100,
    backgroundColor: "#d11010",
  };
  // html 버전이면 querySelector(",클래스명")
  // React 에서는 useRef(null) 를 활용함
  const boxRef = useRef(null);
  // 모션
  const motionA = () => {
    animate(boxRef.current, {
      left: "240px",
      backgroundColor: "#fff",
      borderRadius: ["0%", "50%"],
      easing: "easeInOutQuad",
      duration: 5000,
    });
  };
  const motionB = () => {
    animate(boxRef.current, {
      scale: 1.5,
      left: 0,
      backgroundColor: "#2f2588",
      borderRadius: ["50%", "0%"],
    });
  };
  const motionC = () => {
    animate(boxRef.current, {
      scale: 1,
      top: 100,
      left: 0,
      backgroundColor: "#25b3ab",
      borderRadius: ["50%", "0%"],
      duration: 2000,
    });
  };

  useEffect(() => {
    if (boxRef.current) {
      createDraggable(boxRef.current);
    }
  }, [boxRef]);

  // jsx 자리
  return (
    <div>
      <div>
        <button onClick={motionA}>효과1</button>
        <button onClick={motionB}>효과2</button>
        <button onClick={motionC}>효과3</button>
      </div>
      <div style={BoxWrap}>
        <div style={BoxStyle} ref={boxRef}>
          모션의 대상
        </div>
      </div>
    </div>
  );
}

export default AniPage;
