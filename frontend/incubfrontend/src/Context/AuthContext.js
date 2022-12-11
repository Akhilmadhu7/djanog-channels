import {createContext, useContext, useEffect,useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    
    let [authTokens, setAuthTokens] = useState( ()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null) 
    let [user, setUser] = useState( ()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null) 
    let [admin, setAdmin] = useState( ()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null)
    let [loading, setLoading] = useState(true)

    
    const navigate = useNavigate()


    let loginUser = async (e) =>{
        if (user) {
           
            navigate('/home')
            
        }

        e.preventDefault()
        
        let response = await fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/JSON',
                
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })

        let data = await response.json()
        
        if (response.status === 200) {

            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            
            navigate('/home')

        } else {
            console.log(response.errors,'llll',response.data);
            let a = response.error
            Swal.fire("Error",'Not a valid credentials',a)
        }
    }


    let logoutUser = () =>{
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to Logout ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
          }).then((result)=>{
            if (result.isConfirmed) {
                setAuthTokens(null)
                setUser(null)
                localStorage.removeItem('authTokens')
                console.log('after logout confrirmation',user,authTokens);
       
                navigate('/')
        
            }
          })
    }


    let updateUserToken = async () =>{
        console.log('update token');
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/JSON'
            },
            body:JSON.stringify({'refresh':authTokens.refresh})
        })

        let data = await response.json()

        if (response.status === 200) {

            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            
        } else {
            logoutUser()
            
        }

    }



    // Login function for admin


    let loginAdmin = async (e) =>{
       
        console.log('admin loggggginggggg');
        e.preventDefault()
        
        let response = await fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/JSON'
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })

        let data = await response.json()
        console.log('akjsdkjasdh',data);
        console.log('response asindsdf',response.data);
        console.log('response checkinggggggg',data.username);
        if (response.status === 200) {

            setAuthTokens(data)
            setAdmin(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            
            if (admin.is_admin) {
                console.log(authTokens,'iddddd');
                navigate('/admin/application')
               
            } else {
                setAuthTokens(null)
                setAdmin(null)
                localStorage.removeItem('authTokens')
                Swal.fire("Error","Not a valild credentials")
               
            }
        } else {

            Swal.fire("Error","Not a valild credentials")
        }
    }


    let logoutAdmin = () =>{
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to Logout ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
          }).then((result)=>{
            if (result.isConfirmed) {
                
                setAuthTokens(null)
                setAdmin(null)
                console.log('adminlogooouttt',admin);
                localStorage.removeItem('authTokens')
                navigate('/adminlogin')
            }

          })
        
       
    }

    
    


    

    let updateAdminToken = async () =>{
        console.log('update token');
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/JSON'
            },
            body:JSON.stringify({'refresh':authTokens.refresh})
        })

        let data = await response.json()

        if (response.status === 200) {

            setAuthTokens(data)
            setAdmin(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            
        } else {
            logoutAdmin()
            
        }

    }

    let contextData = {
        user:user,
        admin:admin,
        loginUser:loginUser,
        logoutUser:logoutUser,
        loginAdmin:loginAdmin,
        logoutAdmin:logoutAdmin,
        authTokens:authTokens
    }

    useEffect(()=>{

        let fiveMinutes = 1000 * 60 * 10
        let interval = setInterval(()=>{
            if(authTokens){
                updateUserToken()
                updateAdminToken()
            }
        }, fiveMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    // useEffect(()=>{

    //     let fiveMinutes = 1000 * 60 * 10
    //     let interval = setInterval(()=>{
    //         if(authTokens){
    //             updateAdminToken()
    //         }
    //     }, fiveMinutes)
    //     return ()=> clearInterval(interval)
        

    // }, [authTokens, loading])

    return (

        <AuthContext.Provider value={contextData} >
            {children}

        </AuthContext.Provider>
    )
}

