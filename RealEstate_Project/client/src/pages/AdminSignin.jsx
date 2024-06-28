
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/admin/adminSlice';
import { useNavigate } from 'react-router-dom';

export default function AdminSignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/admin/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      history('/admin/dashboard'); // Use navigate function to redirect to admin dashboard
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Admin Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder="Email" className='border p-3 rounded-lg' id="email" onChange={handleChange} />
        <input type="password" placeholder="Password" className='border p-3 rounded-lg' id="password" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading..' : "Sign In "}
        </button>
      </form>
      {error && (
        <strong className='font-bold text-red-600'>{error}</strong>
      )}
    </div>
  )
}
