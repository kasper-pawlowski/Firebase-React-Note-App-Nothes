import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import googleIcon from '../assets/google.png';
import topography from '../assets/topography.svg'
import { useAuth } from '../contexts/Context';

const Background = styled.div `
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #476960;
    background-image: url(${topography});
`

const Wrapper = styled.div `
    width: 450px;
    background-color: #e4e7e7;
    border-radius: 20px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    h1 {
        font-size: 40px;
        margin-bottom: 15px;
    }
    p{
        margin-bottom: 40px;
    }
`

const StyledImg = styled.img `
    margin-right: 8px;
`

const Button = styled.button `
    height: 40px;
    padding: 10px 30px;
    background-color: #e4e7e7;
    border-radius: 7px;
    border: 1px solid #c4c4c4;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    outline: none;
    cursor: pointer;
    position: relative;
    transition-duration: .2s;
    p {
        height: 18px;
        margin: 2px 0 0 0;
    }
`

const LoginView = () => {
    const history = useHistory();
    const { loginWithGoogle, currentUser, deafultNotes } = useAuth();

    async function authWithGoogle() {
        try {
            await loginWithGoogle()
            history.push("/")
        } catch {
            alert("Failed to log in")
        }
    } 
  
    return (
        <Background >
            <Wrapper >
                <h1>Nothes</h1>
                <p>Remember everything important.</p>
                <Button onClick={authWithGoogle} > <StyledImg src={googleIcon} /><p>Continue with Google</p></Button>
            </Wrapper>
        </Background>
    )
}

export default LoginView;