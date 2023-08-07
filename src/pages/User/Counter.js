import React, { useEffect } from "react";
import { RecoilRoot, useRecoilState, useResetRecoilState } from "recoil";
import { countState } from "../../atom/atoms";

export const Counter = () => {
  const [count, setCount] = useRecoilState(countState);
  const resetCount = useResetRecoilState(countState);

  useEffect(() => {
    // 페이지가 로드될 때 로컬 스토리지에서 저장된 값을 가져와 설정합니다.
    const storedCount = localStorage.getItem("count");
    if (storedCount) {
      setCount(parseInt(storedCount, 10));
    }
  }, [setCount]);

  useEffect(() => {
    // 상태가 변경될 때마다 로컬 스토리지에 저장합니다.
    localStorage.setItem("count", count.toString());
  }, [count]);

  const increase = () => {
    setCount(count + 1);
  };

  const reset = () => {
    resetCount();
  };

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => increase()}>+</button>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
};

export default Counter;
