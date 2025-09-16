import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import GoogleLogin from "@/components/GoogleButton";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;
  const { login } = useAuth();
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    login({ email, password });
    navigate("/");
  };

  const onTestAccount = () => {
    setUser({ email: "test@gmail.com", password: "test@123" });
  };

  return (
    <div className="min-h-screen bg-background flex p-8 justify-center items-center">
      {/* Left Side - Login Form */}
      <div className="lg:w-1/2 xs:w-full flex border-2 rounded-lg  items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-8 tracking-wider">
              LOGIN
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Username or email"
                className="w-full pl-10 py-4 bg-transparent border-0 border-b-2 border-border text-foreground placeholder-muted-foreground rounded-none focus:border-primary focus:ring-0 text-lg"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full pl-10 py-4 bg-transparent border-0 border-b-2 border-border text-foreground placeholder-muted-foreground rounded-none focus:border-primary focus:ring-0 text-lg"
                required
              />
            </div>

            {/* User Type Toggle */}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full py-4 bg-primary hover:opacity-90 text-primary-foreground font-semibold text-lg rounded-md transition-colors mt-8"
            >
              LOGIN
            </Button>

            {/* Divider */}
            <div className="text-center text-muted-foreground text-sm">or</div>

            {/* Google Login */}
            <GoogleLogin />

            {/* Test Account Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={onTestAccount}
                className="text-muted-foreground hover:text-foreground text-sm underline"
              >
                Testing the site? Get a test account
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-muted-foreground text-sm mt-8">
              {"Don't have an account? "}
              <Link to="/sign-up" className="text-foreground hover:underline">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
