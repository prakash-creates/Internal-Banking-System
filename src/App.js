import {Route, Routes} from 'react-router-dom'
import NavigationBar from './components/NavigationBar';
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Applyloan from './components/Applyloan';
import Aboutus from './components/Aboutus';
import Viewloan from './components/Viewloan';
import axios from 'axios';
import { Fragment } from 'react';
import Forms from './components/Forms';

export default function App() {

    axios.defaults.headers.common[
      "Authorization"
    ] = `${localStorage.token}` ;

  return (
    <div className="App">
      <NavigationBar/>
      {/* //To paste user welcome message */}
      <Routes>
      <Route path='/' element={<Homepage/>}/>

        {localStorage.isLoggedIn && localStorage.isLoggedIn === "true" ? (
          <Fragment>
            <Route path='/applyloan' element={<Applyloan/>}/>
            <Route path='/viewloan' element={<Viewloan/>}/>
          </Fragment>
        ) : (
          <Fragment>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forgotpassword' element={<Forms/>}/>
          </Fragment>
        )
      }
        <Route path='/aboutus' element={<Aboutus/>}/>
      </Routes>
    </div>
  );
}

