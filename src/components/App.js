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
