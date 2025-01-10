import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react';
import Refreshhandeller from './Refreshhandeller';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)


  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login'/>
  }


  return (
    <>
    <Refreshhandeller setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path='/home' element={<PrivateRoute element={<Home/>} />}>
      </Route>
    </Routes>
    </>

  )
}

export default App
