import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import Home from "./home";
import HomePage from "./home";
import Login from "./login";
import Loading from "../components/Loading";
``;
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedInuser, loading, _error] = useAuthState(auth);
  const [isSSR, setIsSSR] = useState(false);

  useEffect(() => {
    setIsSSR(true);
  });

  useEffect(() => {
    const setUserLoggedInDB = async () => {
      try {
        await setDoc(
          doc(db, "users", loggedInuser?.email as string),
          {
            email: loggedInuser?.email,
            lastSeen: serverTimestamp(),
            photoURL: loggedInuser?.photoURL,
          },
          { merge: true }
        );
      } catch (error) {
        console.log("error setting user logged", error);
      }
    };
    if (loggedInuser) {
      setUserLoggedInDB();
    }
  }, [loggedInuser]);

  return isSSR && <Component {...pageProps} />;
}

export default MyApp;
