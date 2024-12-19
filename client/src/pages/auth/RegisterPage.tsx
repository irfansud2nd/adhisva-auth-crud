import InputText from "@/components/InputText";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "@/lib/axios";
import { toastError } from "@/lib/functions";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!email || !password)
        throw new Error("Name, email, and password are required");

      await axios.post("auth/register", {
        name,
        email,
        password,
      });

      setName("");
      setEmail("");
      setPassword("");
      toast.success("User registered");
      navigate("/login", { replace: true });
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register using your name, email, password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col gap-y-2"
          >
            <InputText
              label="Name"
              value={name}
              setValue={setName}
              type="text"
              required
            />
            <InputText
              label="Email"
              value={email}
              setValue={setEmail}
              type="email"
              required
            />
            <InputText
              label="Password"
              value={password}
              setValue={setPassword}
              type="password"
              required
            />
            <div className="flex justify-between items-center">
              <Link to={"/login"} className="text-sm hover:underline">
                Login
              </Link>
              <Button type="submit">Register</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default RegisterPage;
