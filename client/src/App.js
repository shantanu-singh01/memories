import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";




const App = () => {

    return (
        <GoogleOAuthProvider clientId="449248146661-4pr1g0hpdeupuphssk8dqjglg391pm88.apps.googleusercontent.com">
            <BrowserRouter>
                <Container maxWidth="lg">
                    <Navbar />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/auth" element={<Auth />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}


export default App;