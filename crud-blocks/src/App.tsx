
import './App.css'
import {useCallback, useEffect, useState} from "react";
import AddBlock from "./components/AddBlock";
import NoteBlock from "./components/NoteBlock";


function App() {
    const [notes, setNotes] = useState([])
    const [currentNotes, setCurrentNotes] = useState(notes)

    const getNotes = async() => {
        const response = await fetch("http://localhost:7070/notes")
        const json = await response.json()
        return setNotes(json);
    }

    useEffect(() => {
        getNotes()
    }, [currentNotes])

    const addNewNote = useCallback((content) => {
        setCurrentNotes( (prevState) => {
            return [...prevState,content]
        });
    }, [])


    const deleteNote = useCallback(async(id) => {
        await fetch(`http://localhost:7070/notes/${id}`, {
            method: "DELETE",
        })
        setCurrentNotes((prevState) => {
            return [...prevState.filter((el) => el.id !== id)]
        })
    }, []);




  return (
    <>
        <div className="refresh">
            <h1>Notes</h1>
            <button type="button" onClick={(e) => {
                e.preventDefault();
                getNotes()
            }}>
                <i className="material-icons">autorenew</i>
            </button>
        </div>

        <ul className="notes">
            {notes.map((note, index) =>
                <NoteBlock note={note} key={index} onDeleteNote={deleteNote}/>
            )}
        </ul>

        <AddBlock  onAddNewNote={addNewNote}/>

    </>
  )
}

export default App
