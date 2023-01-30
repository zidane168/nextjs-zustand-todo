import Image from "next/image";

import OpenEye from "/public/icon/open-eye.svg";
import CloseEye from "/public/icon/close-eye.svg";
import useStore from "./../../store/login";

import * as React from "react";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect  } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/contants";
import { ToastMessage } from "../../components/TDToastMessage";
 

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState({
    isError: true,
    msg: "",
  });

  const router = useRouter();

  const { is_password, changeEye } = useStore();

  // get session , push into data: and assign to session variable
  const { data: session, status } = useSession()

  const handleLoginWithCredential = async (e) => {
    e?.preventDefault();

    // call api/auth/[...nextauth].ts
    signIn("credentials", {     
      redirect: false,
      username: username,
      password: password,
    })
      .then((result) => { 
        console.log(result)
        if (!result.error) {
          setMessage({
            isError: false,
            msg: "Success",
          });

        } else {
          let rel = JSON.parse(result.error);
          setMessage({
            isError: true,
            msg: rel?.message ?? "",
          });
        }
      })
      .catch((error) => console.log(error));
  };


  const handleLoggedIn = async() => {
    await router.push(ROUTES.TODO_LIST)
  };


  // // call login when session change
  // useEffect(() => {
  //   session?.accessToken && handleLoggedIn()
  // }, [session])

  return (

    <> 
    <form  onSubmit={handleLoginWithCredential} >
      <div className="flex item-center">
        <div className="bg-sky-200 p-[10px] rounded-lg mx-auto w-[500px]  mt-[100px]">
          <div>
            <label className="flex items-center text-right font-bold uppercase text-sky-600">
              Username:{" "}
            </label>
            <input
              name="username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              className="p-2 w-full rounded-full"
            />
          </div>

          <div className="mt-4 relative">
            <label className=" flex items-center text-right font-bold uppercase text-sky-600">
              Password:{" "}
            </label>
            <input
              name="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              type={is_password ? "password" : "text"}
              className="p-2 w-full rounded-full"
            />
            <span
              className="absolute right-[10px] bottom-[10px] hover:cursor-pointer"
              onClick={changeEye}
            >
              <Image
                src={is_password ? CloseEye : OpenEye}
                alt={is_password ? CloseEye : OpenEye}
              />
            </span>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <button className="bg-yellow-300 px-4 py-2 rounded-md text-[#00F] font-bold"> 
              Login 
            </button>
            <button className="bg-yellow-300 px-4 py-2 rounded-md text-[#00F] font-bold"> 
              Register 
            </button>
          </div>
        </div>
      </div>
    </form>

    <div className="flex justify-center space-x-4 mx-auto mt-4">
        <ToastMessage message={ message }
            setMessage={ setMessage }
            afterSuccess={ handleLoggedIn } // if login succeed will auto redirect
        /> 
    </div>

    </>
  );
}
