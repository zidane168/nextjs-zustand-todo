import { useEffect, useRef, useState } from "react";

import useTodoStore from "./../../store/todos";

import TDHeader from "./../../components/TDHeader";
import TDFooter from "./../../components/TDFooter";
import TDTitle from "./../../components/TDTitle"; 
import { ITodoState } from './../../utils/interface'

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


import {
  TDEditIcon,
  TDRemoveIcon,
  TDMarkCompleteIcon,
  TDMarkUncompleteIcon,
} from "./../../components/TDIcon";

import moment from "moment";

import { ROUTES, STATUS } from "./../../utils/contants";
import { getProfile } from "../api/api.member";
import { getSession } from "next-auth/react"; 
import { ToastMessage } from "../../components/TDToastMessage";
import Router, { useRouter } from "next/router";
import { PaginatedItems } from "../../components/TDPagination"; 

interface IPackage {
  username: string,  
  accessToken: string, 
}

export default function Todo({ username, accessToken }: IPackage) {
  
  const { total, todos, types, addTodo, removeTodo, markCompleteTodo, fetchTodos } = useTodoStore();

  // ToastMessage
  const [message, setMessage] = useState({
    isError: true,
    msg: "",
  });

  const today = moment().format("YYYY-MM-DD"); 

  const [ limit, setLimit ] = useState(2);            // limit display on this page (10, 20, 50)
  const [ page, setPage ] = useState(1);              // current page showing 

  const router = useRouter();

  const [ offset, setOffset ] = useState(page * 2)

  useEffect(() => {
    let modal = document.getElementById("addModal");

    if (modal) {
      modal.style.display = "none";
    }
  }, [])    // call 1 time after load

  useEffect(() => {
    
    const fetchData = async () => { 
      const items = await fetchTodos(accessToken, limit, page, "", 0, "");  // call api from Zustand state
 
      if (!items || items?.params?.total == 0) {
        router.push(ROUTES.LOGIN)
      }
    }

    fetchData().catch(console.error); 

  }, [limit, page])   // add page here


  const handleClickSearch = async(e, pageIndex = 1) => {
    if (e?.preventDefault) {
      e?.preventDefault()
    }

    setPage(pageIndex);
  }

  const closeAddForm = () => {
    let modal = document.getElementById("addModal");    
    if (modal) {
      modal.style.display = "none";
    }
    
    // let modalChildren = document.getElementById("modal-content");  
    // modalChildren.classList.add('close-modal-content')
    // modal.classList.add('close-modal')
  };

  const openAddForm = () => {
    let modal = document.getElementById("addModal");
    if (modal) {
      modal.style.display = "block";
    }
  };
 

  const markCompleteFunc = (id: string, index: number) => { 
    markCompleteTodo(accessToken, id, index); // call Zustand state
  };

  const removeTodoFunc = (id: string) => {
    removeTodo(accessToken, id);  // call Zustand state
  }


  // change the number of row
  const handleDisplayClick = (e: any) => {  
    setLimit(e.target.value)
  }

  return (
    <>
 
      <TDHeader username={ username } />
      <TDTitle>List Task items</TDTitle>

      <div className="mt-[10px] container mx-auto">
        <ToastMessage message={ message } setMessage={ setMessage } /> 
        
        <div className="flex justify-end mt-2">
            <button id="myBtn " onClick={() => openAddForm()}>
                Add New Task
            </button>
        </div>
        <div className="w-full">
         
          <div>
            <label className="uppercase">
              Display: 
            </label>
            <select name="display" className="bg-slate-100 p-2 w-[200px]" onClick={ (e) => handleDisplayClick(e) }>
              <option value="2"> 2 rows</option>
              <option value="10"> 10 rows</option>
              <option value="50"> 50 rows</option>
            </select>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th> No </th>
                <th> Job </th>
                <th> Type </th>
                <th> Remark </th>
                <th> Create Date </th>
                <th> Due Date </th>
                <th> Overdue </th>
                <th> Status </th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              {
              todos.map((item, index) => {
                let dueDate = moment(item.dueDate, "YYYY-MM-DD");
                let distance = moment.duration(dueDate.diff(today)).asDays();
                let highlightOverDue = "";

                if (distance === 0) {
                  if (item.status === STATUS.DOING) {
                    item.status = STATUS.OVERDUE;
                    highlightOverDue = "text-rose-700";
                  }
                }

                let todoStyle = "uncomplete";
                let buttonCompleteStyle = "info";
                let statusStyle = "doing";
                if (item.status === STATUS.COMPLETED) {
                  todoStyle = "complete";
                  statusStyle = "done";
                  buttonCompleteStyle = "success";
                }

                let typeStyle = "home";
                if (item.type === "Research") {
                  typeStyle = "research";
                }

                return (
                  <tr key={index} className={todoStyle}>
                    <td> {index+1} </td>
                    <td> {item.job} </td>
                    <td> 
                      <span className={typeStyle}> </span> {item.type === 1 ? 'Home' : 'Research'} 
                    </td>
                    <td> {item.remark} </td> 
                    <td> { moment(item.createDate).format("YYYY-MM-DD HH:mm:ss") } </td> 
                    <td> { moment(item.dueDate).format("YYYY-MM-DD HH:mm:ss") } </td>
                    <td> 
                      <span className={highlightOverDue}> 
                        {distance} 
                      </span> 
                      days! 
                    </td>
                    <td className={statusStyle}> {item.status} </td>
                    <td>
                      <div className="flex space-x-2">
                        {/* <button className="warning ">
                          <TDEditIcon bgColor="#FFF" width={ 20 } />
                        </button> */}

                        <button
                          className="danger"
                          onClick={() => removeTodoFunc(item._id)}
                        >
                          <TDRemoveIcon bgColor="#FFF"  width={ 20 } />
                        </button>

                        <button
                          className={buttonCompleteStyle}
                          onClick={() => markCompleteFunc(item._id, index)}
                        >
                          {item.status === STATUS.COMPLETED ? (
                            <TDMarkUncompleteIcon bgColor="#FFF" width={ 20 } />
                          ) : (
                            <TDMarkCompleteIcon bgColor="#FFF"  width={ 20 } />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> 
 
          <PaginatedItems 
            page={ page }
            itemsPerPage={ limit }
            total={ total }
            offset={ offset }
            setOffset={ setOffset }
            handleClickSearch={ handleClickSearch }
            
          />

          { 
          todos.length == 0 && 
            <div className='text-rose-500 text-xl text-center h-[calc(100%-100px)]'> Congratulation, You had completed all task today!</div>
          }
        </div>


        <div id="addModal" className="modal">
          <div className="modal-content" id="modal-content">
            <div className="modal-header">
                <h2>Add Items</h2>
                <span className="close" onClick={() => closeAddForm()}>
                &times;
                </span>
            </div>
            <div className="modal-body"> 
              <Formik  
                initialValues={{ job: "", type: "", remark: "", dueDate: "" }}
                validationSchema={Yup.object({
                  job: Yup.string()
                    .max(50, "Must be 50 characters or less")
                    .required("Job is Required"),
                    type: Yup.string()                     
                    .required("Type is Required"),

                  type: Yup.string()
                    .oneOf(
                      ['1', '2'],
                      'Invalid Job Type'
                    ).required("Type is Required"),

                  remark: Yup.string()
                    .max(100, "Must be 100 characters or less"),
                  dueDate: Yup.string()                    
                    .required("DueDate is Required")
                })}
                onSubmit={ async(values, { setSubmitting }) => {
                 
                  let item:ITodoState = { 

                    job: values['job'],                
                    type: values['type'],
                    dueDate: values['dueDate'],
                    remark: values['remark'],
                  };
                  let result = await addTodo(accessToken, item);
                  let isError = false;
                  if (result?.statusCode !== 200) {
                    isError = true; 
                  } 
              
                  setMessage({
                    isError: isError,
                    msg: result?.message
                  }) 
          
                }}
              >
                  
                <Form>
                  <div className="bg-sky-300 shadow-lg p-4 container w-[500px] mx-auto rounded-md"> 
                    <div>
                        <label  htmlFor="job" className="flex items-center text-right font-bold uppercase text-sky-600"> 
                          Job Name <span className="required-star"> (*) </span>  
                        </label>
                        <Field name="job" type="text" placeholder="Learn NextJS in Tet Holiday" />                        
                        <div className="error-message">  
                          <ErrorMessage name="job"/>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label  htmlFor="type" className="flex items-center text-right font-bold uppercase text-sky-600"> 
                          Type <span className="required-star"> (*) </span>  
                        </label>
                        <Field name="type" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value={""}>Please Select </option>
                          <option value="1"> Home  </option>
                          <option value="2"> Research  </option>
                        </Field>
                        <div className="error-message">  
                          <ErrorMessage name="type"/>
                        </div> 
                    </div>
                    <div className="mt-4">
                        <label  htmlFor="job" className="flex items-center text-right font-bold uppercase text-sky-600"> 
                          Due Date: <span className="required-star"> (*) </span> 
                        </label>
                        <Field name="dueDate" type="date" min={ today } placeholder="Learn NextJS in Tet Holiday" />                        
                        <div className="error-message">  
                          <ErrorMessage name="dueDate"/>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label  htmlFor="remark" className="flex items-center text-right font-bold uppercase text-sky-600"> 
                          Remark: 
                        </label>
                        <Field name="remark" type="text" placeholder="Remark for NextJS Job" />                        
                        <div className="error-message">  
                          <ErrorMessage name="remark"/>
                        </div>
                    </div>

                    <div className="mt-4 text-right">
                        <button type="submit" className="   bg-yellow-300 px-4 py-2 rounded-md text-[#00F] font-bold"> Add Todos Items </button>
                    </div>
                  </div>
                </Form> 
              </Formik>
            </div>
          </div>
        </div>
 

      </div>
      <TDFooter />
    </>
  );
}

export async function getServerSideProps(ctx) {

  const session = await getSession(ctx)
  const accessToken = session?.accessToken || "" 
 
  // ko call get Todos list here, because we will useEffect to call it,
  let [ user ] = await Promise.all([getProfile(accessToken)]) // [ user ] moi ok, { user } ko co data,ko hieu 
 
  return {
    props: { 
      username: user?.params?.username ? user.params.username : null,
      accessToken: accessToken
    }
  }
}