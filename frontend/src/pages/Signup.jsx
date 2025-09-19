import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          
          <InputBox 
            label={"First Name"} 
            placeholder={"John"} 
            onChange={(e) => setFirstName(e.target.value)}
          />
          
          <InputBox 
            label={"Last Name"} 
            placeholder={"Doe"} 
            onChange={(e) => setLastName(e.target.value)}
          />
          
          <InputBox 
            label={"Email"} 
            placeholder={"johndoe@example.com"} 
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          
          <InputBox 
            label={"Password"} 
            placeholder={""} 
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          
          <div className="pt-4">
            <Button label={"Sign Up"} onClick={
              async() => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                  firstName,
                  lastName,
                  email,
                  password
                });
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }
            }/>
          </div>
          
          <BottomWarning 
            label={"Already have an account?"} 
            buttonText={"Login"} 
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

//We can create Heading component, SubHeading component and BottomWarning component
//post par server deta hai token in response