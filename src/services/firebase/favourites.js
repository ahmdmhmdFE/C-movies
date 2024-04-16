import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

const querySnapshot = await getDocs(collection(db, "fav"));
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});
