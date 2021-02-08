import React from 'react';
import GlobalStyle from '../globalStyles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginView from '../views/LoginView';
import HomeView from '../views/HomeView';
import { AuthProvider } from "../contexts/Context";
import PrivateRoute from './PrivateRoute';

const App = () => {
    return (
        <>
            <GlobalStyle />
            <AuthProvider>
                <Router>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomeView} />
                        <Route path="/login" component={LoginView} />
                    </Switch>
                </Router>
            </AuthProvider>
        </>
    )
}

export default App;




















// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyC7Tr6P3-UQjDFwaxwUOsTR5Fglc8vWpuw",
//     authDomain: "nothes-2b646.firebaseapp.com",
//     projectId: "nothes-2b646",
//     storageBucket: "nothes-2b646.appspot.com",
//     messagingSenderId: "845894441787",
//     appId: "1:845894441787:web:e0027e4577a8a6aa45f51e",
//     measurementId: "G-8S2LGP473D"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>