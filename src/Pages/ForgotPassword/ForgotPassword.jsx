import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const auth = getAuth()
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const handelEmail = (e) => {
        setEmail(e.target.value);
        setEmailError("");
    };

    const handelForgotPassword = () =>{

        if(!email) {
            setEmailError("email is required*");
        }else{
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                toast.warning("invalid email address*");
            }else{

                sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Password reset email sent!
                    // ..
                    toast.success('recovery password has been sent to your registered email');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    toast.warning(errorCode);
                });
            }
        }
    }

  return (
    <div>
        <div className="w-full h-screen bg-white flex justify-center items-center">
            <div className=" lg:w-full w-full flex justify-center items-center">
                <div className="bg-white lg:p-[100px] md:p-[100px] py-[60px] px-[60px] rounded-lg shadow-lg shadow-white/6">
                    <h1 className="font-Poppins text-2xl font-bold">
                        Forgot Password !
                    </h1>
                    <div>
                        <div className="mt-[62px] relative">
                            <span className=" absolute top-[-16px]  bg-white text-[#11175D]/50 text-[13px] font-nunito font-semibold">
                                Email Address
                            </span>

                            <input
                                onChange={handelEmail}
                                value={email}
                                className="text-[21px] font-nunito hover:border-b-2 hover:border-blue-500 transition-all font-semibold text-[#11175D] py-[27px] lg:w-[369px] md:w-full w-full border-b border-[#11175D]/50 outline-none h-4"
                                type="email"
                                placeholder="Enter Your Email..."
                            />

                            {emailError && (
                                <p className="text-red-500 font-nunito font-bold capitalize">
                                {emailError}
                                </p>
                            )}

                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark"
                            />
                            <div className="flex gap-4">
                                <Link onClick={handelForgotPassword} class="middle none mt-5 center rounded-lg bg-blue-600 py-3 px-6 font-nunito text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" data-ripple-light="true">
                                    Submit
                                </Link>
                                <Link to="/Login" class="middle none mt-5 center rounded-lg bg-blue-600 py-3 px-6 font-nunito text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" data-ripple-light="true">
                                    Back to home
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ForgotPassword;
