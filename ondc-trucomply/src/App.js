import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import { AuthContextProvider } from './FirebaseAuthContext/AuthContext';

import Landing from './Landing/Landing/Landing';
import Home from './Blog/Home';
import Community from './Community/Community'
import Login from './Login_Signup/Login';
import Signup from './Login_Signup/Signup';

import Sidebar from './components/Sidebar'
import MainDash from './Main/MainDash';
import UserProfile from './Main/Profile/UserProfile'
import FmcChatbot from './Main/FMCChatbot/FmcChatbot';
import ComplyFinder from './Main/ComplianceRepo/ComplianceRepo/ComplyFinder';
import CRChatbot from './Main/ComplianceRepo/ChatbotInterface/CRChatbot';
import Checklist from './Main/Checklist/Checklist';
import Consultant from './Main/Consultant/Consultant'

// import Rewards from './Main/Rewards/Rewards';

function App() {

  const [login, setLogin] = useState(false);
  useEffect(()=>{}, [login]) 

  return (
    <div className="h-full w-full">
      <AuthContextProvider>
        {login && <Sidebar setLogin={setLogin} />}
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/Blog' element={<Home/>} />
          <Route path='/Community' element={<Community/>} />
          <Route path='/Login' element={<Login setLogin={setLogin} />} />
          <Route path='/SignUp' element={<Signup setLogin={setLogin} />} />
          <Route path='/Dashboard' element={<MainDash/>} />
          <Route path='/Profile' element={<UserProfile/>} />
          <Route path='/fmcchatbot' element={<FmcChatbot/>} />
          <Route path='/find' element={<ComplyFinder/>} />
          <Route path='/crbot' element={<CRChatbot/>} />
          <Route path='/consultant' element={<Consultant/>} />
          <Route path='/checklist' element={<Checklist/>} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
