import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./config";
import toast from "react-hot-toast";

export const signMeIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signMeUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signMeOut = () => {
  if (confirm("Are you sure?")) {
    signOut(auth)
      .then(() => {
        toast.success("signed out!");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
};
