import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/Context';
import Sidebar from '../components/Sidebar';
import NotesList from '../components/NotesList';
import Form from '../components/Form';

const Wrapper = styled.div `
    display: flex;
`

const HomeView = () => {
    const { getNotes, isFormOpen } = useAuth();

    React.useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            <Wrapper>
                <Sidebar />
                <NotesList />
            </Wrapper>
            { isFormOpen ? <Form /> : null }
        </>
    )
}

export default HomeView;