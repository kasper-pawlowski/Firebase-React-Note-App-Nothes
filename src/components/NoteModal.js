import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../contexts/Context';
import OutsideClickHandler from 'react-outside-click-handler';
import { GrFormClose } from 'react-icons/gr'
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from "react-hook-form";
import { RiDeleteBin7Line } from 'react-icons/ri'

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
    animation: ${opacity} .1s linear;
    box-shadow: 0px 10px 15px #00000030;
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
    max-height: 400px;
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
    margin-bottom: 10px;
    transition: .2s;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    &:focus {
        background: #d7d7d7;
    }
`

const LastUpdate = styled.p ` 
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
    font-size: 13px;
    color: #000;
`

const ActionButtons = styled.div `
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
`

const SaveButton = styled.button `
    width: 270px;
    height: 45px;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    background-color: #476960;
    color:  #edefef;
    border-radius: 7px;
    cursor: pointer;
    transition: .2s;
    &:hover {
        background-color: #5f7c75;
    }
`

const DeleteButton = styled.button `
    background: none;
    outline: none;
    border: none;
    font-size: 15px;
    font-weight: 500;
    width: 45px;
    height: 45px;
    display: flex;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 2px solid #476960;
    color: #476960;
    transition: .2s;
    &:hover {
        color: #5f7c75;
        border: 2px solid #5f7c75;
    }
`

const DeleteModal = styled.div `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    background-color: #e4e7e7;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 10px;
    padding: 40px;
    color:  #000;
    z-index: 3;
    box-shadow: 0px 10px 15px #00000030;
    animation: ${opacity} .1s linear;
    h2 {
        margin-bottom: 20px;
    }
    p {
        font-weight: 500;
    }
    div {
        width: 100%;
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
`

const DeleteModalDeleteButton = styled.button `
    background-color: #d32f2f;
    outline: none;
    border: none;
    border-radius: 7px;
    padding:  8px 16px;
    margin-left: 5px;
    color:  #edefef;
    font-weight: 500;
    font-size: 15px;
    font-family: 'Montserrat', sans-serif;
    transition: .2s;
    cursor: pointer;
    &:hover {
        background-color: #b82727;
    }
`

const DeleteModalCancelButton = styled.button `
    background-color: #e4e7e7;
    outline: none;
    border: none;
    border-radius: 7px;
    padding:  8px 16px;
    margin-right: 5px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    transition: .2s;
    color: #0000008A;
    &:hover {
        background-color: #d1d6d6;
    }
`

const NoteModal = ({ setIsNoteModalOpen, item }) => {
    const { updateNote, deleteNote } = useAuth();
    const { register, handleSubmit } = useForm();
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

    const onSubmit = (data) => {
        updateNote(item, data)
        setIsNoteModalOpen(false)
    }

    const onDelete = () => {
        deleteNote(item);
        setIsNoteModalOpen(false);
    }

    return (
        <Overlay>
            <OutsideClickHandler onOutsideClick={() => setIsNoteModalOpen(false)}>
                { isDeleteModalOpen === false ? (
                <Wrapper>
                    <CloseButton onClick={() => setIsNoteModalOpen(false)} > <GrFormClose /> </CloseButton>
                    <FormWrapper onSubmit={handleSubmit(onSubmit)} >
                        <h1>Edit note</h1>
                        <TitleInput placeholder="Title" ref={register} name="title" autoComplete="off" defaultValue={item.title} spellCheck="false" />
                        <DescriptionInput placeholder="Description" ref={register} name="description" autoComplete="off" defaultValue={item.description} spellCheck="false" />
                        <LastUpdate>Last updated {item.lastUpdate}</LastUpdate>
                        <ActionButtons>
                            <SaveButton type="submit" >Save</SaveButton>
                            <DeleteButton onClick={() => setIsDeleteModalOpen(true)} ><RiDeleteBin7Line /></DeleteButton>
                        </ActionButtons>
                    </FormWrapper>
                </Wrapper>
                ):(
                <DeleteModal>
                    <CloseButton onClick={() => setIsNoteModalOpen(false)} > <GrFormClose /> </CloseButton>
                    <h2>Confirm delete</h2>
                    <p>Are you sure you want to delete this note?</p>
                    <div>
                        <DeleteModalCancelButton onClick={() => setIsNoteModalOpen(false)} >Cancel</DeleteModalCancelButton>
                        <DeleteModalDeleteButton onClick={onDelete} >Delete</DeleteModalDeleteButton>
                    </div>
                </DeleteModal>
                )}
            </OutsideClickHandler>
        </Overlay>
    )
}

export default NoteModal;