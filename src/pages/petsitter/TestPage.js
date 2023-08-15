import React, { useEffect, useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import PinkBtn from "../../components/User/PinkBtn";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { idtextAtom } from "../../atom/atoms";

//제출시 알람
const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
});

const TestPage = () => {
  const navi = useNavigate({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [btnState, setBtnState] = useState(false);
  const [userId] = useRecoilState(idtextAtom);
  useEffect(() => {
    // useEffect를 사용하여 selectedAnswers 변경 시에만 실행될 로직을 구현합니다.
    const allAnswersSelected = questions.every((q) => selectedAnswers[q.id]);
    setBtnState(allAnswersSelected);
  }, [selectedAnswers]);

  const questions = [
    {
      id: 1,
      question: "펫시터의 자격 요건은 무엇일까요?",
      options: [
        { id: "a1", text: "조건없음" },
        { id: "a2", text: "자격 취득" },
        { id: "a3", text: "면허 취득" },
      ],
      correctAnswer: "a1",
    },
    {
      id: 2,
      question: "펫시터의 업무는 무엇인가요?",
      options: [
        { id: "b1", text: "사람 상대" },
        { id: "b2", text: "동물 배달" },
        { id: "b3", text: "동물 상대" },
      ],
      correctAnswer: "b3",
    },
    {
      id: 3,
      question: "펫시터의 특수성은 무엇일까요?",
      options: [
        { id: "c1", text: "정규직" },
        { id: "c2", text: "인턴" },
        { id: "c3", text: "프리랜서" },
      ],
      correctAnswer: "c3",
    },
    {
      id: 4,
      question: "펫시터가 가져야할 마음가짐은 무엇이 있을까요?",
      options: [
        { id: "d1", text: "자기애" },
        { id: "d2", text: "책임감" },
        { id: "d3", text: "발전성" },
      ],
      correctAnswer: "d2",
    },
    // 다른 문제들을 추가할 수 있습니다.
    // {
    //   id: 4,
    //   question: "다른 문제",
    //   options: [...],
    //   correctAnswer: ...
    // },
  ];

  const handleAnswerSelection = (questionId, answerId) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    if (score >= 3) {
      axios({
        url: `/sitter/licence`,
        method: "post",
        params: { userId: userId, score: score },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    Toast.fire({
      icon: "success",
      title: "문제가 제출되었습니다.",
    });
    setTimeout(() => {
      navi("/petsittertest");
    }, 1000);
  };

  return (
    <div>
      <BackTitleHeader title="실버 펫시터 시험" />
      <div style={{ padding: "0 20px" }}>
        <br />
        {questions.map((q) => (
          <div key={q.id} style={{ paddingTop: "20px" }}>
            <h1 style={{ textAlign: "center", fontFamily: "PreBold" }}>
              {q.question}
            </h1>
            <ul className="options-list">
              {q.options.map((option) => (
                <label
                  style={{
                    display: "inline-flex",
                    width: "100px",
                    lineHeight: "100px",
                    paddingLeft: "15px",
                    borderBottom: "1px solid black",
                  }}
                >
                  <li key={option.id} className="option-item">
                    <span>{option.text}</span>
                    <input
                      type="checkbox"
                      name={`question_${q.id}`}
                      value={option.id}
                      checked={selectedAnswers[q.id] === option.id}
                      onChange={() => handleAnswerSelection(q.id, option.id)}
                    />
                  </li>
                </label>
              ))}
            </ul>
            <br />
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <PinkBtn
            title="다음으로"
            onClick={calculateScore}
            active={btnState}
          />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
