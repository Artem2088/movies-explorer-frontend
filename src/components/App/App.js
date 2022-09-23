import { Routes, Route } from "react-router-dom";
// import Register from "../Register/Register";
// import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
// import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import PageNotFaund from "../PageNotFaund/PageNotFaund";
import "./App.css";

function App() {
  return (
    <div className='page'>
      <div className='page__container'>
        <Routes>
          {/* <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} /> */}
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          {/* <Route path='/profile' element={<Profile />} /> */}
          <Route path='*' element={<PageNotFaund />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;