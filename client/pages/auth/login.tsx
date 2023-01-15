import Image from 'next/image'

import OpenEye from "/public/icon/open-eye.svg" 
import CloseEye from "/public/icon/close-eye.svg"
import useStore from "./../../store/login"

export default function Login() {

    const { is_password, changeEye } = useStore(); 
    return ( 
        <div className="flex item-center">
            <div className="bg-sky-200 p-[10px] rounded-lg mx-auto w-[500px]  mt-[100px]">
                
                <div>
                    <label className="flex items-center text-right font-bold uppercase text-sky-600">Username: </label>
                    <input name="username" className="p-2 w-full rounded-full" />
                </div>
            
                <div className="mt-4 relative">
                    <label className=" flex items-center text-right font-bold uppercase text-sky-600">Password: </label>
                    <input name="password" type={ is_password ? "password" : "text"} className="p-2 w-full rounded-full" /> 
                    <span className="absolute right-[10px] bottom-[10px] hover:cursor-pointer" onClick={changeEye} > 
                        <Image src={ is_password ? CloseEye : OpenEye } alt={ is_password ? CloseEye : OpenEye } /> 
                    </span>
                </div>
            
                <div className="flex justify-center space-x-4 mt-8">
                    <button className="bg-yellow-300 px-4 py-2 rounded-md text-[#00F] font-bold"> Login </button>
                    <button className="bg-yellow-300 px-4 py-2 rounded-md text-[#00F] font-bold"> Register </button>
                </div>
            </div> 
        </div>
    )
}