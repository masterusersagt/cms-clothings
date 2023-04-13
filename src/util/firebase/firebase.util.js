import { initializeApp }                                                  from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc }                              from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            "AIzaSyAfmbZnjNgQRHV6E6ZNPobyLPZH4lDc5Co",
  authDomain:        "chm-clothing-db.firebaseapp.com",
  projectId:         "chm-clothing-db",
  storageBucket:     "chm-clothing-db.appspot.com",
  messagingSenderId: "916502155138",
  appId:             "1:916502155138:web:e882547282c49c9b2dc99b"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists);

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
        await setDoc(userDocRef,  { 
            displayName,
            email,
            createdAt
        });
    } catch (error) {
        console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};