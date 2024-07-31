import {useSelector} from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined); 
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  

  //firebase storage
  //allow read;
  //allow write: if
  //request.resource.size < 3 * 1024 * 1024 &&
  //request.resource.contentType.matches('image/.*')
  useEffect(()=> {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file)=> {
    const storage =getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))
      },
      (error)=> {
        setFileUploadError(true);
      },
      ()=> {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) => {
          setFormData({...formData, avatar: downloadURL});
        })
      }
    );
  }
  return (
    <div className=' p-2 max-w-md mx-auto'> 
      <h1 className=' text-3xl font-semibold text-center my-2'>Profile</h1>

    <form className=' flex flex-col gap-2'>
      <input onChange={(e)=> setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
      <img onClick={()=> fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile' className=' rounded-full h-16 w-18 object-cover cursor-pointer self-center mt-2' />
      <p className=' text-sm self-center'>
        {fileUploadError ?
        (<span className=' text-red-700'>Error image upload(Image should be less than 3MB)</span>) :

        (filePerc > 0 && filePerc < 100 ?(
          <span className=' text-slate-700'>
            {`Uploading ${filePerc}%`}
          </span>)
          :
          (filePerc === 100 ? (
            <span className=' text-green-700'>Image successfully uploaded</span>)
            :
            ""
          )
        )
        }
      </p>

      <input type='text' placeholder='username' id='username' className=' border p-2 rounded-md' />  
      <input type='email' placeholder='email' id='email' className=' border p-2 rounded-md' />
      <input type='text' placeholder='password' id='password' className=' border p-2 rounded-md' />
      <button className=' bg-slate-600 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80'>update</button>

    </form>
    <div className=' flex justify-between mt-2'>
      <span className=' text-red-700 cursor-pointer'>Delete Account</span>
      <span className=' text-red-700 cursor-pointer'>Sign Out</span>

    </div>
    

    </div>

  
  )
}
