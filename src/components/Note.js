import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../contexts/Context';
import { RiDeleteBin7Line } from 'react-icons/ri'
import OutsideClickHandler from 'react-outside-click-handler';
import NoteModal from '../components/NoteModal';
import { GrFormClose } from 'react-icons/gr'

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
    color: #000;
    cursor: pointer;
`

const HoverBar = styled.div `
    width: 100%;
    height: 30px;
    padding: 0 15px 0 15px;
    display: flex;
    opacity: 0;
    align-items: center;
    transition: .2s;
    justify-content: space-between;
    background-color:rgba(255, 255, 255, 0.13);
    margin-top: 15px;
`

const Wrapper = styled.div `
    min-width: 250px;
    max-width: 300px;
    flex-basis: auto;
    flex-grow: 1;
    height: 200px;
    background-color: #476960;
    display: flex;
    flex-direction: column;
    margin: 10px;
    border-radius: 10px;
    color:  #edefef;
    transition-duration: .3s;
    animation: ${opacity} .2s linear;
    box-shadow: 0px 10px 15px #00000030;
    overflow: hidden;
    &:hover ${HoverBar} {
        opacity: 1;
    }
`

const LastUpdate = styled.p ` 
    font-size: 13px;
    color:  #edefef;
`

const DeleteButton = styled.button `
    height: 20px;
    width: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    outline: none;
    border: none;
    color:  #edefef;
    transition: .2s;
    padding: 1px;
    cursor: pointer;
    &:hover {
        background-color: rgba(255, 255, 255, 0.20);
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

const Note = ({ item }) => {
    const { deleteNote } = useAuth();
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

    const Title = styled.p `
        display: ${item.title !== '' ? 'block' : 'none'};
        text-overflow: ${item.description !== '' ? 'ellipsis' : 'clip'}; //ellipsis
        overflow: hidden; 
        white-space: ${item.description !== '' ? 'nowrap' : 'normal'}; //nowrap
        width: 100%;
        height: ${item.description !== '' ? '24px' : '140px'};
        font-size: 20px;
        font-weight: 600;
        word-wrap: break-word;
        margin-top: 15px;
        padding: 0 15px;
        cursor: pointer;
    `   

    const Description = styled.p `
        display: ${item.description !== '' ? 'block' : 'none'};
        width: 100%;
        overflow: hidden;
        position: relative;
        height: ${item.title !== '' ? '101px' : '140px'};
        font-size: 15px;
        padding: 0 15px;
        word-wrap: break-word;
        margin-top: 15px;
        font-weight: 400;
        line-height: 1.3rem;
        cursor: pointer;
        &::after {
            content: "";
            text-align: right;
            position: absolute;
            bottom: 0;
            right: 0;
            width: 70%;
            height: 1.2em;
            background: linear-gradient(to right, transparent 10%, #476960 90%);
        }
    `

    if(item.title === '' && item.description === '') {
        deleteNote(item)
    }

    const onDelete = () => {
        deleteNote(item);
        setIsDeleteModalOpen(false);
    }

    return (
        <>
            { isDeleteModalOpen ? <Overlay /> : null }
            <Wrapper >
                <Title onClick={() => setIsNoteModalOpen(true)} >{item.title}</Title>
                <Description onClick={() => setIsNoteModalOpen(true)} >{item.description}</Description>
                <HoverBar>
                    <LastUpdate>Last updated {item.lastUpdate}</LastUpdate>
                    <DeleteButton onClick={() => setIsDeleteModalOpen(true)} ><RiDeleteBin7Line /></DeleteButton>
                </HoverBar>
            </Wrapper>
            { isDeleteModalOpen ? 
                <OutsideClickHandler onOutsideClick={() => setIsDeleteModalOpen(false)} >
                    <DeleteModal >
                        <CloseButton onClick={() => setIsDeleteModalOpen(false)} > <GrFormClose /> </CloseButton>
                        <h2>Confirm delete</h2>
                        <p>Are you sure you want to delete this note?</p>
                        <div>
                            <DeleteModalCancelButton onClick={() => setIsDeleteModalOpen(false)} >Cancel</DeleteModalCancelButton>
                            <DeleteModalDeleteButton onClick={onDelete} >Delete</DeleteModalDeleteButton>
                        </div>
                    </DeleteModal>
                </OutsideClickHandler>
            : null }
            { isNoteModalOpen ? <NoteModal item={item} setIsNoteModalOpen={setIsNoteModalOpen} /> : null }
        </>
    )
}

export default Note;