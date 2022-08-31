
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = () => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() )

    }
}


export const startGoogleSignIn = () => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        
        const result = await signInWithGoogle();
        const { errorMessage } = result;
        if( !result.ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login( result ) );
    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async(dispatch) => {

        dispatch( checkingCredentials() );

        const resp = await registerUserWithEmailPassword({ email, password, displayName });
        const { ok, uid, photoURL, errorMessage } = resp;
        
        if( !ok ) return dispatch( logout( {errorMessage} ) );

        dispatch( login({ uid, displayName, email, photoURL }) );

    }
}


export const startLoginWithEmailAndPassword = ({ email, password }) => {

    return async(dispatch) => {

        dispatch( checkingCredentials() );

        const resp = await loginWithEmailPassword({ email, password });
        const { ok, uid, photoURL, displayName, errorMessage } = resp;
        
        if( !ok ) return dispatch( logout( {errorMessage} ) );

        dispatch( login({ uid, displayName, email, photoURL }) );

    }

}


export const startLogout = () => {
    return async(dispatch) => {

        await logoutFirebase();

        dispatch( clearNotesLogout() );

        dispatch( logout({}) );

    }
}