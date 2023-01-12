import Link from 'next/link'

export default function TDHeader() {
    return (
        <div className="bg-sky-500 p-[20px] w-full flex justify-between text-white">
            <div className="flex space-x-8">
                <div> 
                    <Link href="/"  > 
                        Home  
                    </Link> 
                </div>
                <div> 
                    <Link href="/"> 
                        Todo List  
                    </Link> 
                </div>
            </div>
            <div className="flex">
                <div> Welcome: abc</div>
            </div>
        </div>
    )
}