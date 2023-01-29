import { useEffect, useRef } from "react";

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

import { STATUS } from "./../../utils/contants";
import { getProfile } from "../api/api.member";
import { getSession } from "next-auth/react";

interface IUser {
  username: string
}


export default function Todo({ username }: IUser) {
  const { todos, types, addTodo, removeTodo, markCompleteTodo } = useTodoStore();
  const today = moment().format("YYYY-MM-DD");

  const id = useRef<any>();
  const job = useRef<any>();
  const dueDate = useRef<any>();
  const remark = useRef<any>();


  useEffect(() => {
    let modal = document.getElementById("addModal");

    if (modal) {
      modal.style.display = "none";
    }
  
  }, [])    // call 1 time 

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

  const add = () => {
    let item:ITodoState = {
      id: id?.current?.value ? id?.current?.value as string : ' ',
      job: job?.current?.value ? job?.current?.value as string : ' ',
      type: (document.getElementById("Type") as HTMLInputElement).value,
      dueDate: dueDate?.current?.value ?  (dueDate?.current?.['value']) as string :'',
      remark: remark?.current?.value ? remark?.current?.value as string : '',
    };
    addTodo(item);
  };

  const markCompleteFunc = (index: number) => {
    markCompleteTodo(index);
  };

  return (
    <>
      <TDHeader username={ username } />
      <TDTitle>List Task items</TDTitle>
      <div className="mt-[10px] container mx-auto">
        
        <div className="flex justify-end">
            <button id="myBtn " onClick={() => openAddForm()}>
                Add New Task
            </button>
        </div>
        <div className="w-full">
          {todos.length > 0 && (
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
                {todos.map((item, index) => {
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
                      <td> {item.id} </td>
                      <td> {item.job} </td>
                      <td> 
                        <span className={typeStyle}> </span> {item.type} 
                      </td>
                      <td> {item.remark} </td> 
                      <td> {item.created} </td> 
                      <td> {item.dueDate} </td>
                      <td> 
                        <span className={highlightOverDue}> 
                          {distance} 
                        </span> 
                        days! 
                      </td>
                      <td className={statusStyle}> {item.status} </td>
                      <td>
                        <div className="flex space-x-2">
                          <button className="warning ">
                            <TDEditIcon bgColor="#FFF" width={ 20 } />
                          </button>

                          <button
                            className="danger"
                            onClick={() => removeTodo(item.id)}
                          >
                            <TDRemoveIcon bgColor="#FFF"  width={ 20 } />
                          </button>

                          <button
                            className={buttonCompleteStyle}
                            onClick={() => markCompleteFunc(index)}
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
          )}

          { 
          todos.length <= 0 && 
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
                      <span className="required-star"> * </span> ID: 
                      </label>
                      <input
                        ref={ ref => id.current = ref }
                        required
                        type="text"
                        name="id"
                        placeholder="1"
                      />
                  </div>

                  <div>
                      <label>
                      {" "}
                      <span className="required-star"> * </span> Job Name:{" "}
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

      </div>
      <TDFooter />
    </>
  );
}

export async function getServerSideProps(ctx) {

  const session = await getSession(ctx)
  const accessToken = session?.accessToken || "" 
 
  let [ user ] = await Promise.all([getProfile(accessToken)]) // [ user ] moi ok, { user } ko co data,ko hieu
 
  return {
    props: { 
      username: user?.params?.username ? user.params.username : null
    }
  }
}