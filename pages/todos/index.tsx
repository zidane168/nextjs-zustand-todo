import TDHeader from "./../../components/TDHeader" 
import useStore from "./../../store/todos"

export default function Todos() {

    const { todos, addTodo } = useStore();
    return (
        <>
            <TDHeader />
            <div className="container mt-4 mx-auto "> 
                <div className="bg-sky-500 shadow-lg p-2 rounded-md text-white uppercase text-center">
                    My List Here 
                </div>

                <div className="text-right mt-[10px]">
                    <button className="bg-green-500 p-2 rounded-md text-white "> Add Todos Item </button> 
                </div>

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

                            { todos.length > 0 && todos.map( (item, index) => {
                                return (
                                    <tr> 
                                        <td> { item.no } </td>
                                        <td> { item.job } </td>
                                        <td> <span className="bg-green-800 p-2 rounded-lg text-white"> { item.type } </span> </td>
                                        <td> { item.remark } </td>
                                        <td> { item.date }  </td> 
                                        <td className=""> 
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
            </div>
        </>
    )
}