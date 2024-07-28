import { Link} from 'react-router-dom';

export default function Signup() {
  return (
    <div className=' p-3 max-w-md mx-auto'>
      <h1 className=' text-3xl text-center font-semibold my-4'>Sign Up</h1>

      <form className=' flex flex-col gap-3'>
        <input type='text' placeholder='User Name' className=' border p-2 rounded-lg' id='username' />
        <input type='email' placeholder='Email' className=' border p-2 rounded-lg' id='email' />
        <input type='password' placeholder='Password' className=' border p-2 rounded-lg' id='password' />

        <button  className=' bg-slate-800 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>

      </form>
      <div className=' flex gap-2 mt-4'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className=' text-blue-700'>Sign In</span>
        </Link>

      </div>
    </div>
  )
}
