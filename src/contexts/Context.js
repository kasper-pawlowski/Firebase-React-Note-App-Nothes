import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components';
import { auth, provider, app } from '../firebase';
import loadingGif from '../assets/loading.gif';

const LoadingImg = styled.img `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false)

    const dt = new Date();
    const locale = navigator.languages != undefined ? navigator.languages[0] : navigator.language;
    const time = dt.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", second: "2-digit" })
    const day = dt.getDay();
    const month = dt.toLocaleDateString(locale, {month: 'short'});
    const year = dt.getFullYear();
    const lastUpdate = `${day}-${month}-${year}`
    const creationDate = `${day}-${month}-${year}, ${time}`;

    function addNote(data) {
        return app.firestore().collection(currentUser.uid).add({
            title: data.title,
            description: data.description,
            lastUpdate: lastUpdate,
            creationDate: creationDate,
            authorId: currentUser.uid,
        }).catch(error => {
            console.log(error.message)
        })
    }

    function getNotes() {
        const db = app.firestore();
        const unsubscribe = db.collection(currentUser.uid).orderBy("creationDate", "desc").onSnapshot(snapshot => {
            const notesData = [];
            snapshot.forEach(doc => notesData.push({ ...doc.data(), id: doc.id }));
            setNotes(notesData)
        });

        return unsubscribe
    }

    function deleteNote(item) {
        const db = app.firestore();
        db.collection(currentUser.uid).doc(item.id).delete()
    }

    function updateNote(item, data) {
        const db = app.firestore();
        db.collection(currentUser.uid).doc(item.id).update({
            title: data.title,
            description: data.description,
            lastUpdate: lastUpdate,
        })
    }

    function loginWithGoogle() {
        return auth.signInWithPopup(provider)
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    if (loading) {
        return <LoadingImg src={loadingGif} alt=""/>
    }

    const value = {
        currentUser,
        loginWithGoogle,
        logout,
        notes,
        addNote,
        getNotes,
        deleteNote,
        updateNote,
        isFormOpen,
        setIsFormOpen,
    }

    return (
        <AuthContext.Provider value={value} >
            {!loading && children}
        </AuthContext.Provider>
    )
}