import {Routes, Route} from 'react-router-dom';
import {Home} from './components/home/Home';
import {Login} from './components/login/LoginR';
import {Register} from './components/register/Register';
import {AuthProvider} from './context/authContext';
import {Profile} from './components/profile/Profile';
import {ProtectedRoute} from './components/protectedRoute/ProtectedRoute';


function App(){
  return (
    <AuthProvider>
      {/* Rutas definidas*/}
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}
export default App;