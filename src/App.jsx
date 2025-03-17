import { useState } from 'react'
import bookLogo from './assets/books.png'
import Navigations from './components/Navigations'
import Books from './components/Books'
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';
import SingleBook from './components/SingleBook';
import Authenticate from './components/ProtectedRoute';

import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const [token, setToken] = useState(null);
  return (

    <>
      <h1><img id='logo-image' src={bookLogo}/>Library App</h1>
      <Navigations token={token}/>
      <div className='mainmaincontainer'>

      </div>
      
      <Routes>
          <Route path = "/" element = {<Books/>}/>
          <Route path = "/Books" element = {<Books/>}/>
          <Route element = {<ProtectedRoute/>}>
            <Route path = "/Account" element = {<Account token={token}/>}/>
          </Route>
          <Route path = "/Login" element = {<Login setToken={setToken}/>}/>
          <Route path = "/Register" element = {<Register setToken={setToken}/>}/>
          <Route path = "/books/:bookid" element = {<SingleBook/>}/>
          <Route path='*' element={<Books/>} />
        </Routes>
    </>
  )
}

export default App
