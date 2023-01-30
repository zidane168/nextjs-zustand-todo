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

const loginForm = () => {
  const { is_password, changeEye } = useStore();

  const router = useRouter();

  const [message, setMessage] = useState({
    isError: true,
    msg: "",
  });

  const handleLoggedIn = async () => {
    await router.push(ROUTES.TODO_LIST);
  };

  // // call login when session change
  // useEffect(() => {
  //   session?.accessToken && handleLoggedIn()
  // }, [session])

  return (
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
            console.log(result);
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
      }}
    >
      <Form>
        <div className="flex item-center">
          <div className="bg-sky-200 p-[10px] rounded-lg mx-auto w-[500px]  mt-[100px]">
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
              <button className="bg-yellow-300 px-4 py-2 rounded-md text-[#00F] font-bold">
                Register
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mx-auto mt-4">
          <ToastMessage
            message={message}
            setMessage={setMessage}
            afterSuccess={handleLoggedIn} // if login succeed will auto redirect
          />
        </div>
      </Form>
    </Formik>
  );
};

export default loginForm;
