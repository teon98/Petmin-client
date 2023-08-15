import React, { useEffect } from "react";
import "./styles/reset.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import MainBTNav from "./components/MainBTNav";
import Main from "./pages/Main";
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
import CardInfo from "./pages/User/CardInfo";
import Signup1 from "./pages/User/Signup1";
import Signup2 from "./pages/User/Signup2";
import { RecoilRoot } from "recoil";
import Signup3 from "./pages/User/Signup3";
import Signup4 from "./pages/User/Signup4";
import ChatList from "./pages/ChatList";
import PetRegistration from "./pages/User/PetRegistration";
import PStest from "./pages/petsitter/PStest";
import TestVideo from "./pages/petsitter/TestVideo";
import TestPage from "./pages/petsitter/TestPage";
import PetTendency1 from "./pages/User/PetTendency1";
import PetTendency2 from "./pages/User/PetTendency2";
import PetTendency3 from "./pages/User/PetTendency3";
import PetTendency4 from "./pages/User/PetTendency4";
import PetTendency5 from "./pages/User/PetTendency5";
import PetTendency6 from "./pages/User/PetTendency6";
import CareRequest1 from "./pages/CareRequest1";
import CareRequest3 from "./pages/CareRequest3";
import PetVaccine1 from "./pages/User/PetVaccine1";
import PetVaccine2 from "./pages/User/PetVaccine2";
import PetVaccine3 from "./pages/User/PetVaccine3";
import PetList from "./pages/User/PetList";
import PetInfo from "./pages/User/PetInfo";
import PSView from "./pages/petsitter/PSView";
import Logout from "./components/Logout";
import Reservation from "./pages/Reservation";
import Reservation2 from "./pages/Reservation2";
import Assurance from "./pages/User/Assurance";
import Review from "./pages/User/Review";
import ReviewWrite from "./pages/User/ReviewWrite";
import Checkuser from "./pages/CheckUser";
import CheckSitter from "./pages/CheckSitter";
import ReserveForm from "./pages/ReserveForm";
import PSView2 from "./pages/petsitter/PSView2";
import PetProfileUpdate from "./pages/User/PetProfileUpdate";

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<MainBTNav />}>
            <Route index element={<Main />} />

            <Route path="checkUser" element={<Checkuser />} />
            <Route path="checkSitter" element={<CheckSitter />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="rooms" element={<ChatList />} />
            <Route path="/room/:room/:userId" element={<Chat />} />
            {/*알림 페이지*/}
            <Route path="alarm" element={<Alarm />}></Route>
            {/* 로그인 완료했을 때 보이는 마이페이지 */}
            <Route path="mypage" element={<MypageMenu />} />
            {/* 로그인 */}
            <Route path="/login" element={<Login />}></Route>
            {/* 로그아웃 */}
            <Route path="/logout" element={<Logout />}></Route>
            {/* 내 정보 */}
            <Route path="myinfo" element={<UserInfo />}></Route>
            {/* 카드 정보 */}
            <Route path="card" element={<CardInfo />}></Route>
            {/* 펫 정보 */}
            <Route path="petlist" element={<PetList />}></Route>
            <Route path="petinfo" element={<PetInfo />}></Route>
            {/* 병원페이지 */}
            <Route path="/hospital" element={<Hospital />}></Route>
          </Route>
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/reservation2" element={<Reservation2 />} />
          {/* 펫시터 프로필(예약을 위한) */}
          {/* <Route path="/sitterProfile/:userId" element={<PSView />} /> */}
          {/* 펫시터 프로필(예약을 위한) */}
          <Route path="/sitterProfile/:userId" element={<PSView2 />} />
          {/* 계정 */}
          <Route path="/auth" element={<MainBTNav />}></Route>
          {/* 알림페이지 */}
          <Route path="/alarm" element={<Alarm />}></Route>
          {/* 소개페이지 */}
          <Route path="/about" element={<About />}></Route>
          {/* 펫돌봄 자격 등록 페이지 */}
          <Route path="/register" element={<Register />}></Route>

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
          {/* 펫시터 프로필(예약을 위한) */}
          <Route path="/sitterProfile/:userId/review" element={<Review />} />

          <Route
            path="/sitterProfile/:userId/reviewrite"
            element={<ReviewWrite />}
          />
          {/* 리뷰 페이지 */}

          {/* 반려동물 성향 설문지 1 */}
          <Route path="/pettendency1" element={<PetTendency1 />} />

          {/* 반려동물 성향 설문지 2 */}
          <Route path="/pettendency2" element={<PetTendency2 />} />

          {/* 반려동물 성향 설문지 3 */}
          <Route path="/pettendency3" element={<PetTendency3 />} />

          {/* 반려동물 성향 설문지 4 */}
          <Route path="/pettendency4" element={<PetTendency4 />} />

          {/* 반려동물 성향 설문지 5 */}
          <Route path="/pettendency5" element={<PetTendency5 />} />

          {/* 반려동물 성향 설문지 6 */}
          <Route path="/pettendency6" element={<PetTendency6 />} />

          {/* 반려동물 예방접종 설문지 1 */}
          <Route path="/petvaccine1" element={<PetVaccine1 />} />

          {/* 반려동물 예방접종 설문지 2 */}
          <Route path="/petvaccine2" element={<PetVaccine2 />} />

          {/* 반려동물 예방접종 설문지 3 */}
          <Route path="/petvaccine3" element={<PetVaccine3 />} />

          {/* 마이페이지 - 펫시터 프로필 관리 */}
          <Route path="/petsitterprofile" element={<MainBTNav />}>
            <Route path=":userID" element={<PSprofile />} />
          </Route>
          {/*마이페이지 -  실버 펫시터 시험*/}
          <Route path="/" element={<MainBTNav />}>
            <Route path="/petsittertest" element={<PStest />}></Route>
            <Route path="/petsittertestvideo" element={<TestVideo />}></Route>
            <Route path="/petsittertestpage" element={<TestPage />}></Route>
          </Route>
          {/* 돌봄 요청 페이지 1 (태영 요청) */}
          <Route path="/careRequest1" element={<CareRequest1 />}></Route>

          {/* 돌봄 요청 페이지 3 (태영 요청) */}
          <Route path="/careRequest3" element={<CareRequest3 />}></Route>

          <Route path="/reserveForm" element={<ReserveForm />}></Route>
          {/* 보험 적용 페이지 */}
          <Route path="/" element={<MainBTNav />}>
            <Route path="/assurance" element={<Assurance />}></Route>

            {/* 펫 프로필 업데이트 */}
            <Route
              path="/petprofileupdate"
              element={<PetProfileUpdate />}
            ></Route>
          </Route>
        </Routes>
      </RecoilRoot>
    </div>
  );
};

export default App;
