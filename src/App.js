import {Route, Routes} from 'react-router-dom'
import NavigationBar from './components/NavigationBar';
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Applyloan from './components/Applyloan';
import Aboutus from './components/Aboutus';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/applyloan' element={<Applyloan/>}/>
        <Route path='/aboutus' element={<Aboutus/>}/>
      </Routes>
    </div>
  );
}

export default App;
