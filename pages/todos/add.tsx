import { useRef }  from 'react'
import Image from 'next/image'
import Link from 'next/link'

import useStore from "./../../store/todos"

import TDHeader from "./../../components/TDHeader" 
import TDFooter from "./../../components/TDFooter"
import TDTitle from "./../../components/TDTitle"
import TDCombobox from "./../../components/TDCombobox"
import moment from 'moment'

import { STATUS } from './../../utils/contants'

import Edit from 'public/icon/edit.svg'
import MarkComplete from 'public/icon/mark-complete.svg'
import Remove from 'public/icon/remove.svg'

export default function Add() {

    const { todos, types, addTodo }  = useStore()
    const today = moment().format('YYYY-MM-DD')

    const job = useRef() 
    const dueDate = useRef()
    const remark = useRef()

    const add = () => {
        let item = {  
            job: job.current.value,
            type: document.getElementById('Type').value,
            dueDate: dueDate.current.value,
            remark: remark.current.value,
        }
        addTodo(item)
    }

    return (
        <>
            <TDHeader />
            <TDTitle>
                Add items
            </TDTitle>
            <div className="flex space-x-2  mt-[10px] container mx-auto">
                <div  className="bg-sky-300 shadow-lg p-4 mx-auto w-[1/3] rounded-md">
                    <div>
                        <label> <span className="required-star" > * </span> Job Name: </label>
                        <input ref={ job } required type="text" name="job" placeholder="Learn NextJS in 3 weeks"/>
                    </div>
                    <div className="mt-4"> 
                        <TDCombobox  is_required={ true }  label="Type" placeHolder="Please Select" items={types} />
                    </div>
                    <div className="mt-4"> 
                        <label> <span className="required-star" > * </span>  Due Date: </label>
                        <input ref={ dueDate }  min={ today } required  type="date" name="dueDate" />
                    </div>
                    <div className="mt-4"> 
                        <label> Remark: </label>
                        <input ref={ remark }  type="text" name="text"  placeholder="Please focus, Try your best, go ahead" />
                    </div>

                    <div className="mt-4 text-right">
                        <button onClick={ add } > Add Todos Items </button> 
                    </div>
                </div>

                <div className="w-full">
                    {  
                    todos.length > 0 && 
                    <table className="table">
                        <thead>
                            <tr>
                                <th> No </th>
                                <th> Job </th> 
                                <th> Type </th> 
                                <th> Remark </th> 
                                <th> Due Date </th> 
                                <th> Overdue </th>  
                                <th> Status </th>  
                                <th> Action </th>  
                            </tr>
                        </thead> 
                        <tbody>
                            { 
                                todos.map( (item, index) => {
                                    let dueDate = moment(item.dueDate, 'YYYY-MM-DD')
                                    let distance = moment.duration(dueDate.diff(today)).asDays();
                                    let highlightOverDue = ''

                                    if (distance === 0) {
                                        if (item.status === STATUS.DOING) {
                                            item.status = STATUS.OVERDUE
                                            highlightOverDue = 'text-rose-700' 
                                        }  
                                    }
                                    
                                    return (  
                                            <tr key={ index } > 
                                                <td> { item.no } </td>
                                                <td> { item.job } </td>
                                                <td> <span className="bg-green-800 p-2 rounded-lg text-white"> { item.type } </span> </td>
                                                <td> { item.remark } </td>
                                                <td> { item.dueDate }  </td> 
                                                <td className={ highlightOverDue }> { distance } days! </td> 
                                                <td> { item.status } </td> 
                                                <td> 
                                                    <div className="flex space-x-2"> 
                                                        <Link href="/todos/edit">
                                                            <span className="rounded-md p-2 bg-yellow-500 text-white"> 
                                                                <Image src={ Edit } width="50" height="50" alt="Edit" />
                                                            </span>
                                                        </Link>
                                                        <Link href="/todos/remove">
                                                            <span className="rounded-md p-2 bg-rose-500 text-white">  
                                                                <Image src={ Remove } width="50" height="50" alt="Remove" />
                                                            </span>
                                                        </Link>  
                                                        <span className="rounded-md p-2 bg-green-700 text-white" onClick={ markComplete }>   
                                                            <Image src={ MarkComplete } width="50" height="50" alt="MarkComplete" />
                                                        </span> 
                                                    </div>
                                                </td> 
                                            </tr> 
                                        )
                                    }) 
                            } 
                        </tbody>
                   </table>
                    
                   

                    }
                </div>
            </div>

            <TDFooter />
        </>
    )
}