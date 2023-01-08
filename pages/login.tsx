import React from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import HomePage from "./home";

const Login = () => {
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);
  const [loggedInuser] = useAuthState(auth);
  const signIn = () => {
    signInWithGoogle();
  };

  if (loggedInuser) {
    return <HomePage />;
  }
  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <button
        className="bg-orange-600 text-white p-5 rounded-full"
        onClick={signIn}
      >
        Login with google account
      </button>
    </div>
  );
};

export default Login;
