
import './App.css';
import Signup from './components/User/Signup';
import Login from './components/User/Login'
import Application from './components/User/Application';
import NewApplication from './components/Admin/NewApplicationList'
import ApprovedList from './components/Admin/ApprovedList'
import Booking from './components/Admin/Booking'
import Dashboard from './components/Admin/Dashboard'
import DeclinedList from './components/Admin/DeclinedList'
import SideBar from './components/Admin/SideBar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
// import Application from './components/User/Application';
import AuthContext, {AuthProvider} from './Context/AuthContext'
import { useState } from 'react';
import AdminLogin from './components/Admin/AdminLogin';
import AdminLayout from './components/Admin/AdminLayout';
import Users from './components/Admin/Users';
import ChatPage from './Pages/ChatPage';






function App() {
  
  return (
    <div className="App">
      
      <Router>
        <AuthProvider >
            <Routes>
              <Route element={<Signup/>} path='/signup'  />
              
              {/* <Route element={<Login/>} path='/login' /> */}
            
              {/* <Route element={<Application/>} path='/' />*/}
              
              <Route element={<Login/>} path='/' /> 
              <Route element={<Application/>} path='/home' />
              <Route element={<ChatPage/>} path='/chat' />
              
              <Route element={<AdminLogin/>} path='/adminlogin' />
            </Routes>
        
      
            <Routes>
                <Route element={<AdminLayout></AdminLayout>} path="/admin/">
                        {/* <Route element={<Dashboard/>} path='/admin/dashboard'/> */}
                        <Route element={<ApprovedList/>} path='/admin/approved'/>
                        <Route element={<Users/>} path='/admin/users'/>
                        <Route element={<Booking/>} path='/admin/booking'/>
                        <Route element={<NewApplication/>} path='/admin/application'/>
                        <Route element={<DeclinedList/>} path='/admin/declined'/>
                </Route>

            </Routes>
        </AuthProvider>  
        
      </Router>
      
   
      
    </div>
  );
}

export default App;
