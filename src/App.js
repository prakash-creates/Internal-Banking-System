import {Route, Routes} from 'react-router-dom'
import NavigationBar from './components/NavigationBar';
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
