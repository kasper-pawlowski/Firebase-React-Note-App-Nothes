import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/Context';
import { useHistory } from "react-router-dom";
import topography from '../assets/topography.svg'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import OutsideClickHandler from 'react-outside-click-handler';
import { FiPlus } from 'react-icons/fi'

const Wrapper = styled.div `
    width: 270px;
    height: 100vh;
    background-color: #476960;
    background-image: url(${topography});
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    padding: 20px;
    h1 {
        color: #e0c082;
        font-size: 40px;
        display: flex;
        justify-content: center;
        width: calc(100% - 12px);
        padding-bottom: 20px;
        border-bottom: 1.5px solid rgba(255, 255, 255, 0.50);
        border-radius: 0;
    }
`

const Div = styled.div `
    height: 0.1px;
    width: 0.1px;
    margin-top: auto;
`

const NewNoteButton = styled.button `
    height: 50px;
    width: 100%;
    border-radius: 7px;
    background-color:rgba(255, 255, 255, 0.13);
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    outline: none;
    border: none;
    transition: .2s;
    color: rgba(255, 255, 255, 0.90);
    font-family: 'Montserrat', sans-serif;
    cursor: pointer;
    margin-bottom: 20px;
    span {
        margin-left: 5px;
        font-size: 18px;
        color: rgba(255, 255, 255, 0.90);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &:hover {
        background-color:rgba(255, 255, 255, 0.18);
    }
`

const Profile = styled.div `
    background-color:rgba(255, 255, 255, 0.13);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
    width: 100%;
    padding: 12px;
    border-radius: 7px;
    transition: height 2s;
    img {
        width: 60px;
        height: 60px;
        border-radius: 7px;
    }
    p {
        margin-left: 10px;
        color: rgba(255, 255, 255, 0.80);
        font-weight: 500;
    }
    div {
        display: flex;
        align-items: center;
    }
    button {
        background-color:rgba(255, 255, 255, 0.20);
        color: rgba(255, 255, 255, 0.90);
        outline: none;
        border: none;
        height: 36px;
        cursor: pointer;
        margin-top: 15px;
        border-radius: 5px;
        font-size: 15px;
        font-weight: 500;
        font-family: 'Montserrat', sans-serif;
        transition-duration: 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            background-color:rgba(255, 255, 255, 0.30);
        }
    }
`

const StyledBiChevronUp = styled(BiChevronUp) `
    color: rgba(255, 255, 255, 0.80);
    font-size: 35px;
    cursor: pointer;
`

const StyledBiChevronDown = styled(BiChevronDown) `
    color: rgba(255, 255, 255, 0.80);
    font-size: 35px;
    cursor: pointer;
`

const StyledFiLogOut = styled(FiLogOut) `
    color: rgba(255, 255, 255, 0.80);
    font-size: 20px;
    margin-right: 10px;
`

const Sidebar = () => {
    const { currentUser, logout, setIsFormOpen } = useAuth();
    const [ isExpandedProfile, setIsExpandedProfile ] = useState(false);
    const history = useHistory();

    async function handleLogout() {
        try {
            await logout()
            history.pushState('/login')
        } catch(error) {
            console.log(error.message)
        }
    }

    
    return (
        <Wrapper>
            <h1>Nothes</h1>
            <Div></Div>
            <NewNoteButton onClick={() => setIsFormOpen(true)} >New note <span><FiPlus /></span></NewNoteButton>
            <OutsideClickHandler onOutsideClick={() => setIsExpandedProfile(false)}>
                <Profile>
                    <div>
                        <img src={currentUser.photoURL} alt="avatar" />
                        <p>{currentUser.displayName}</p>
                        { isExpandedProfile === false ? 
                            <StyledBiChevronUp onClick={() => setIsExpandedProfile(true)} />
                            : 
                            <StyledBiChevronDown onClick={() => setIsExpandedProfile(false)} />
                        }
                    </div>
                    { isExpandedProfile === true ?
                    <>
                            <button onClick={handleLogout} ><StyledFiLogOut />Log out</button>
                    </>
                    : null }
                </Profile>
            </OutsideClickHandler>
        </Wrapper>
    )
}

export default Sidebar;