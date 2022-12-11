import React,{useEffect,useContext} from 'react'
import SideBar from './SideBar'
import {Outlet,useNavigate} from 'react-router-dom'
import AuthContext,{AuthProvider} from '../../Context/AuthContext'

const AdminLayout = () => {


  // let {user, authTokens} =useContext(AuthContext)
  let {admin, authTokens} =useContext(AuthContext)
  const navigate =  useNavigate()



useEffect(() => {
  if(authTokens!==null) {
    console.log('akhilakhilakhilalkhil',authTokens);
    // if (user.is_admin){
    //   console.log('is admin or not',user.is_admin);
    //   navigate('/admin/application')
    //   } else{
    //     console.log('not superadmin');
    //     navigate('/adminlogin')
    //   }
    if (!admin.is_admin){
      console.log('is admin or not',admin.is_admin);
      navigate('/adminlogin')
      }
     
  }
  else{
    console.log('no tokeennnss');
      navigate("/adminlogin")
  }
 
},[authTokens]);



  return (
    <div className="flex ">
        <div>
            <SideBar />
        </div >
        <div className='w-full p-2'>
        <Outlet></Outlet>
        </div>  
        </div>
  )
}

export default AdminLayout