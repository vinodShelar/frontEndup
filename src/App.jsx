import React from 'react';
import UserLists from './Components/userLists';
import Addusers from './Components/Addusers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewProfile from './Components/ViewProfile';
import EditProfile from './Components/EditProfile';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserLists />} />
          <Route path='/addUser' element={<Addusers />} />
          <Route path="/profile/:id" element={<ViewProfile />} />
          <Route path="/EditProfile/:id" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>

  )
}

export default App
