import { useEffect, useRef } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

interface User {
  user: string | null;
  password: string | null;
}

export default function LoginFunction() {
  const ref = useRef<HTMLInputElement>(null);

  const {register, handleSubmit} = useForm<User>();
  const navigate = useNavigate();

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const onSubmit = (data: User) => {
    if(data.user === "Krish" && data.password === "password"){
        document.cookie = "token=xyz; path=/; max-age=3600";
        navigate("", {replace: true})
    }else{
        alert("Wrong Password")
    }
  }

  return (
    <div className="flex items-center justify-center bg-white h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="border grid grid-cols-1 rounded gap-4 p-4 shadow-md py-6">
        <center>
          <h2 className="font-semibold">Login</h2>
        </center>
        <input
          type="text"
        //   ref={ref}
          required
          {...register("user", {required: true})}
          className="border w-100 rounded p-2"
          placeholder="Enter Username"
        />
        <input
          type="password"
          required
          className="border w-100 rounded p-2"
          placeholder="Enter Password"
          {...register("password", {required: true})}
        />
        <button
          className="border rounded w-50 p-2 bg-blue-300 text-white hover:bg-blue-500 hover:border hover:border-blue-700 duration-300"
          onClick={() => handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
}
