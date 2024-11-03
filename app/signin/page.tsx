"use client";
import Cover from "../../components/Cover";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  return (
    <div className="h-screen w-full md:flex md:flex-row-reverse items-center justify-center bg-[url('/images/background.jpg')]">
      <div className="md:w-1/2 md:flex justify-center absolute md:relative invisible md:visible ">
        <Cover />
      </div>
      <div className="h-full w-full md:w-1/2 flex items-center justify-center  ">
        <div className="flex flex-col rounded-2xl  items-center w-2/3 h-2/3 lg:h-1/2 bg-white/10 justify-start ">
          <h1 className="p-2 text-3xl font-bold text-blue-500">
            {" "}
            Welcome to Custom Resume
          </h1>
          <div className="flex flex-col w-full h-full gap-8 justify-center items-center p-4 ">
            <div className="flex flex-col w-1/2  justify-center relative  ">
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
                eye
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col relative w-1/2">
              <button
                onClick={async () => {
                  const res = await signIn("credentials", {
                    username,
                    password,
                    redirect: false,
                    callbackUrl: "/",
                  });
                  if (res?.status === 200) {
                    router.push("/resume");
                  }
                }}
                className="bg-blue-200 rounded-md p-2 font-bold text-blue-800"
              >
                Login
              </button>
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
  eye?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function LabelledInput({
  label,
  placeholder,
  type,
  eye,
  onChange,
}: LabelledInputType) {
  const [isvisible, setIsVisible] = useState(false);

  const togglePassword = () => {
    setIsVisible(!isvisible);
  };
  return (
    <div>
      <label className="block mb-2 text-sm text-white font-semibold pt-4">
        {label}
      </label>
      {eye ? (
        <div className="flex flex-row items-center  rounded-md bg-gray-50  focus:ring-blue-500 focus:border-blue-500 ">
          <input
            type={isvisible ? "text" : "password"}
            id="first_name"
            className="bg-gray-50  pass  text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder={placeholder}
            required
            onChange={onChange}
          />
          {isvisible ? (
            <Eye
              onClick={togglePassword}
              className="text-gray-500 cursor-pointer "
            />
          ) : (
            <EyeOff
              onClick={togglePassword}
              className="text-gray-500 cursor-pointer"
            />
          )}
        </div>
      ) : (
        <input
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border pass border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
          onChange={onChange}
        />
      )}
    </div>
  );
}
