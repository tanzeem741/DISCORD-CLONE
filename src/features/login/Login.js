import React from 'react';
import { auth ,provider} from '../firebase';
import './Login.css';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider)
            .catch(error => alert(error.message));
    };
    return (
        <div className="login">
            <img className="login__image" src="https://www.xda-developers.com/files/2018/11/discord-logo.jpg" alt="discord"/>
            <button className="login__button" onClick={signIn} >SIGN IN</button>      
        </div>
    )
}

export default Login;
