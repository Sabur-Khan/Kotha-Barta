import { Link, useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { userLoginInfo } from '../../userSlice/userSlice';
import { update, ref as dref, getDatabase } from 'firebase/database';

const ChooseProfile = () => {

    const userData = useSelector((state)=> state.user.userInfo);
    const dispatch = useDispatch()
    const auth = getAuth();
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();
    const db = getDatabase();
    const navigate = useNavigate();

    const onPhotoChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };
    const getImageCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
          setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        }
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
            const storage = getStorage();
            const storageRef = ref(storage, userData.uid);

            // Data URL string
            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                getDownloadURL(storageRef).then((downloadURL) => {
                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL
                      }).then(()=>{
                            update(dref(db, "users/" + userData.uid),{
                                img: downloadURL
                            });
                          
                            dispatch(userLoginInfo({...userData,photoURL:downloadURL}))
                            localStorage.setItem("userInfo",JSON.stringify({...userData,photoURL:downloadURL}) )
                            navigate("/Home")
                        })
                });
            });
        }
    };



  return (
    <div>
        <div className='w-full lg:py-8 md:py-5 py-5 lg:px-1 md:px-2 px-2 bg-blue-600'>
            <div className='lg:w-1/2 md:w-full w-full rounded-lg shadow-lg lg:p-10 md:p-2 p-2 bg-white mx-auto'>
                <p className='text-center font-nunito font-bold text-3xl'>Choose profile picture</p>
                <div className='flex justify-center mt-10 mb-5'>
                    <input onChange={onPhotoChange} className='bg-transparent text-black border font-nunito cursor-pointer' type="file" name="" id="" />
                </div>
                <div className='border bg-slate-400/5 w-full'>

                    <Cropper
                        ref={cropperRef}
                        style={{ height: 300, width: "100%" }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        guides={true}
                    />
                </div>
                <div className='flex'>
                    <div className='mt-5 border lg:py-2 py-1 lg:w-1/2 w-full overflow-hidden'>
                        <button className=' lg:ml-3 ml-1 font-nunito font-bold text-black text-lg mb-5 p-2 border rounded-lg hover:bg-blue-700 hover:text-white' onClick={getImageCropData}>
                            Crop Image
                        </button>
                        <img className='lg:p-5 p-2' src={cropData}/>
                    </div>

                    <div className='mt-5 border lg:p-3 p-1 w-full overflow-hidden'>
                        <div>
                            <h3 className=' font-nunito font-bold text-lg text-black mb-5'>Preview</h3>
                        </div>
                        <div className='overflow-hidden w-full lg:py-3 py-1'>
                            <div className="img-preview h-[300px] w-[400px] block" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center gap-10 mt-10'> 
                    <Link onClick={getCropData} className='border py-3 px-5 bg-blue-600 rounded-lg text-white font-nunito hover:bg-transparent hover:text-blue-600 shadow-lg font-semibold'>Upload</Link>
                    <Link to="/Home" className='border py-3 px-5 bg-red-600 rounded-lg text-white font-nunito hover:bg-transparent hover:text-blue-600 shadow-lg font-semibold'>Cancel</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChooseProfile