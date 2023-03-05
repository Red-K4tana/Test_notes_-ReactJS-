import React from 'react';
import './App.css';
import {NotesList} from "./Componets/NotesList/NotesList";


export type NoteItemType = {
  id: string,
  title: string,
  description: string,
}

function App() {
  const notesPool: Array<NoteItemType> = [
    {
      id: 'f87',
      title: 'Пароль от почты',
      description: '32321qwerty',
    },
    {
      id: 'cc1',
      title: 'Даты дней рожденья друзей',
      description: 'Коля 05.11.1990, Вася 23.06.1995',
    },
  ]

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
