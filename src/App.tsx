import React, {useEffect, useState} from 'react';
import {NotesBox} from "./Componets/NotesBox/NotesBox";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import style from './App.module.css';
import {Routes, Route, NavLink} from 'react-router-dom';
import {NoteListView} from "./Componets/NoteListView/NoteListView";

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

	const [viewMode, setViewMode] = useState<boolean>(true)

	const changeViewMode = () => {
		setViewMode(!viewMode)
	}

  return (
    <div className={style.app}>
      <header className={style.appHeader}>
        <h1>Notes</h1>
        {
	        viewMode
		        ?
		        <div className={style.navLinks} onClick={changeViewMode}>
			        <NavLink to={'list_view'} className={style.link}>
                List view
			        </NavLink>
		        </div>
		        :
          <div className={style.navLinks} onClick={changeViewMode}>
            <NavLink to={'/'} className={style.link}>
              Tiles view
            </NavLink>
          </div>
        }
      </header>
      <>
        <Routes>
          <Route path={'/'} element={<NotesBox notes={notesPool} />}/>
          <Route path={'/list_view'} element={<NoteListView notes={notesPool}
                                                            viewMode={viewMode}
                                                            changeViewModeCallback={setViewMode}/>}/>
        </Routes>
      </>

    </div>
  );
}

export default App;
