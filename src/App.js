import {Routes, Route} from 'react-router-dom';
import {Home} from './components/home/Home';
import {Login} from './components/login/Login';
import {Register} from './components/register/Register';
import {AuthProvider} from './context/authContext';

function App(){
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </AuthProvider>
  );
}
export default App;