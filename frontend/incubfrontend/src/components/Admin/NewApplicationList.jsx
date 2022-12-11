import React, {useState, useEffect, useContext} from 'react'
import Axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import AuthContext,{AuthProvider} from '../../Context/AuthContext'
import Header from './Header'
import {FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa'

const baseUrl = 'http://127.0.0.1:8000/'

function NewApplicationList() {
  
  let {user,admin, authTokens} =useContext(AuthContext)
 



  const [bookings, setBookings] = useState([])
  const [view, setView] = useState({})
  const [modal, setModal] = useState(false)
  const navigate =  useNavigate()

  const [nextUrl,setNextUrl] = useState()                //for storing the next page  data from pagination
  const [previousUrl,setPreviousUrl] = useState()        //for storing the previous page data from pagination
  const [currentUrl, setCurrentUrl] = useState([])       //for storing the current page data(or url)



useEffect(() => {
  if(authTokens!==null) {
    console.log('akhilakhilakhilalkhil',authTokens);
    if (admin.is_admin){
      console.log('is admin or not',admin.is_admin);
      navigate('/admin/application')
      } else{
        console.log('not superadmin');
        navigate('/adminlogin')
      }
  }
  else{
    console.log('no tokeennnss');
      navigate("/adminlogin")
  }
 
},[]);


  useEffect(()=>{
    fetchdata(baseUrl+'applicationlist')

  },[])

  useEffect(()=>{
    console.log('modal valje is',modal);
  },[modal])


  function fetchdata(url){

      setCurrentUrl(url)

      Axios.get(url).then((res)=>{
        setBookings(res.data.results)
        setNextUrl(res.data.next)
        setPreviousUrl(res.data.previous)
        
      }).catch(err =>{
        console.log(err);
        Axios.get(previousUrl).then((res)=>{
        setBookings(res.data.results)
        setNextUrl(res.data.next)
        setPreviousUrl(res.data.previous)
        
      })
        
      })
      
  }


  const paginationHandler = (url)=>{
    fetchdata(url)
  }



  const handleApprove = (booking_id,url)=>{

    Swal.fire({
      title: 'Confirm!',
      text: 'Do you want to Approve ?',
      icon: 'info',
      confirmButtonText: 'Continue',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        try {
          Axios.post(baseUrl+'approved/'+booking_id).then(res=>{
            Swal.fire('Success','Form Approved')
            
            fetchdata(url)
          })
        } catch (err) {
          Swal.fire('error','Form has not been Approved')
        }
      }else{
        Swal.fire('','Formss has not been Approved')
      }
    })
    

  }

  const handleDecline = (booking_id,url)=>{
    
    Swal.fire({
      title: 'Confirm!',
      text: 'Do you want to Decline ?',
      icon: 'info',
      confirmButtonText: 'Continue',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        try {
          Axios.post(baseUrl+'decline/'+booking_id).then((res)=>{

            Swal.fire('Success','Form Declined')
            
            fetchdata(url)
          })
        } catch (error) {
          Swal.fire('error','Form has not been declined')
        }
      }else{
        Swal.fire('','Formss has not been declined')
      }
    })
  }


  const toggle = (booking_id)=>{

    try {
      Axios.get(baseUrl+'bookingdetails/'+booking_id).then((res)=>{
        setView(res.data)

        setModal(!modal)

      })
    } catch (error) {
      Swal.fire("Error","Something went wrong")
      
    }
  }


  return (
    <div className=''>
      <AuthProvider>
      <Header/>
      </AuthProvider>

    <div className='bg-slate-200 rounded-md h-full ring-2 ring-indigo-600 '>
      <div className=''>
        <div className='   p-3 m-autorounded-md  mb-3 '>
        <div className=''>
             <h1 className='text-indigo-700  text-center text-3xl font-semibold underline uppercase decoration-wavy'>
                    New Applications   
            </h1>
                    
                </div>
        </div>
      </div>

    <div className='bg-slate-200 rounded-md'>
          
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
              <p>{bookings.id}</p>

                <table class="min-w-full">
                  <thead class="bg-white border-b">
                    
                    <tr>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Sl.No
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Full Name
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Company Name
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Status
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        open
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        decline
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        approve
                      </th>
                    </tr>
                  
                  </thead>
                  <tbody>
                    {bookings.map((booking,index) =>{

                    return(
                      <tr class="bg-gray-100 border-b">
                        <td class="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                          {booking.full_name}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                          {booking.company_name}
                          
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                        
                        
                        {booking.pending ? 'pending'  : 'nooo'}
                              
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                        <button onClick={()=>toggle(booking.id)} className='m-3 px-8 py-3 text-white transition-colors duration-200 transform bg-amber-500 rounded-md hover:bg-amber-400 focus:outline-none focus:bg-amber-400'>
                        Open 
                                </button>
                        </td>
                        {/* <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                        <button  onClick={()=>handleDecline(booking.id, currentUrl )} className='m-3 px-8 py-3 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'>
                        Decline
                                </button>
                        </td> */}
                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                        <button  onClick={()=>handleDecline(booking.id,currentUrl)} className='m-3 px-8 py-3 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'>
                        Decline
                                </button>
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                        <button onClick={()=>handleApprove(booking.id,currentUrl)} className='m-3 px-8 py-3 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'>
                        Approve
                                </button>
                        </td>
                      
                      </tr>
                    )
                    })}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


       


      </div>
      <div className="flex justify-center py-1">
                          <nav aria-label="Page navigation example">
                              <ul className="flex list-style-none">
                                {previousUrl && 
                                    <li className="page-item"><button
                                        onClick={()=> paginationHandler(previousUrl)}
                                        className="flex page-link relative block py-1.5 px-3 md-rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-indigo-700 hover:text-white hover:bg-indigo-700  focus:shadow-none"
                                        > <FaAngleDoubleLeft className='m-1'></FaAngleDoubleLeft> 
                                          Previous
                                        </button>
                                    </li>
                                    }
                                   
                                 {nextUrl &&  
                                    <li className="page-item"><button
                                        onClick={()=> paginationHandler(nextUrl)}
                                        className="flex page-link relative block py-1.5 px-3 md-rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-indigo-700 hover:text-white hover:bg-indigo-700 focus:shadow-none"
                                        >Next <FaAngleDoubleRight className='m-1'></FaAngleDoubleRight> 
                                        </button>
                                    </li>
                                  }
                              </ul>
                          </nav>
                    </div>

    </div>

    {/* </button> */}
      {modal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Application Details of {view.full_name}
                  </h3>
                  {/* <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      × 
                    </span>
                  </button> */}
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    <ul>
                      <li>Name: {view.full_name}</li>
                      <li>Company Name: {view.company_name}</li>
                      <li>Email: {view.email}</li>
                      <li>Address: {view.address}</li>
                      <li>{view.id}</li>
                    </ul>
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(!modal)}
                   
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}


    

      
    </div>
  )
  
}

export default NewApplicationList