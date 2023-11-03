import { useState } from 'react';
import regiRegistrationimg from '../../assets/registration.jpg'
import {HiLockClosed} from 'react-icons/hi'
import {HiLockOpen} from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';



function Registration() {
    const navigate = useNavigate()
    const auth = getAuth();
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const [errorEmail, setErrorEmail] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const handelEmail = (e) =>{
        setEmail(e.target.value);
        setErrorEmail('')
    }
    const handelName = (e) =>{
        setName(e.target.value);
        setErrorName('')
    }
    const handelPassword = (e) =>{
        setPassword(e.target.value);
        setErrorPassword('')
    }
    
    const handelSubmit = () =>{
        if(!email){
            setErrorEmail('email is required*')
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                setErrorEmail('please enter your valid email*')
            }
        }

        if(!name){
            setErrorName('name is required*')
        }else{
            if(!/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(name)){
                setErrorName('please enter your valid name*')
            }
        }

        if(!password){
            setErrorPassword('password is required*')
        }else{
            if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
                setErrorPassword('please enter your valid password*')
            }
        }

        if(email && password && (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            setLoading(false)
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                sendEmailVerification(auth.currentUser)
                 
                .then(() => {
                    setLoading(true)
                    // setSuccess('Registration Sucessful Please Verify Your Email!');
                    toast.success('Registration Done Please Verify Your Email!')
                    setEmail('');
                    setName('');
                    setPassword('');
                    setTimeout(()=>{
                        navigate('/Login')
                    },3000)
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                if(errorCode.includes('auth/email-already-in-use')){
                    toast.success('This email is alredy in use');
                };
            });
                
        }
    }

    const handelSignin = ()=>{
        setLoading(true)
        setTimeout(()=>{
            navigate('/Login')
        },4000)
    }




    return (
        <div>
            
            <div className='lg:flex md:flex-row lg:justify-between lg:p-0 md:p-5 p-5 max-w-[1440px] mx-auto'>
                <div className='lg:w-1/2  lg:flex lg:justify-end lg:mt-[60px]'>
                    <div className='lg:pr-[69px] md:pr-0'>
                        <h1 className=' font-nunito font-bold text-[35px] text-[#11175D]'>Get started with easily register</h1>
                        <p className='text-black/40 font-nunito text-[21px] font-normal'>Free register and you can enjoy it</p>
                        <small className=' text-orange-700 font-nunito font-bold text-lg'>{success}</small>
                        <ToastContainer 
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />

                        
                        <div className='mt-[62px] relative'>
                            <span className=' absolute top-[-13px] left-[15px] bg-white px-2 text-[#11175D] text-base font-nunito font-semibold'>Email Address</span>
                            <input onChange={handelEmail} value={email} className='text-[21px] hover:border-b-8 transition-all hover:border-blue-500 rounded-md font-nunito font-semibold text-[#11175D] py-[27px] px-[20px] lg:w-[369px] md:w-full w-full border border-[#11175D]/50 outline-none h-[82px]' type="email" placeholder='Enter Your Email...' />
                            {
                                errorEmail &&
                                <p className='text-red-500 font-nunito font-bold capitalize'>{errorEmail}</p>
                    
                            }
                        </div>
                        <div className='mt-[56px] relative'>
                            <span className=' absolute top-[-13px] left-[15px] bg-white px-2 text-[#11175D] text-base font-nunito font-semibold'>Full Name</span>
                            <input onChange={handelName} value={name} className='text-[21px] hover:border-b-8 transition-all hover:border-blue-500 rounded-md font-nunito font-semibold text-[#11175D] py-[27px] px-[20px] lg:w-[369px] md:w-full w-full border border-[#11175D]/50 outline-none h-[82px]' type='text' placeholder='Enter your name...' />
                            {
                                errorName &&
                                <p className='text-red-500 font-nunito font-bold capitalize'>{errorName}</p>
                            }
                        </div>
                        <div className='mt-[56px] relative'>
                            <span className=' absolute top-[-13px] left-[15px] bg-white px-2 text-[#11175D] text-base font-nunito font-semibold'>Password</span>
                            <input onChange={handelPassword} value={password} className='text-[21px] hover:border-b-8 transition-all hover:border-blue-500 rounded-md font-nunito font-semibold text-[#11175D] py-[27px] px-[20px] lg:w-[369px] md:w-full w-full border border-[#11175D]/50 outline-none h-[82px]' type={showPassword? 'text':'password'} placeholder='Enter your password' />
                            {
                                showPassword?
                                <p onClick={() => setShowPassword (!showPassword)} className=' absolute top-8 cursor-pointer font-bold text-2xl lg:right-40 right-5 text-[#11175D]'><HiLockOpen></HiLockOpen></p>
                                :
                                <p onClick={() => setShowPassword (!showPassword)} className=' absolute top-8 cursor-pointer font-bold text-2xl lg:right-40 right-5 text-[#11175D]'><HiLockClosed></HiLockClosed></p>

                            }

                            {
                                errorPassword &&
                                <p className='text-red-500 font-nunito font-bold capitalize'>{errorPassword}</p>
                            }
                        </div>
                        <div className='mt-[51px]'>
                            
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
                            <a onClick={handelSubmit} className='text-white cursor-pointer hover:shadow-md hover:bg-white border hover:border-blue-600 transition-all hover:text-blue-600 rounded-md text-center lg:w-[369px] md:w-full w-full  py-[26px] block font-nunito text-[21px] bg-[#5F35F5] font-medium'>
                                Sign Up
                            </a>

                        
                            
                        </div>
                        <h4 className='text-[#03014C] mt-[10px] text-[14px] font-OpenSans font-normal mb-2'>Already  have an account ? <Link onClick={handelSignin} className='cursor-pointer font-bold text-[#EA6C00] underline'>Sign In</Link></h4>
                        <ul>
                            <span className='text-sm font-bold text-slate-400'>Password Requirement*</span>
                            <li className=' text-[12px] list-disc text-blue-400'>Uparcase latter, Small latter, Number</li>
                            <li className=' text-[12px] list-disc text-blue-400'>Minimum Six to Eight Characters</li>
                        </ul>
                    </div>
                </div>
                <div className='lg:w-1/2 lg:block md:hidden hidden'>
                    <img className='w-full h-screen object-cover' src={regiRegistrationimg} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Registration