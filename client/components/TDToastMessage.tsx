import React, { useEffect } from "react";
import { Info, infoTypes } from "./TDInfo";

export enum msgVariants {
  NORMAL,
  TRANSPARENT,
}
interface IToastMessageProps {
  message: {
    isError: boolean;
    msg: string;
  };
  setMessage: Function;
  afterSuccess?: Function;
  variant?: msgVariants;
}

export const ToastMessage = ({
  message,
  setMessage,
  afterSuccess,
  variant = msgVariants.NORMAL,
}: IToastMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (message.isError === false && message.msg) {
        afterSuccess && afterSuccess();
      }
      setMessage({ isError: false, msg: "" });
    }, 2000);
    return () => clearTimeout(timer);
  }, [message]);
  return (
    <div
      className={`text-left flex justify-start items-center 
      ${ message.msg  ? "h-16 px-3 my-0 rounded-sm"   : "h-0 p-0 mt-0" } 
      ${ message.isError  ? "text-red bg-red-300"  : "text-green-leaf bg-green-300" }`}
      style={{ transition: "height .3s linear" }}
    >
      {message?.msg && (
        <>
          <Info
            type={message?.isError ? infoTypes.INFO : infoTypes.CHECKED}
            className="mr-0 min-w-content"
          />
          <p className=" text-white uppercase font-bold">{message?.msg}</p>
        </>
      )}
    </div>
  );
};