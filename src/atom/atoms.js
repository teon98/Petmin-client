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

// export const addresstextAtom = atom({
//   key: "addresstext",
//   default: "",
// });

export const detailaddresstextAtom = atom({
  key: "detailaddresstext",
  default: "",
});

export const preference1Atom = atom({
  key: "preference1",
  default: "",
});

export const preference2Atom = atom({
  key: "preference2",
  default: "",
});

export const preference3Atom = atom({
  key: "preference3",
  default: "",
});

export const preference4Atom = atom({
  key: "preference4",
  default: "",
});

export const preference5Atom = atom({
  key: "preference5",
  default: "",
});

export const fullAddressAtom = atom({
  key: "fullAddress",
  default: "",
});
