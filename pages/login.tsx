import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const Login = () => {
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);
  const signIn = () => {
    signInWithGoogle();
  };
  console.log("_user", _user);
  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <button
        className="bg-[#18D860] text-white p-5 rounded-full"
        onClick={signIn}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
