import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/Context';
import Note from './Note';

const Wrapper = styled.div `
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 100vw;
    height: 100vh;
    padding: 10px;
    transition-duration: .3s;
    overflow-y: auto;
`

const NotesList = () => {
    const { notes } = useAuth();

    const items = notes.map(e => {
        return (
            <Note
                item={e}
            /> 
        )
    })

    return (
        <Wrapper>
            { notes.length ? (
                <>{items}</>
            ):(
                <p>Please add some notes!</p>
            )}
        </Wrapper>
    )
}

export default NotesList;