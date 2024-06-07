"use client";
import { useWixClient } from "@/hooks/useWixclient";
import { LoginState } from "@wix/sdk";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();
  // console.log(isLoggedIn);
  if (isLoggedIn) {
    router.push("/");
    router.refresh();
  }
  const [mode, setMode] = useState(MODE.LOGIN);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const pathName = usePathname();
  const formTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Password"
      : "Email Verification";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      let response;
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({ email, password });
          setMessage("Login successful!");
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          setMessage("Registration successful! Please verify your email.");
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            pathName
          );
          setMessage("Password reset email sent. Please check your email.");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          setMessage("Email verification successful!");
          break;
        default:
          break;
      }
      // console.log(response);
      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful! You are being redirected.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );
          // console.log(tokens);
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password");
          } else {
            setError("Something went wrong.");
          }

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex justify-center items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-center">{formTitle}</h1>
        {mode === MODE.REGISTER && (
          <div className="flex flex-col gap-2">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="ring-2 ring-gray-300 rounded-md px-3 py-2"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label>Verification Code</label>
            <input
              type="text"
              name="emailCode"
              placeholder="Enter code"
              className="ring-2 ring-gray-300 rounded-md px-3 py-2"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              className="ring-2 ring-gray-300 rounded-md px-3 py-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="ring-2 ring-gray-300 rounded-md px-3 py-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot Password
          </div>
        )}
        <button
          className="bg-narsa text-white px-2 py-1.5 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : buttonTitle}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {message && <div className="text-green-600">{message}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            {"Don't"} have an account?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Already have an account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back To Login
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
