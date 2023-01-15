/* import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { firebaseConfig } from "../firebaseconfig";
import { db } from "../firebaseconfig";

export async function getUserPhotoUrlByEmail(email) {
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));

  // Look up the user by their email address
  const user = await firebase.auth().getUserByEmail(email);
  // Retrieve the user's profile from the database
  const userSnap = await firebase
    .database()
    .ref(`users/${user.uid}`)
    .once("value");
  url = userSnap.val().photoUrl;
  return url;
}
 */
