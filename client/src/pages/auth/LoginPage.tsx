import InputText from "@/components/InputText";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { toastError } from "@/lib/functions";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";
  from += location.state?.from?.search || "";

  const handleSubmit = async () => {
    try {
      if (!email || !password)
        throw new Error("Email and password are required");

      await login(email, password);
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login using your email and password</CardDescription>
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
              <Link to={"/register"} className="text-sm hover:underline">
                Register
              </Link>
              <Button type="submit">Login</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default LoginPage;
