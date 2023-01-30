import { useEffect, useRef, useState } from "react";

import useTodoStore from "./../../store/todos";

import TDHeader from "./../../components/TDHeader";
import TDFooter from "./../../components/TDFooter";
import TDTitle from "./../../components/TDTitle";
import TDCombobox from "./../../components/TDCombobox";
import { ITodoState } from './../../utils/interface'

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

interface IPackage {
  username: string, 
  lstTodo: Array<ITodoState>,
  accessToken: string, 
}


export default function Todo({ username, lstTodo, accessToken }: IPackage) {
  const { todos, types, addTodo, removeTodo, markCompleteTodo, fetchTodos } = useTodoStore();

  // ToastMessage
  const [message, setMessage] = useState({
    isError: true,
    msg: "",
  });

  const today = moment().format("YYYY-MM-DD");

  const id = useRef<any>();
  const job = useRef<any>();
  const dueDate = useRef<any>();
  const remark = useRef<any>();

  const router = useRouter();

  useEffect(() => {
    let modal = document.getElementById("addModal");

    if (modal) {
      modal.style.display = "none";
    }

    const fetchData = async () => {
      const items = await fetchTodos(accessToken);  // call api from Zustand state
    
      if (!items) {
        router.push(ROUTES.LOGIN)
      }
    }

    fetchData().catch(console.error);
  
  }, [])    // call 1 time after load

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

  const add = async() => {
    let item:ITodoState = { 

      job: job?.current?.value ? (job?.current?.['value']) as string : ' ',
     // type: (document.getElementById("Type") as HTMLInputElement).value,    // get value
      type: (document.getElementById("Type") as HTMLInputElement)?.selectedIndex,   // get index
      dueDate: dueDate?.current?.value ?  (dueDate?.current?.['value']) as string :'',
      remark: remark?.current?.value ? (remark?.current?.['value']) as string : '',
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
    
  };

  const markCompleteFunc = (id: string, index: number) => { 
    markCompleteTodo(accessToken, id, index); // call Zustand state
  };

  const removeTodoFunc = (id: string) => {
    removeTodo(accessToken, id);  // call Zustand state
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
                  <div className="bg-sky-300 shadow-lg p-4 container w-[500px] mx-auto rounded-md"> 
                    <div>
                        <label> 
                          <span className="required-star"> * </span> Job Name: 
                        </label>
                        <input
                          ref={ ref => job.current = ref }
                          required
                          type="text"
                          name="job"
                          placeholder="Learn NextJS in 3 weeks"
                        />
                    </div>
                    <div className="mt-4">
                        <TDCombobox
                        is_required={true}
                        label="Type"
                        placeHolder="Please Select"
                        items={types}
                        />
                    </div>
                    <div className="mt-4">
                        <label> 
                        <span className="required-star"> * </span> Due Date:{" "}
                        </label>
                        <input
                        ref={dueDate}
                        min={today}
                        required
                        type="date"
                        name="dueDate"
                        />
                    </div>
                    <div className="mt-4">
                        <label> Remark: </label>
                        <input
                        ref={ ref => remark.current = ref }
                        type="text"
                        name="text"
                        placeholder="Please focus, Try your best, go ahead"
                        />
                    </div>

                    <div className="mt-4 text-right">
                        <button onClick={add}> Add Todos Items </button>
                    </div>
                  </div>
              </div>
            </div>
        </div>

        {/* <div id="deleteModal" className="modal">
            <div className="modal-content" id="modal-content">
              <div className="modal-header">
                  <h2>Delete Items</h2>
                  <span className="close" onClick={() => closeDeleteForm()}>
                  &times;
                  </span>
              </div>
              <div className="modal-body">
                  <div className="bg-sky-300 shadow-lg p-4 container w-[500px] mx-auto rounded-md"> 
                    Do you want to delete this items? 
                    <div className="mt-4 text-right">
                      <button onClick={add}> Add Todos Items </button>
                    </div>
                  </div>
              </div>
            </div>
        </div> */}

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