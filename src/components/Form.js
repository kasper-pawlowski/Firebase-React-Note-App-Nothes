import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../contexts/Context';
import OutsideClickHandler from 'react-outside-click-handler';
import { GrFormClose } from 'react-icons/gr'
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from "react-hook-form";

const opacity = keyframes `
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

const Overlay = styled.div `
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.50);
    animation: ${opacity} .1s linear;
    z-index: 2;
`

const Wrapper = styled.div `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: #e4e7e7;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    padding: 40px;
    color:  #000;
    z-index: 3;
    box-shadow: 0px 10px 15px #00000030;
    animation: ${opacity} .1s linear;
    h1 {
        margin-bottom: 20px;
    }
`

const CloseButton = styled.button `
    position: absolute;
    top: 7px;
    right: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 23px;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
`

const FormWrapper = styled.form `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const TitleInput = styled.input `
    width: 100%;
    background: none;
    outline: none;
    border: none;
    border-bottom: 2.5px solid #476960;
    font-weight: 600;
    font-size: 18px;
    font-family: 'Montserrat', sans-serif;
    padding: 10px;
    border-radius: 0;
    margin-bottom: 20px;
    transition: .2s;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    &:focus {
        background: #d7d7d7;
    }
`

const DescriptionInput = styled(TextareaAutosize) `
    width: 100%;
    min-height: 200px;
    background: none;
    outline: none;
    border: none;
    border-bottom: 2.5px solid #476960;
    font-weight: 500;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    padding: 10px;
    border-radius: 0;
    resize: none;
    margin-bottom: 20px;
    transition: .2s;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    &:focus {
        background: #d7d7d7;
    }
`

const Button = styled.button `
    width: 100%;
    height: 45px;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    background-color: #476960;
    color:  #edefef;
    border-radius: 7px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    transition: .2s;
    &:hover {
        background-color: #5f7c75;
    }
`

const Form = () => {
    const { addNote, setIsFormOpen } = useAuth();
    const { register, handleSubmit } = useForm(); 

    const onSubmit = (data) => {
        if(data.title === '' && data.description === '') {
            console.log('nothing')
            setIsFormOpen(false)
        } else {
            addNote(data)
            setIsFormOpen(false)
        }
    }

    return (
        <Overlay>
            <OutsideClickHandler onOutsideClick={() => setIsFormOpen(false)}>
                <Wrapper>
                    <CloseButton onClick={() => setIsFormOpen(false)} > <GrFormClose /> </CloseButton>
                    <h1>Create new note</h1>
                    <FormWrapper onSubmit={handleSubmit(onSubmit)} >
                        <TitleInput placeholder="Title" ref={register} name="title" autoComplete="off" spellCheck="false" />
                        <DescriptionInput placeholder="Description" ref={register} name="description" autoComplete="off" spellCheck="false" />
                        <Button type="submit" >Create note</Button>
                    </FormWrapper>
                </Wrapper>
            </OutsideClickHandler>
        </Overlay>
    )
}

export default Form;