import loginImage from "../../assets/loginImage.jpg";
import Google from "../../assets/google.png";
import jukku from "../../assets/jukku.png";
import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { HiLockOpen } from "react-icons/hi";
import { HiLockClosed } from "react-icons/hi";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { ColorRing } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from "../../userSlice/userSlice";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const facebook = new FacebookAuthProvider();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");



  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handelEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handelPassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handelSignup = () => {
    if (!email) {
      setEmailError("email is required*");
    }else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        toast.warning("invalid email address*");
      }
    }

    if (!password) {
      setPasswordError("password is required*");
    } else {
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        toast.warning("invalid password*");
      }
    }

    if ( email && password && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ) {
      setLoading(false)
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
         
         if(auth.currentUser.emailVerified === true){
          dispatch(userLoginInfo(user.user))
          localStorage.setItem('userInfo',JSON.stringify(user.user));
          setLoading(true)
          toast.success("Login successful");
          setTimeout(()=>{
            navigate("/Home")
          },3000)
         }else{
          toast.warning("Please verified your email");
         }
          
        })
        .catch((error) => {
          const errorCode = error.code;

          if(errorCode.includes('auth/invalid-login-credentials')){
            toast.warning('Please Give Right Email & Password');
          };
        });
    }
  };

  const loginWithGoogle = () =>{
    
    signInWithPopup(auth, provider)
    .then(() => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      toast.success('Login Successful');
      setLoading(true)
      setTimeout(()=>{
        navigate("/Home")
      },3000)

    }).catch((error) => {
      const errorCode = error.code;
      toast.success(errorCode);
    });
    
  }
  const loginWithFaceBook = () =>{

    const auth = getAuth();
    signInWithPopup(auth, facebook)
    .then(() => {
      toast.success('Login Successful');
      setLoading(true)
      setTimeout(()=>{
        navigate("/Home")
      },3000)
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
    
  }

  const handelSignUp = ()=>{
    setLoading(true)
    setTimeout(()=>{
        navigate('/Registration')
    },3000)
  }
  const handelForgetPassword = ()=>{
    setLoading(true)
    setTimeout(()=>{
        navigate('/forgotPassword')
    },4000)
  }


  return (
    <div>
      <div className="flex justify-between max-w-[1440px] mx-auto">
        <div className="lg:w-1/2 w-full lg:flex lg:justify-end mt-[50px] p-3">
          <div className="lg:pr-[69px] lg:pl-7 md:pl-0 pl-0">
            <h1 className=" font-nunito font-bold lg:text-[35px] md:text-[30px] text-[30px] text-[#11175D]">
              Login to your account!
            </h1>
            
            <div className="flex gap-3">
              <div onClick={loginWithGoogle} className="flex justify-center items-center hover:border hover:border-blue-600 transition-all hover:shadow hover:shadow-blue-500/50 gap-3 w-[220px] border rounded-md mt-4 cursor-pointer p-3">
                <img className="h-[20px]" src={Google} alt="Google" />
                <p className="text-[#03014C] font-OpenSans font-semibold lg:text-base md:text-sm text-sm">
                  Login with Google
                </p>
              </div>
              <div onClick={loginWithFaceBook} className="flex justify-center items-center gap-3 w-[220px] border hover:border hover:border-blue-600 hover:shadow hover:shadow-blue-500/50 transition-all rounded-md mt-4 cursor-pointer p-3">
                <img className=" w-10" src={jukku} alt="Google" />
                <p className="text-[#03014C] font-OpenSans font-semibold lg:text-base md:text-sm text-sm">
                  Login with Facebook
                </p>
              </div>
            </div>
            
            <div className="mt-[62px] relative lg:p-0 md:p-3 p-3">
              <span className=" absolute top-[-16px]  bg-white text-[#11175D]/50 text-[13px] font-nunito font-semibold">
                Email Address
              </span>

              <input
                onChange={handelEmail}
                value={email}
                className="hover:border-b-2 hover:border-blue-500 transition-all text-[21px] font-nunito font-semibold text-[#11175D] py-[27px] lg:w-full pl-2 pr-8 md:w-full w-full border-b border-[#11175D]/50 outline-none h-4"
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
              
            </div>
            <div className="mt-[56px] relative lg:p-0 md:p-3 p-3">
              <span className=" absolute top-[-16px] bg-white text-[#11175D]/50 text-[13px] font-nunito font-semibold">
                Password
              </span>
              <input
                onChange={handelPassword}
                className="hover:border-b-2 hover:border-blue-500 text-[21px] transition-all font-nunito font-semibold text-[#11175D] py-[27px] pl-2 pr-8 lg:w-full md:w-full w-full border-b border-[#11175D]/50 outline-none h-4"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password..."
              />
              {showPassword ? (
                <p
                  onClick={() => setShowPassword(!showPassword)}
                  className=" absolute lg:top-4 md:top-8 top-8 cursor-pointer font-bold text-2xl lg:right-0 md:right-3 right-3 text-[#11175D]"
                >
                  <HiLockOpen></HiLockOpen>
                </p>
              ) : (
                <p
                  onClick={() => setShowPassword(!showPassword)}
                  className=" absolute lg:top-4 md:top-8 top-8 cursor-pointer font-bold text-2xl lg:right-0 md:right-3 right-3 text-[#11175D]"
                >
                  <HiLockClosed></HiLockClosed>
                </p>
              )}
              {passwordError && ( <p className="text-red-500 font-nunito font-bold capitalize"> {" "} {passwordError} {" "} </p> )}
            </div>
            <div className="mt-[51px] ">
              {
                loading ?
                <div className='absolute w-full h-full left-0 top-0 bg-black/25'>
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper absolute top-[50%] left-[50%]"
                    colors={['#0052FF', '#0052FF', '#0052FF', '#0052FF', '#0052FF']}
                  />
                </div>
                
                :
                <div></div>
              }
              <Link onClick={handelSignup} className="text-white rounded-md text-center hover:shadow-md hover:bg-white border hover:border-blue-600 transition-all hover:text-blue-600 lg:w-full md:w-full w-full py-[26px] inline-block font-nunito text-[21px] bg-[#5F35F5] font-medium">
                Login to Continue
              </Link>
            </div>

            

            <h4 className="text-[#03014C] mt-[35px] text-[14px] text-center font-OpenSans font-normal">
              Don’t have an account ?
              <Link
                onClick={handelSignUp}
                className=" cursor-pointer font-bold text-[#EA6C00] underline"
              >
                Sign Up
              </Link>
            </h4>
            <Link onClick={handelForgetPassword} className="text-center block mt-3 text-red-600 font-nunito font-bold capitalize border border-black/5 hover:bg-blue-500/5 cursor-pointer transition-all p-2 text-base mb-4">
              <>Forgotten Password</>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 lg:block md:hidden hidden">
          <img
            className="w-full h-screen object-cover "
            src={loginImage}
            alt="loginImage"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
