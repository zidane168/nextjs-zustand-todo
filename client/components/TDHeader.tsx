import Link from 'next/link'
import { useEffect, useState } from 'react';
import { ROUTES } from './../utils/contants'
import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import useTrans from '../hooks/useTrans';

interface IHeader {
    username: string;
}

export default function TDHeader({ username } : IHeader) {

    const { language, asPath, locale } = useTrans()

    let langEn = 'text-white'
    let langZho = 'text-white'
    if (locale?.indexOf("zho") === 0) {
        langZho = "text-white border-b-2 border-white"
    } else {
        langEn = "text-white border-b-2 border-white"
    }

    const [ openMenu, setOpenMenu ] = useState(false);  
 
 
    const handleClick = () => {        
        const child = document.getElementById('welcome-child');
       
        if (!openMenu) {
            child?.classList.remove("hidden")
            child?.classList.add("block")
        } else {
            child?.classList.add("hidden")
            child?.classList.remove("block")
        } 

        setOpenMenu(!openMenu)
    }

    return (
        <div className="bg-sky-500 p-[20px] w-full flex justify-between text-white">
            <div className="flex space-x-8">
                <div>  
                    <Link href={ ROUTES.HOME }> 
                        { language.home.content }
                    </Link> 
                </div>
                <div> 
                    <Link href={ ROUTES.TODO_LIST }>  
                        Todo List   
                    </Link> 
                </div>
            </div>
            <div className="flex space-x-2">
                <ul className='flex space-x-2'> 
                    <li> 
                        <Link href={ asPath } locale="zho"  className={ langZho }>    中文   </Link>
                    </li>
                    <li> 
                        <Link href={ asPath } locale="en" className={ langEn }> English  </Link>
                    </li>
                </ul>
                <span className="px-2"> | </span>
                <ul id="welcome"> 
                    <li  className='cursor-pointer relative' onClick={ handleClick }> { language.home.greeting } { username ? username : '<cannot get name>' } 
                        <ul id="welcome-child" className="hidden absolute bg-orange-400 px-4 py-2 text-white" >
                            <li onClick={ () => signOut() }> Logout </li>
                        </ul>
                    </li>
                </ul>
                
               
            </div>
            
        </div>
    )
}