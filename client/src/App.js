import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import MyNotes from './pages/MyNotes/MyNotes';
import Login from './pages/Login/LoginScreen';
import Registration from './pages/Registration/Registration';
import CreateNote from './pages/SingleNote/CreateNote';
import SingleNote from './pages/SingleNote/SingleNote';
import ProfileScreen from './pages/Profile/ProfileScreen';

const App =() => {
  return (
    <Router>
      <Header />
      <main>
      <Routes>
        <Route path='/' element={<LandingPage />} exact />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/createnote' element={<CreateNote />} />
        <Route path='/note/:id' element={<SingleNote />} />
        <Route path='/mynotes' element={<MyNotes />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
