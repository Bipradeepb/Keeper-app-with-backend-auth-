import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState();
  const [error,setError]=useState("");

  const getallCurrentData=async()=>{

    const response=await fetch("http://localhost:5000/",{
      method:"GET"
    });

    console.log(response);

    const allData=await response.json();

    if(response.ok)
    {
      console.log(allData);
      setNotes(allData);
      setError("");
    }

    if(!response.ok)
    {
      setError(allData.message);//alldata will store error in this case
    }

  }

  async function addNote(newNote) {

    console.log(newNote);

    //update newNote in the database
    const {title,description}=newNote;
    const newdata={title,description};

    console.log(newdata);

    const response=await fetch("http://localhost:5000/",{
      method:"POST",
      body:JSON.stringify(newdata),
      headers:{
        "Content-type":"application/json"
      }
    });

    const result=await response.json();

    if(response.ok)
    {
      getallCurrentData();
      setError("");
    }
    
    if(!response.ok)
    {
      setError(result.message);
    }
  }

  async function deleteNote(id) {

    //delete the note in the data base

    const response=await fetch(`http://localhost:5000/${id}`,{
      method:"DELETE"
    });

    const result=await response.json();

    if(response.ok)
    {
      getallCurrentData();
      setError("");
    }

    if(!response.ok)
    {
      setError(result.message);
    }
  }

  useEffect(()=>{

    getallCurrentData();

  },[]);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="note-wrapper">
        <div className="note-container">
          {notes?.map((ele) => {
            return (
              <Note
                key={ele._id}
                id={ele._id}
                title={ele.title}
                content={ele.description}
                onDelete={deleteNote}
              />
            );
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
