import Note from "../models";

interface Props {
    note: Note,
    onDeleteNote: (number) => void
}

const NoteBlock = ({note, onDeleteNote}: Props) => {

    return (
        <li>
            <button type="button" className="delete-btn" onClick={()=>onDeleteNote(note.id)}>
                <i  className="material-icons">close</i></button>
            <p>{note.content}</p>
        </li>
    )

}

export default NoteBlock