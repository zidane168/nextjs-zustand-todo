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

    <hr className="mt-4" /> 

    <div className="flex text-center mx-auto flex w-[1000px] mt-4">
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
        <tbody className="text-left">
          <tr>
            <td> Use NestJS - <span className="required-star"> Moogoose </span>DB connect 
              <ul className="ul-guideline-style"> 
                <li>/src/app.module.ts </li>
                <li>  MongooseModule.forRoot 'mongodb+srv://zidane:xxx@mmm.uuu.zzz.net/yyy', </li>
              </ul>
            
            </td>
            <td> Use NextJS - <span className="required-star"> Zustand Management State </span> with API call
              <ul className="ul-guideline-style"> 
                <li> /store/todos/index.tsx </li>
                <li> /pages/todos/index.tsx </li>
                <li> const total, todos, types, addTodo, removeTodo, markCompleteTodo, fetchTodos = useTodoStore(); </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td> NestJS - 2 Table  <span className="required-star">  Todos, User </span> Create, Update, Delete, Edit Feature 
              <ul className="ul-guideline-style"> 
                <li> /src/users/dto </li>
                <li> /src/users/interface </li>
                <li> /src/users/schemas </li>
                <li> /src/users/ </li>
              </ul>

            </td>
            <td> NextJS - UI with  <span className="required-star"> Add, Update, Delete, Show, Login, Logout, Register </span> </td>
          </tr>
          <tr>
            <td>  <span className="required-star"> Pagination </span> with moogoose 
              <ul className="ul-guideline-style"> 
                <li> /src/todos/todos.controller.ts </li>
                <li> /src/todos/todos.service.ts, public sync search , return result here </li>
              </ul>
            </td>

            <td> Add  <span className="required-star">  ToastMessage </span> Component
              <ul className="ul-guideline-style"> 
                <li> /components/TDToastMessage.tsx </li>
                <li> /pages/auth/login.tsx </li>
                <li> const [message, setMessage] = useState( ... ) </li>

                <li> ToastMessage Component
                  message= 
                  setMessage= 
                  afterSuccess= 
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td> Apply  <span className="required-star">  JWT Authentication </span> 
              <ul className="ul-guideline-style"> 
                <li> /src/auth/guard </li>
                <li> /src/auth/ </li>
                <li> @UseGuards(JwtAuthGuard) </li>
                <li> @Request() req: any, JWTAuthGuard will return req.user </li>
                
              </ul>
            </td>

            <td> Apply  <span className="required-star"> NextJS next/auth </span>
              <ul className="ul-guideline-style"> 
                <li> /pages/auth/login.tsx , call signIn("credentials") ... </li>
                <li> /pages/api/auth/...nextauth.ts </li>
                <li> call loginMember function , /pages/api/api.member.ts</li>
                <li> /pages/_app.tsx, Component.auth  </li>
               
              </ul>
            
            </td>
          </tr>
          <tr>
            <td> <span className="required-star">Search with regex, pagination </span>on Server on mongoose query 
              <ul className="ul-guideline-style"> 
                <li> /src/todos/todo.service.ts </li>
                <li> conditions ...conditions, job:  regex: '.*'  job  '.*' </li>
              </ul> 
            </td>
            <td> Apply <span className="required-star"> EnvConfig,  </span>
              <ul className="ul-guideline-style"> 
                <li> /ultis/config.tsx </li>
                <li> import envConfig from './../../utils/config';  </li>
                <li> api.member.ts </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td> ApiSucceedResponse / throw new HttpException("Error", 404) </td>
            <td> CSS use <span className="required-star"> TailWindCSS </span> 
              <ul className="ul-guideline-style">
                <li> styles/style.css</li>
                <li> pages/_app.tsx </li>
              </ul>
            </td>
            
          </tr>
          <tr>
            <td> Use Moment Convert to DateTime (Server/Client) 
              <ul className="ul-guideline-style">
                <li> import * as moment from 'moment'; </li>
                <li> todo.createDate = moment().toDate(); </li>
              </ul> 
            </td>
            <td> Use <span className="required-star">SVG icon from iconfinder </span> 
            
              <ul className="ul-guideline-style">  
                <li> /public/icon/open-eye.svg </li>
                <li> use: import OpenEye from "/public/icon/open-eye.svg"; </li>
                <li> <span> Use Image </span>
                  <span>
                    <Image
                      src={ OpenEye } 
                      alt={ OpenEye }
                    />
                  </span>

                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td> Understand how and when to use <span className="required-star">@Body, @Param, @Query </span>, get data from server side 
              <ul className="ul-guideline-style">
                <li> Check todos.controller.ts, todos.services.ts </li>
              </ul> 
            </td>
            <td> Use <span className="required-star">Axios </span> Make API Call </td>
          </tr>

          <tr>
            <td> Learn <span className="required-star">NestJS structure </span>  </td> 
            <td> Learn <span className="required-star">NextJS structure </span> and build component  </td>
          </tr>

          <tr>
            <td> Add <span className="required-star"> Dockerfile, docker-compose </span> for server / client  <br />
             docker-compose up --build -d 
            </td>
            <td> Use <span className="required-star">Yup Validation Select/Option Yup with Field </span>  <br/> 
            
              {'<Field name="type" as="select"> <option></option> </Field>'}
            </td>
          </tr>

          <tr>
            <td>  </td>
            <td> Use <span className="required-star">Yup Validation confirmPassword </span>    

                confirmPassword: Yup.string() <br />
                  .required("Confirm password is Required") <br />
                  .oneOf([Yup.ref("password"), null], "Confirm Password and Password mismatch")    <br />

                <ul className="ul-guideline-style">
                  <li> /pages/auth/login.tsx </li>
                </ul>
            </td>
          </tr>
        
          <tr>
            <td>  </td>
            <td> Understand how to call <span className="required-star">API with Get, Post (passing param) </span> ex: GET with params:  let url = todos/search?page=page&limit=limit`

              <ul className="ul-guideline-style">
                <li> /pages/api/api.member.ts </li>
                <li> /pages/api/api.todo.ts - apiSearchTodos</li>
              </ul> 
            </td>
          </tr>

          
          <tr>
            <td>  </td>
            <td> Understand how to use <span className="required-star">Axios - add Authorization Bearer Token </span> 
            "axiosClient.defaults.headers.common = 'Authorization': bearer accessToken" <br />
              <ul className="ul-guideline-style">
                  <li> /ultis/axiosClient.ts </li>
                  <li> /pages/api/api.member.ts </li>
                  <li> /pages/api/api.todo.ts</li>
                </ul> 
            </td>
          </tr>

          <tr>
            <td>  </td>
            <td> Understand how to apply <span className="required-star"> React Pagination Component</span>, how to style combine with <span className="required-star"> Zustand </span> state management  <br />
              <ul className="ul-guideline-style">
                <li> /components/TDPagination.tsx </li>
                <li> /pages/todos/index.tsx  </li>
                <li> use PaginatedItems components </li>
              </ul> 
            </td>
          </tr> 

          <tr>
            <td>  </td>
            <td> Understand how to apply <span className="required-star"> Multi language</span> <br/>
              <ul className="ul-guideline-style">
                <li> /hooks/useTrans.ts  </li>
                <li> next.config.ts  </li>
                <li> /public/lang/en.js  </li>
                <li> /public/lang/zho.js   </li>
                <li> /components/TDHeader.tsx </li>
                <li> /components/TDPagination.tsx </li> 
              </ul>
            </td>
          </tr> 
          <tr>
            <td>  </td>
            <td>   Apply <span className="required-star"> Formik </span> <br/>
              <ul className="ul-guideline-style">
                 <li> /pages/auth/login.tsx </li>
                 <li> /pages/auth/register.tsx </li>
                 <li> /pages/todos/index.tsx </li>

                 <li> Use: Formik - initialValues, validationSchema, onSubmit </li>
                 <li> Use: Form inside Formik Field, ErrorMessage</li>
                 
              </ul>
            </td>
          </tr> 

        
        </tbody>
      </table>
    </div>
     
    </>
  );
};

export default loginForm;
