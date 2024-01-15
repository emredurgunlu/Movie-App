import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";

export const AuthContext = createContext();
// const {Provider} = createContext() eğer bu satırı eklersen AuthContext.Provider yerine (138.satır) sadece Provider kullanabilirsin

//* with custom hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const navigate = useNavigate();

  useEffect(() => {
    userObserver(); //userObserver fonksyonu bir kere tetiklendikten sonra artık firebase sürekli user, login mi log out mu, log in ise bilgileri neler bunları sürekli takip ediyor
  }, []);


  // createUser fonksyonu register için
  //  aşağıdaki createUserWithEmailAndPassword bölümünü https://firebase.google.com/docs/auth/web/start sitesinden Sign up new users bölümünden modifiye ettik
  const createUser = async (email, password, displayName) => {
    try {
      //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //? kullanıcı profilini güncellemek için kullanılan firebase metodu
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      // console.log(userCredential);
      navigate("/");
      toastSuccessNotify("Registered successfully!");
    } catch (error) {
      console.log(error);
      toastErrorNotify(error.message);
    }
  };

    // signIn fonksyonu log in için
  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Email/password
  //! Email/password ile girişi enable yap
  const signIn = async (email, password) => {
    try {
      //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(userCredential);
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    } catch (error) {
      console.log(error);
      toastErrorNotify(error.message);
    }
  };

  const userObserver = () => {
    //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ email, displayName, photoURL })
        );
      } else {
        // User is signed out
        setCurrentUser(false);
        sessionStorage.removeItem("user");
      }
    });
  };

  const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Logged out successfully");
  };

  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Google
  //! Google ile girişi enable yap
  //* => Authentication => settings => Authorized domains => add domain
  //! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle https://console.firebase.google.com/u/0/project/movie-app-emre/authentication/settings
  const signUpProvider = () => {
    //? Google ile giriş yapılması için kullanılan firebase metodu
    // Google ile giriş yapıldığında display name ve photo url otomatik geliyor ama email-password kaydında dislay name için ekstradan updateProfile metodu çalıştırmak zorundayız
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        navigate("/");
        toastSuccessNotify("Logged in successfully");
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };

  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        toastSuccessNotify("Please check your email");
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
  };

  const values = {
    createUser,
    signIn,
    logOut,
    currentUser,
    signUpProvider,
    forgotPassword,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
