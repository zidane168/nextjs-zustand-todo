import Link from 'next/link'
import { ROUTES } from './../utils/contants'


interface IHeader {
    username: string;
}

export default function TDHeader({ username } : IHeader) {
    return (
        <div className="bg-sky-500 p-[20px] w-full flex justify-between text-white">
            <div className="flex space-x-8">
                <div>  
                    <Link href={ ROUTES.HOME }> 
                        Home 
                    </Link> 
                </div>
                <div> 
                    <Link href={ ROUTES.TODO_LIST }>  
                        Todo List   
                    </Link> 
                </div>
            </div>
            <div className="flex">
                <div> Welcome: { username ? username : '<cannot get name>' }</div>
            </div>
        </div>
    )
}