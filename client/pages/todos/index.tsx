import { useEffect, useRef } from "react";

import useTodoStore from "./../../store/todos";
import shallow from "zustand/shallow";

import TDHeader from "./../../components/TDHeader";
import TDFooter from "./../../components/TDFooter";
import TDTitle from "./../../components/TDTitle";
import TDCombobox from "./../../components/TDCombobox";
import {
  TDEditIcon,
  TDRemoveIcon,
  TDMarkCompleteIcon,
  TDMarkUncompleteIcon,
} from "./../../components/TDIcon";

import moment from "moment";

import { STATUS } from "./../../utils/contants";

export default function Add() {
  const { todos, types, addTodo, removeTodo, markCompleteTodo } =
    useTodoStore();
  const today = moment().format("YYYY-MM-DD");

  const id = useRef();
  const job = useRef();
  const dueDate = useRef();
  const remark = useRef();


  useEffect(() => {
    let modal = document.getElementById("addModal");
    modal.style.display = "none";
  }, [])    // call 1 time 

  const closeAddForm = () => {
    let modal = document.getElementById("addModal");   
    modal.style.display = "none";  
  };

  const openAddForm = () => {
    let modal = document.getElementById("addModal");
    modal.style.display = "block";
  };

  const add = () => {
    let item = {
      id: id.current.value,
      job: job.current.value,
      type: document.getElementById("Type").value,
      dueDate: dueDate.current.value,
      remark: remark.current.value,
    };
    addTodo(item);
  };

  const markCompleteFunc = (index: number) => {
    markCompleteTodo(index);
  };

  return (
    <>
      <TDHeader />
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
                        {" "}
                        <span className={typeStyle}> </span> {item.type}{" "}
                      </td>
                      <td> {item.remark} </td>
                      <td> {item.created} </td>
                      <td> {item.dueDate} </td>
                      <td>
                        {" "}
                        <span className={highlightOverDue}>
                          {" "}
                          {distance}{" "}
                        </span>{" "}
                        days!{" "}
                      </td>
                      <td className={statusStyle}> {item.status} </td>
                      <td>
                        <div className="flex space-x-2">
                          <button className="warning ">
                            <TDEditIcon bgColor="#FFF" width="20" />
                          </button>

                          <button
                            className="danger"
                            onClick={() => removeTodo(item.id)}
                          >
                            <TDRemoveIcon bgColor="#FFF" width="20" />
                          </button>

                          <button
                            className={buttonCompleteStyle}
                            onClick={() => markCompleteFunc(index)}
                          >
                            {item.status === STATUS.COMPLETED ? (
                              <TDMarkUncompleteIcon bgColor="#FFF" width="20" />
                            ) : (
                              <TDMarkCompleteIcon bgColor="#FFF" width="20" />
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
            <div className="modal-content">
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
                      {" "}
                      <span className="required-star"> * </span> ID:{" "}
                      </label>
                      <input
                      ref={id}
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
                      ref={job}
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
                      {" "}
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
                      ref={remark}
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