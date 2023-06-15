import {useState} from "react";
import Note from "../models";


interface Props {
    onAddNewNote: (note: Note) => void
}

const AddBlock = ({onAddNewNote}: Props) => {
    const [content, setValue] = useState(
        {
            content: "",
        }
    );

    const getValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setValue({...content, [name]: value});
    }



    const addNewRecord = (e) => {
        e.preventDefault();

        fetch("http://localhost:7070/notes", {
            method: "POST",
            body: JSON.stringify({
                content: content.content
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        onAddNewNote(content)

        setValue({content: ""})
    }


    return (
        <form onSubmit={addNewRecord}>
            <textarea name="content" id="" cols={30} rows={10} value={content.content} onChange={getValue}>

            </textarea>
            <button type="submit">
                <i  className="material-icons">play_arrow</i>
            </button>

        </form>
    )

}

export default AddBlock