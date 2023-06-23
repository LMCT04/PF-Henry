import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyBD1ZSoX0SOJHZfBiXRQtRIF0OPnvft9aQ",
  authDomain: "imegenes-cafeteria-celiaca.firebaseapp.com",
  projectId: "imegenes-cafeteria-celiaca",
  storageBucket: "imegenes-cafeteria-celiaca.appspot.com",
  messagingSenderId: "176700388341",
  appId: "1:176700388341:web:3711f5a67a95cb0f40e6bc",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);


export async function uploadFile(file) {
  const storageRef = ref(storage, "products/" + v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
