import React, { useState } from "react";
// import AddIcon from "@material-ui/icons/Add";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
//import Zoom from "@material-ui/core/Zoom";
// import Fab from "@material-ui/core/Fab";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    description: ""
  });

  const [slideout, setSlideOut] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });

    console.log(note);
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      description: ""
    });
    event.preventDefault();
  }

  function handleClick(event) {
    setSlideOut((prevValue) => {
      if (note.title === ""&& note.description==="") return !prevValue;
      else return true;
    });
  }

  return (
    <div>
      <form className="create-note">
        {slideout ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <textarea
          name="description"
          onChange={handleChange}
          onClick={handleClick}
          value={note.description}
          placeholder="Take a note..."
          rows={slideout ? 3 : 1}
        />
        <Zoom in={slideout}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
