import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const countState = atom({
  key: "countState", // 전역적으로 고유한 값
  default: 0,
});

export const emailtextAtom = atom({
  key: "emailtext",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const idtextAtom = atom({
  key: "idtext",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const passwordtextAtom = atom({
  key: "passwordtext",
  default: "",
});

export const passwordChecktextAtom = atom({
  key: "passwordChecktext",
  default: "",
});

export const nametextAtom = atom({
  key: "nametext",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const agetextAtom = atom({
  key: "agetext",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const gendertextAtom = atom({
  key: "gendertext",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// export const addresstextAtom = atom({
//   key: "addresstext",
//   default: "",
// });

export const detailaddresstextAtom = atom({
  key: "detailaddresstext",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const preference1Atom = atom({
  key: "preference1",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const preference2Atom = atom({
  key: "preference2",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const preference3Atom = atom({
  key: "preference3",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const preference4Atom = atom({
  key: "preference4",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const preference5Atom = atom({
  key: "preference5",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const fullAddressAtom = atom({
  key: "fullAddress",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

//user의 진짜 주소
export const userAddrAtom = atom({
  key: "userAdd",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userDetailAddrAtom = atom({
  key: "userDetailAdd",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userImgAtom = atom({
  key: "userImg",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
