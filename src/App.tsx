import React, {useEffect} from 'react';
import {NotesList} from "./Componets/NotesList/NotesList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import style from './App.module.css';


export type NoteItemType = {
  id: string,
  title: string,
  description: string,
}

export const ID_localStorage = 'a1';

function App() {
  useEffect(()=>{
    document.title = 'Notes'
  }, [])
  const notesPool = useSelector<AppRootStateType, Array<NoteItemType>>(store => store.notesReducer)

  return (
    <div className={style.app}>
      <header className={style.appHeader}>
        <h1>Notes</h1>
      </header>
      <NotesList notes={notesPool} />
    </div>
  );
}

export default App;
