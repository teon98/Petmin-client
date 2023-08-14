import React, { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import {
  agetextAtom,
  detailaddresstextAtom,
  emailtextAtom,
  fullAddressAtom,
  gendertextAtom,
  idtextAtom,
  licenceAtom,
  nametextAtom,
  passwordChecktextAtom,
  passwordtextAtom,
  preference1Atom,
  preference2Atom,
  preference3Atom,
  preference4Atom,
  preference5Atom,
} from "../atom/atoms";
import { useNavigate } from "react-router";

function Logout(props) {
  const nav = useNavigate();

  const resetEmail = useResetRecoilState(emailtextAtom);
  const resetId = useResetRecoilState(idtextAtom);
  const resetName = useResetRecoilState(nametextAtom);
  const resetAge = useResetRecoilState(agetextAtom);
  const resetGender = useResetRecoilState(gendertextAtom);
  const resetFullAddress = useResetRecoilState(fullAddressAtom);
  const resetDetailaddress = useResetRecoilState(detailaddresstextAtom);
  const resetPassword = useResetRecoilState(passwordtextAtom);
  const resetPasswordCheck = useResetRecoilState(passwordChecktextAtom);
  const resetPreference1 = useResetRecoilState(preference1Atom);
  const resetPreference2 = useResetRecoilState(preference2Atom);
  const resetPreference3 = useResetRecoilState(preference3Atom);
  const resetPreference4 = useResetRecoilState(preference4Atom);
  const resetPreference5 = useResetRecoilState(preference5Atom);
  const licence = useResetRecoilState(licenceAtom);

  useEffect(() => {
    resetEmail();
    resetId();
    resetName();
    resetAge();
    resetGender();
    resetFullAddress();
    resetDetailaddress();
    resetPassword();
    resetPasswordCheck();
    resetPreference1();
    resetPreference2();
    resetPreference3();
    resetPreference4();
    resetPreference5();
    licence();

    nav("/");
  }, []);

  return <div> </div>;
}

export default Logout;
