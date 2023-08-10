import React from "react";
import "./styles/reset.css";
import { Routes, Route } from "react-router-dom";
import MainBTNav from "./components/MainBTNav";
import Main from "./pages/Main";
import Check from "./pages/Check";
import Favorite from "./pages/Favorite";
import Chat from "./pages/Chat";
import Alarm from "./pages/Alarm";
import About from "./pages/banner/About";
import Hospital from "./pages/banner/Hospital";
import Register from "./pages/banner/Register";
import MypageMenu from "./pages/MypageMenu";
import PSprofile from "./pages/petsitter/PSprofile";
import Login from "./pages/User/Login";
import UserInfo from "./pages/User/UserInfo";
import PetInfo from "./pages/User/PetInfo";
import CardInfo from "./pages/User/CardInfo";
import Signup1 from "./pages/User/Signup1";
import Signup2 from "./pages/User/Signup2";
import { RecoilRoot } from "recoil";
import Counter from "./pages/User/Counter";
import Signup3 from "./pages/User/Signup3";
import Signup4 from "./pages/User/Signup4";
import ChatList from "./pages/ChatList";
import PetRegistration from "./pages/User/PetRegistration";
import PStest from "./pages/petsitter/PStest";
import TestVideo from "./pages/petsitter/TestVideo";
import TestPage from "./pages/petsitter/TestPage";
import PetTendency1 from "./pages/User/PetTendency1";
import PetVaccine from "./pages/User/PetVaccine";

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<MainBTNav />}>
            <Route index element={<Main />} />
            <Route path="check" element={<Check />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="rooms" element={<ChatList />} />
            <Route path="/room/:room/:userId" element={<Chat />} />
            <Route path="mypage" element={<Mypage />} />
            {/* 로그인 완료했을 때 보이는 마이페이지 */}
            <Route path="mypage" element={<MypageMenu />} />
            {/* 로그인 */}
            <Route path="/login" element={<Login />}></Route>
            {/* 내 정보 */}
            <Route path="myinfo" element={<UserInfo />}></Route>
            {/* 카드 정보 */}
            <Route path="card" element={<CardInfo />}></Route>
            {/* 펫 정보 */}
            <Route path="petinfo" element={<PetInfo />}></Route>
          </Route>
          {/* 계정 */}
          <Route path="/auth" element={<MainBTNav />}></Route>
          {/* 알림페이지 */}
          <Route path="/alarm" element={<Alarm />}></Route>
          {/* 소개페이지 */}
          <Route path="/about" element={<About />}></Route>
          {/* 펫돌봄 자격 등록 페이지 */}
          <Route path="/register" element={<Register />}></Route>
          {/* 병원페이지 */}
          <Route path="/hospital" element={<Hospital />}></Route>
          {/* 회원가입 페이지 1*/}
          <Route path="/" element={<MainBTNav />}>
            <Route path="/signup1" element={<Signup1 />}></Route>
          </Route>
          {/* 회원가입 페이지 2*/}
          <Route path="/" element={<MainBTNav />}>
            <Route path="/signup2" element={<Signup2 />}></Route>
          </Route>
          {/* 회원가입 페이지 3*/}
          <Route path="/" element={<MainBTNav />}>
            <Route path="signup3" element={<Signup3 />}></Route>
          </Route>
          {/* 회원가입 페이지 4*/}
          <Route path="/" element={<MainBTNav />}>
            <Route path="/signup4" element={<Signup4 />}></Route>
          </Route>
          {/* 반려동물 등록 페이지 */}
          <Route path="/" element={<MainBTNav />}>
            <Route
              path="/petregistration"
              element={<PetRegistration />}
            ></Route>
          </Route>
          {/* 반려동물 성향 설문지 */}
          <Route path="/" element={<MainBTNav />}>
            <Route path="/pettendency" element={<PetTendency1 />}></Route>
          </Route>
          {/* 반려동물 예방접종 설문지 */}
          <Route path="/" element={<MainBTNav />}>
            <Route path="/petvaccine" element={<PetVaccine />}></Route>
          </Route>
          {/* 마이페이지 - 펫시터 프로필 관리 */}
          <Route path="/petsitterprfile" element={<MainBTNav />}>
            <Route path=":userID" element={<PSprofile />} />
          </Route>
          {/*마이페이지 -  실버 펫시터 시험*/}
          <Route path="/" element={<MainBTNav />}>
            <Route path="/petsittertest" element={<PStest />}></Route>
            <Route path="/petsittertestvideo" element={<TestVideo />}></Route>
            <Route path="/petsittertestpage" element={<TestPage />}></Route>
          </Route>
          {/* 리코일 실험용*/}
          <Route path="/recoiltest" element={<Counter />} />
        </Routes>
      </RecoilRoot>
    </div>
  );
};

export default App;
