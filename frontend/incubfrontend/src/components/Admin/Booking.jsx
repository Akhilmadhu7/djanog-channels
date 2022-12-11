import React, { useState, useContext } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import AuthContext, { AuthProvider } from "../../Context/AuthContext";
import Header from "./Header";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

const baseUrl = "http://127.0.0.1:8000";

function Booking() {
  const [slot, setSlot] = useState([]); // for storing the id of selected company
  const [bookings, setBookings] = useState([]); //for storing the available slots and booked slots
  const [modal, setModal] = useState(false); //for showing modal
  const [list, setList] = useState([]); //for storing the approved lists data and to show in the modal
  const [book, setBook] = useState([]); //for storing the id of selected div to book for the selected company

  const [nextUrl, setNextUrl] = useState(); //for storing the next page  data from pagination
  const [previousUrl, setPreviousUrl] = useState(); //for storing the previous page data from pagination
  const [currentUrl, setCurrentUrl] = useState([]); //for storing the current page data(or url)

  const handleModal = (data_id) => {
    console.log("wwwww", data_id);
    setBook(data_id);
    setModal(!modal);
  };

  //On handleSubmit this slotdata carrying the id of the slot and company id will pass to the backend and
  //booked the selected slot for the selected company

  //  'slot' taking the value of company_name and 'book' take the value of that particular div

  const handleSubmit = (url) => {
    let slotdata = { slot, book };

    Axios.post(baseUrl + "/bookslot", slotdata).then((res) => {
      if (res) {
        fetchData(url);
      }
    });
    setModal(!modal);
  };

  const addSlot = (url) => {
    Swal.fire({
      title: "Confirm!",
      text: "Do you want to Logout ?",
      icon: "info",
      confirmButtonText: "Continue",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(baseUrl + "/slotbooking").then((res) => {
          console.log("this is response", res.data);
          if (res) {
            fetchData(url);
            Swal.fire("Success", "Slot created succesfully");
          }
        });
      }
    });
  };

  useEffect(() => {
    fetchData(baseUrl + "/slotpagination");
  }, []);

  function fetchData(url) {
    setCurrentUrl(url);
    Axios.get(url).then((res) => {
      if (res) {
        setBookings(res.data.results);
        console.log("mmm", res.data.results);
        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
      }
    });
    Axios.get(baseUrl + "/approvedlist").then((res) => {
      setList(res.data);
    });
  }

  const paginationHandler = (url) => {
    fetchData(url);
  };

  return (
    <div>
      <AuthProvider>
        <Header />
      </AuthProvider>

      <div className="bg-slate-200 rounded-md h-full ring-2 ring-indigo-600 ">
        <div className="">
          <div className="   p-3 m-autorounded-md  mb-3 ">
            <div className="">
              <h1 className="text-indigo-700  text-center text-3xl font-semibold underline uppercase decoration-wavy">
                Book Slots
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md">
          <div className="">
            <button
              onClick={() => addSlot(currentUrl)}
              className="m-3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Add Slot
            </button>
          </div>

          <div className="bg-gray-100  rounded-md">
            <div className="  grid justify-items-center rounded-md lg:grid-cols-5 sm:grid-cols-2">
              {bookings.map((booking) => {
                // console.log(index+1,'this is index ');

                return booking.is_booked ? (
                  <div className="box-border items-center h-32 w-32 p-4 border-4 bg-red-500 mx-6 my-6">
                    Slot No: {booking.room}
                    {/* {booking.id} */}
                    {/* passing the slot id to handleModal function and passing to backend to provide this Slot
                          to the corresponding company */}
                  </div>
                ) : (
                  <div
                    onClick={(e) => handleModal(booking.id)}
                    className="box-border items-center h-32 w-32 p-4 border-4 bg-green-500 mx-6 my-6"
                  >
                    Slot No: {booking.room}
                    {/* passing the slot id to handleModal function and passing to backend to provide this Slot
                            to the corresponding company */}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center py-4 bg-slate-200 rounded-md">
            <nav aria-label="Page navigation example">
              <ul className="flex list-style-none">
                {previousUrl && (
                  <li className="page-item">
                    <button
                      onClick={() => paginationHandler(previousUrl)}
                      className="flex page-link relative block py-1.5 px-3 md-rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-indigo-700 hover:text-white hover:bg-indigo-700  focus:shadow-none"
                    >
                      {" "}
                      <FaAngleDoubleLeft className="m-1"></FaAngleDoubleLeft>
                      Previous
                    </button>
                  </li>
                )}

                {nextUrl && (
                  <li className="page-item">
                    <button
                      onClick={() => paginationHandler(nextUrl)}
                      className="flex page-link relative block py-1.5 px-3 md-rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-indigo-700 hover:text-white hover:bg-indigo-700 focus:shadow-none"
                    >
                      Next{" "}
                      <FaAngleDoubleRight className="m-1"></FaAngleDoubleRight>
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>

        {modal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Choose an Applicant
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      <select
                        onChange={(e) => setSlot(e.target.value)}
                        className="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-xl font-normal text-gray-700
                                        bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out
                                        m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label=".form-select-lg example"
                      >
                        <option selected>Open this select menu</option>
                        {/* taking the id of the company id  to book room and storig the value to setSlot */}
                        {list.map((data) => {
                          return data.allotted ? null : (
                            <option value={data.id}>{data.company_name}</option>
                          );
                        })}
                      </select>
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      onClick={() => handleModal(!modal)}
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Close
                    </button>

                    <button
                      onClick={() => handleSubmit(currentUrl)}
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Booking;
