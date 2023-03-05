import React from 'react';
import './App.css';
import {NotesList} from "./Componets/NotesList/NotesList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";


export type NoteItemType = {
  id: string,
  title: string,
  description: string,
}

export const ID_localStorage = 'a1';

function App() {
  const notesPool = useSelector<AppRootStateType, Array<NoteItemType>>(store => store.notesReducer)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notes</h1>
      </header>
      <NotesList notes={notesPool} />
    </div>
  );
}

export default App;
