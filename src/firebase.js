import { initializeApp } from 'firebase/app';
import { getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDPz7l_Md6GQb0-xBJoCo1pUisnGsUSND4",
    authDomain: "studentsdata-f1e01.firebaseapp.com",
    projectId: "studentsdata-f1e01",
    storageBucket: "studentsdata-f1e01.appspot.com",
    messagingSenderId: "898204138713",
    appId: "1:898204138713:web:72ccec425aa3a481cf12c8",
    measurementId: "G-Q7WGLRT962"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

export default db;