
export default function Login() {
    return ( 
        <div className="flex item-center">
            <div className="bg-sky-200 p-[10px] rounded-lg mx-auto w-md grid grid-cols-2 gap-4 mt-[100px]">
                
                <label className=" flex items-center text-right">Username: </label>
                <input name="username" className="p-2"></input>
            
                <label className=" flex items-center text-right">Password: </label>
                <input name="password" type="password" className="p-2"></input>
            
                <button className="bg-yellow-300 px-4 py-2 rounded-md text-[#00F] font-bold"> Login </button>
                <button className="bg-yellow-300 px-4 py-2 rounded-md text-[#00F] font-bold"> Register </button>
            </div> 
        </div>
    )
}