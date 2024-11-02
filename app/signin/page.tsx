"use client";
import Cover from "../../components/Cover";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(username, "ghjghjg");

  const router = useRouter();
  const letsgo = async () => {
    const response = await axios.post("http://localhost:3000/api/user", {
      username,
      password,
    });

    router.push("/resume");
    console.log("dskjhaksj");

    return response.data;
  };
  return (
    <div className="h-screen w-full flex flex-row-reverse bg-[url('/images/background.jpg')]">
      <div className="w-1/2 flex justify-center ">
        <Cover />
      </div>
      <div className="h-full w-1/2 flex items-center justify-center ">
        <div className="flex flex-col  items-center w-2/3 h-2/3 bg-white/10 justify-start ">
          <h1 className="p-2 text-3xl font-bold text-blue-500"> SignIn </h1>
          <div className="flex flex-col ">
            <LabelledInput
              label="Username"
              placeholder="username"
              type="string"
              onChange={(e) => setUsername(e.target.value)}
            />
            <LabelledInput
              label="Password"
              placeholder="password"
              type="1234"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex relative flex-row gap-8 w-full top-8">
              <button
                onClick={letsgo}
                className="bg-blue-200 rounded-full p-2 font-semibold text-blue-500"
              >
                Signin
              </button>
              <a className="text-md underline text-blue-500 p-2">
                {" "}
                forgot Password?
              </a>
            </div>
          </div>
          <div className="relative top-14 bg-blue-200 p-3">
            {" "}
            <button
              onClick={() => signIn("google")}
              className="font-bold text-blue-600 "
            >
              Sign in with google
            </button>
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
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-white font-semibold pt-4">
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
}
