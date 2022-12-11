import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import AuthContext,{AuthProvider} from '../../Context/AuthContext'
import Header from './Header'
import {FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa'


const baseUrl = 'http://127.0.0.1:8000'

function DeclinedList() {

  const [declined, setDeclined] = useState([])
  const [nextUrl,setNextUrl] = useState()                //for storing the next page  data from pagination
  const [previousUrl,setPreviousUrl] = useState()        //for storing the previous page data from pagination

  useEffect(()=>{
    // Axios.get(baseUrl+'declinedlist').then(res=>{
    //   setDeclined(res.data)
    // }).catch(err=>{
    //   console.log(err);
    // })
    fetchdata(baseUrl+'/declinedlist')
  },[])


  function fetchdata(url){
    Axios.get(url).then(res=>{
      setDeclined(res.data.results)
      setNextUrl(res.data.next)
      setPreviousUrl(res.data.previous)
    })
  }


  const paginationHandler = (url)=>{
    fetchdata(url)
  }


  return (
    
    <div>
      <AuthProvider>
      <Header/>
      </AuthProvider>

    <div className='bg-slate-200 rounded-md h-full ring-2 ring-indigo-600 '>
      <div className=''>
        <div className='   p-3 m-autorounded-md  mb-3 '>
          <div className=''>
              <h1 className='text-indigo-700  text-center text-3xl font-semibold underline uppercase decoration-wavy'>
                      Declined Forms
              </h1>
                      
          </div>
        </div>
      </div>

     <div className='bg-slate-200 rounded-md  '>
          
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
              

                <table class="min-w-full">
                  <thead class="bg-white border-b ">
                    
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
                     
                     
                      
                    </tr>
                  
                  </thead>
                  <tbody>
                    {declined.map((decline,index) =>{

                    return(
                      <tr class="bg-gray-100 border-b ">
                        <td class="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                          {decline.full_name}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                          {decline.company_name}
                          
                        </td>
                        
                        
                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                        <button className='m-3 px-8 py-3 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'>
                        {decline.declined ? 'declined'  : 'nooo'}
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

    </div>


  )
}

export default DeclinedList