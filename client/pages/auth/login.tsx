import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Image from "next/image";

import OpenEye from "/public/icon/open-eye.svg";
import CloseEye from "/public/icon/close-eye.svg";
import useStore from "./../../store/login";

import { useRouter } from "next/router";
import { ROUTES } from "../../utils/contants";
import { ToastMessage } from "../../components/TDToastMessage";
import { signIn } from "next-auth/react";
import Link from "next/link";

const loginForm = () => {
  const { is_password, changeEye } = useStore();

  const router = useRouter();

  const [message, setMessage] = useState({
    isError: true,
    msg: "",
  });

  const handleAccessTodoPages = async () => {
    await router.push(ROUTES.TODO_LIST);
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
        LOGIN INTO TODO APPS
    </div>
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(2, 'Too Short!') 
          .max(30, "Must be 30 characters or less")
          .required("Username is Required"),
        password: Yup.string().required("Password is Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // console.log(values['username'])

        signIn("credentials", {
          redirect: false,
          username: values["username"],
          password: values["password"],
        })
          .then((result) => { 
            console.log('auth/login')
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
                msg: rel?.message,
              });
            }
          })
          .catch((error) => console.log(error));
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

              <div className="relative">
                <Field
                  name="password"
                  type={is_password ? "password" : "text"} // formik, up ko can value, ko can onchange
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
              <div className="error-message">
                <ErrorMessage name="password" />
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <button
                type="submit"
                className="bg-yellow-300 px-4 py-2 rounded-md text-[#00F] font-bold"
              >
                Login
              </button>
              <button type="button" className=" px-4 py-2 rounded-md text-[#00F] font-bold">
                <Link href="/auth/register">
                  I don't have account
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mx-auto mt-4">
          <ToastMessage
            message={message}
            setMessage={setMessage}
            afterSuccess={handleAccessTodoPages} // if login succeed will auto redirect
          />
        </div>
      </Form>
    </Formik>

    <div className="flex text-center mx-auto flex w-[1000px]">
      <table className="table">
        <thead>
          <tr>
            <th colSpan={2}> WHAT YOU CAN LEARN ON THIS PROJECT? </th>
          </tr>
          <tr>
            <th> Server </th>
            <th> Client </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> Use NestJS - <span className="required-star"> Moogoose </span>DB connect </td>
            <td> Use NextJS - <span className="required-star"> Zustand Management State </span> with API call</td>
          </tr>
          <tr>
            <td> NestJS - 2 Table  <span className="required-star">  Todos, User </span> => Create, Update, Delete, Edit Feature </td>
            <td> NextJS - UI with  <span className="required-star"> Add, Update, Delete, Show, Login, Logout </span> </td>
          </tr>
          <tr>
            <td>  <span className="required-star"> Pagination </span> with moogoose </td>
            <td> Add  <span className="required-star">  ToastMessage </span> Component</td>
          </tr>
          <tr>
            <td> Apply  <span className="required-star">  JWT Authentication </span> </td>
            <td> Apply  <span className="required-star"> NextJS next/auth </span></td>
          </tr>
          <tr>
            <td> <span className="required-star">Search with regex, pagination </span>on Server on mongoose query </td>
            <td> Apply <span className="required-star"> EnvConfig, Apply Formik, yup </span></td>
          </tr>
          <tr>
            <td> ApiSucceedResponse / throw new HttpException("Error", 404) </td>
            <td> CSS use <span className="required-star"> TailWindCSS </span> </td>
          </tr>
          <tr>
            <td> Use Moment Convert to DateTime (Server/Client) </td>
            <td> Use <span className="required-star">SVG icon from iconfinder </span> </td>
          </tr>
          <tr>
            <td> Know how to use <span className="required-star">@Body, @Param, @Query </span></td>
            <td> Use <span className="required-star">Axios </span> Make API Call </td>
          </tr>

          <tr>
            <td>  </td>
            <td> Use <span className="required-star">Yup Validation Select/Option Yup with Field </span>  <br/> 
            
              {'<Field name="type" as="select"> <option></option> </Field>'}
            </td>
          </tr>

          <tr>
            <td>  </td>
            <td> Use <span className="required-star">Yup Validation confirmPassword </span>    
                confirmPassword: Yup.string()
                  .required("Confirm password is Required")
                  .oneOf([Yup.ref("password"), null], "Confirm Password and Password mismatch")   
            </td>
          </tr>
        
          <tr>
            <td>  </td>
            <td> Understand how to call <span className="required-star">API with Get, Post (passing param) </span> ex: GET with params:  let url = todos/search?page=page&limit=limit` 
            </td>
          </tr>
        

         
        </tbody>
      </table>
    </div>
 
    
    </>
  );
};

export default loginForm;
