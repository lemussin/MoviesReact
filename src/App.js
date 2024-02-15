import './GlobalStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { NewUser } from './Pages/NewUser/NewUser';
import { MoviesProvider } from './context/MoviesContext';
import { SignIn } from './Pages/SignIn/SignIn';
import { AllMovies } from './Pages/AllMovies/AllMovies';
import { NewMovie } from './Pages/NewMovie/NewMovies';
import { SignOff } from './Pages/SignOff/SignOff';
import { UserProfile } from './Pages/UserProfile/UserProfile';
import { EditMovie } from './Pages/EditMovie/EditMovie';
import { Countries } from './Pages/Countries/Countries';
import { NewCountry } from './Pages/NewCountry/NewCountry';

function App() {
  return (
    <MoviesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new-user' element={<NewUser />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/movies' element={<AllMovies />} />
          <Route path='/new-movie' element={<NewMovie />} />
          <Route path='/signoff' element={<SignOff />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/edit-movie/:idMovie' element={<EditMovie />} />
          <Route path='/countries' element={<Countries />} />
          <Route path='/new-country' element={<NewCountry />} />
          <Route path='*' element={<p>Not Found</p>} />
        </Routes>
      </BrowserRouter>
    </MoviesProvider>
    
  );
}

export default App;
