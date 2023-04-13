import { useEffect }                                                                  from 'react';
import { getRedirectResult }                                                          from 'firebase/auth';
import {signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../util/firebase/firebase.util';
import SignUpForm                                                                     from '../../components/sign-up-form/sign-up-form.component';

const Authentification = () => {
    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(user);
        console.log(userDocRef);
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm/>
        </div>
    )
}

export default Authentification;