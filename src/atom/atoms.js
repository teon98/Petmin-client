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
export const licenceAtom = atom({
  key: "licence",
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

export const userCardNumber = atom({
  key: "userCardNumber",
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

export const petNameAtom = atom({
  key: "petName",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petGenderAtom = atom({
  key: "petGender",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petAgeAtom = atom({
  key: "petAge",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petWeightAtom = atom({
  key: "petWeight",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petSpeciesAtom = atom({
  key: "petSpecies",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petMsgAtom = atom({
  key: "petMsg",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const isCheckedAtom = atom({
  key: "isChecked",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const petProfileImgAtom = atom({
  key: "petProfileImg",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petTendency1Atom = atom({
  key: "petTendency1",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petTendency2Atom = atom({
  key: "petTendency2",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petTendency3Atom = atom({
  key: "petTendency3",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petTendency4Atom = atom({
  key: "petTendency4",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petTendency5Atom = atom({
  key: "petTendency5",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petTendencyMsgAtom = atom({
  key: "petTendencyMsg",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const careTypeAtom = atom({
  key: "careType",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petVaccineMsgAtom = atom({
  key: "petVaccineMsg",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petChooseListAtom = atom({
  key: "petChooseList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const petVaccineValueList1Atom = atom({
  key: "petVaccineValueList1",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const petVaccineValueList2Atom = atom({
  key: "petVaccineValueList2",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const isTendencyLastButtonClickedAtom = atom({
  key: "isTendencyLastButtonClicked",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isVaccineLastButtonClickedAtom = atom({
  key: "isTendencyLastButtonClicked",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

//반려동물 프로필 등록할 때 생성되는 강아지의 petNum
export const petNumWhenRegister = atom({
  key: "petNum",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const petImgUrlAtom = atom({
  key: "petImgUrl",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
