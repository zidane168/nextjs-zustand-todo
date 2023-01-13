

import useStore from "./../../store/todos"

import TDHeader from "./../components/TDHeader" 
import TDFooter from "./../components/TDFooter"
import TDTitle from "./../../components/TDTitle"
import TDCombobox from "./../../components/TDCombobox"

export default function Add() {

    const { todos, types, addTodo }  = useStore();
    return (
        <>
            
            <TDTitle>
                Add items
            </TDTitle>
            <div>
                <form action="" className="bg-sky-300 shadow-lg p-4 mx-auto w-[500px] rounded-md mt-[10px]">
                    <div>
                        <label> Job: </label>
                        <input type="text" name="job"/>
                    </div>
                    <div className="mt-4"> 
                        <TDCombobox label="Type" placeHolder="Please Select" items={types} />
                    </div>
                    <div className="mt-4"> 
                        <label> Remark: </label>
                        <input type="text" name="text" />
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