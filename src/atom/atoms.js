import { atom } from "recoil";

export const countState = atom({
  key: "countState", // 전역적으로 고유한 값
  default: 0,
});

export const emailtextAtom = atom({
  key: "emailtext",
  default: "",
});

export const idtextAtom = atom({
  key: "idtext",
  default: "",
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
});

export const agetextAtom = atom({
  key: "agetext",
  default: "",
});

export const gendertextAtom = atom({
  key: "gendertext",
  default: "",
});
