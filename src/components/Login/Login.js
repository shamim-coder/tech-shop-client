import React, { useContext } from 'react';
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';
import { Container, Row } from 'react-bootstrap';
import './Login.css'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const Login = () => {

    const [loggingUser, setLoggingUser] = useContext(UserContext)

    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    const handleLoginGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential;
                const token = credential.accessToken;
                const { displayName, email, photoURL } = result.user;
                const signInUser = { name: displayName, email, photo: photoURL, token }
                setLoggingUser(signInUser)
                history.replace(from);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log()({ errorCode, errorMessage })
            });
    }

    return (
        <Container>
            <Row className="google-login align-items-center justify-content-center">
                <div className="login">
                    <h3>Login with google account</h3>
                    <button onClick={handleLoginGoogle}> <FontAwesomeIcon icon={faGoogle} /> Continue with Google</button>
                </div>
            </Row>
        </Container>
    );
};

export default Login;