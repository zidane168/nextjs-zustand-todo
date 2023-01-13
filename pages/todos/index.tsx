import Link from 'next/link'

import TDHeader from "./../../components/TDHeader" 
import TDTitle from "./../../components/TDTitle"

import useStore from "./../../store/todos"
import { ROUTES } from "./../../utils/contants";

export default function Index() {

    const { todos, addTodo } = useStore();
    return (
        <>
            <TDHeader />
            <TDTitle> My List Task Detail </TDTitle>

            <div className="container mt-4 mx-auto ">  
                <div className="text-right mt-[10px]">
                    <Link href={ ROUTES.TODO_ADD }>
                        <button>
                            Add New Todos
                        </button>
                    </Link>
                </div>

                {   
                    todos.length == 0 && 
                    (<div className="text-center text-xl text-rose-500"> Congratulation! You have completed all task today! </div>)
                } 

                { 
                todos.length > 0 && 
                (
                <div className="mt-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th> No </th>
                                <th> Job </th> 
                                <th> Type </th> 
                                <th> Remark </th> 
                                <th> Created </th> 
                                <th> Action </th> 
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                todos.map( (item, index) => {
                                    return (
                                            <tr> 
                                                <td> { item.no } </td>
                                                <td> { item.job } </td>
                                                <td> <span className="bg-green-800 p-2 rounded-lg text-white"> { item.type } </span> </td>
                                                <td> { item.remark } </td>
                                                <td> { item.dueDate }  </td> 
                                                <td> 
                                                    <div className="flex space-x-2">
                                                        <span className="rounded-md p-2 bg-sky-500 text-white"> Add  </span>
                                                        <span className="rounded-md p-2 bg-yellow-500 text-white"> Edit  </span>
                                                        <span className="rounded-md p-2 bg-red-500 text-white"> Delete  </span>
                                                    </div>
                                                </td> 
                                            </tr> 
                                        )
                                    }) 
                            } 
                        </tbody>
                    </table>
                </div>
                )
                }
            </div>
        </>
    )
}