import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Image from "next/image";
 
import useStore from "./../../store/login";

import { useRouter } from "next/router";
import { ROUTES } from "../../utils/contants";
import { ToastMessage } from "../../components/TDToastMessage"; 
import Link from "next/link";
import { registerMember } from "../api/api.member";

const loginForm = () => { 

  const router = useRouter();

  const [message, setMessage] = useState({
    isError: true,
    msg: "",
  });

  const handleAccessLoginPage = async () => {
    await router.push(ROUTES.LOGIN);
  };

  // // call login when session change
  // useEffect(() => {
  //   session?.accessToken && handleAccessTodoPages()
  // }, [session])

  return (

    <> 
    <h3 className="font-bold text-center mt-4">
        Welcome to Todo List management by <a href="https://learn-tech-tips.blogspot.com" className="text-blue-600"> Learn Tech Tips - Zidane </a>        
    </h3> 
    <h6 className="font-bold mt-2 text-center">
      huuvi168@gmail.com 
    </h6> 
    <div className="text-center bg-orange-700 text-white p-4">
        REGISTER ACCOUNT
    </div>
    <Formik
      initialValues={{ username: "", password: "", confirmPassword: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(2, 'Too Short!') 
          .max(30, "Must be 30 characters or less")
          .required("Username is Required"),
        password: Yup.string().required("Password is Required"),
        confirmPassword: Yup.string()
            .required("Confirm password is Required")
            .oneOf([Yup.ref("password"), null], "Confirm Password and Password mismatch")
      })}
      onSubmit={ async(values, { setSubmitting }) => { 

        let result = await registerMember(values['username'], values['password']);
        let isError = false;
        if (result?.statusCode !== 200) {
          isError = true; 
        } 
     
        setMessage({
          isError: isError,
          msg: result.message 
        }) 
      }}
    >
      <Form>
        <div className="flex item-center">
          <div className="bg-sky-200 p-[10px] rounded-lg mx-auto w-[500px]  mt-[50px]"> 
            <div>
              <label
                htmlFor="username"
                className="flex items-center text-right font-bold uppercase text-sky-600"
              >
                Username  <span className="required-star"> (*) </span>
              </label>
              <Field name="username" type="text" />
              <div className="error-message">
                <ErrorMessage name="username" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="flex items-center text-right font-bold uppercase text-sky-600"
              >
                Password  <span className="required-star"> (*) </span>
              </label>

              <div>
                <Field
                  name="password"
                  type="password"
                /> 
              </div>
              <div className="error-message">
                <ErrorMessage name="password" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="flex items-center text-right font-bold uppercase text-sky-600"
              >
                Confirm Password  <span className="required-star"> (*) </span>
              </label>

              <div>
                <Field
                  name="confirmPassword"
                  type="password"
                /> 
              </div>
              <div className="error-message">
                <ErrorMessage name="confirmPassword" />
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <button
                type="submit"
                className="bg-yellow-300 px-4 py-2 rounded-md text-[#00F] font-bold"
              >
                Register
              </button> 

              <button
                type="button"
                className="px-4 py-2 rounded-md text-[#00F] font-bold"
              >
                <Link href="/auth/login">
                    I have account
                </Link>
              </button> 
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mx-auto mt-4">
          <ToastMessage
            message={message}
            setMessage={setMessage}
            afterSuccess={handleAccessLoginPage} // if login succeed will auto redirect
          />
        </div>
      </Form>
    </Formik>
 
    </>
  );
};

export default loginForm;
