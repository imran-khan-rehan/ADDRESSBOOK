import './App.css';
import Navbar from "./components/Header";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import home from './components/home';
import register from './components/register';
import login from './components/login';
import contact from './components/contact';
function App() {
  
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' Component={home}></Route>
          <Route path='/login' Component={login}></Route>
          <Route path='/register' Component={register}></Route>
          <Route path='/contact' Component={contact}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
