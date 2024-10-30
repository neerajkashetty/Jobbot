"use client";
import Cover from "../../components/Cover";

export default function Signin() {
  return (
    <div className="h-screen w-full flex flex-row-reverse">
      <div className="w-1/2 flex justify-center bg-[url('/images/background.jpg')]">
        <Cover />
      </div>
      <div className="h-full w-1/2 flex items-center justify-center bg-blue-50">
        <div className="flex flex-col items-center w-2/3 h-2/3 bg-white/10 justify-start ">
          <h1 className="p-2 text-3xl font-bold text-blue-500"> SignIn </h1>
          <div className="flex flex-col ">
            <LabelledInput
              label="Username"
              placeholder="username"
              type="string"
            />
            <LabelledInput
              label="Password"
              placeholder="password"
              type="1234"
            />
            <div className="flex relative flex-row gap-8 w-full top-8">
              <button className="bg-blue-200 rounded-full p-2 font-semibold text-blue-500">
                Signin
              </button>
              <a className="text-md underline text-blue-500 p-2">
                {" "}
                forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
}

function LabelledInput({ label, placeholder, type }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
