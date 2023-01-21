import Link from 'next/link'
import { ROUTES } from './../utils/contants'

export default function TDHeader() {
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
                <div> Welcome: zidane - Learn Tech Tips</div>
            </div>
        </div>
    )
}