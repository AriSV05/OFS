import { initializeApp } from "firebase/app";

import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCurM_jIDW85dQ_l7N1FstiqGpPH-xXoZY",
  authDomain: "ofs-2023.firebaseapp.com",
  projectId: "ofs-2023",
  storageBucket: "ofs-2023.appspot.com",
  messagingSenderId: "455162510692",
  appId: "1:455162510692:web:1b31ba5c15243a36378e71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
