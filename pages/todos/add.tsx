

import useStore from "./../../store/todos"

import TDHeader from "./../../components/TDHeader" 
import TDFooter from "./../../components/TDFooter"
import TDTitle from "./../../components/TDTitle"
import TDCombobox from "./../../components/TDCombobox"
import moment from 'moment'

export default function Add() {

    const { todos, types, addTodo }  = useStore();
    const today = moment().format('YYYY-MM-DD');
    console.log(today)

    return (
        <>
            <TDHeader />
            <TDTitle>
                Add items
            </TDTitle>
            <div>
                <form action="" className="bg-sky-300 shadow-lg p-4 mx-auto w-[500px] rounded-md mt-[10px]">
                    <div>
                        <label> <span className="required-star" > * </span> Job Name: </label>
                        <input required type="text" name="job" placeholder="Learn NextJS in 3 weeks"/>
                    </div>
                    <div className="mt-4"> 
                        <TDCombobox is_required={ true }  label="Type" placeHolder="Please Select" items={types} />
                    </div>
                    <div className="mt-4"> 
                        <label> <span className="required-star" > * </span>  Due Date: </label>
                        <input min={ today } required  type="date" name="dueDate" />
                    </div>
                    <div className="mt-4"> 
                        <label> Remark: </label>
                        <input type="text" name="text"  placeholder="Please focus, Try your best, go ahead" />
                    </div>

                    <div className="mt-4 text-right">
                        <button> Add Todos Items </button> 
                    </div>
                </form>
            </div>

            <TDFooter />
        </>
    )
}