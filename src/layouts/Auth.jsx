import { Routes, Route } from "react-router-dom";

import { SignIn, SignUp, ForgotPassword, ResetPassword } from "../pages/auth";
import NotFound from "../pages/status/NotFound";
export function Auth() {

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        <Route exact path={"/sign-in"} element={<SignIn />} />
        <Route exact path={"/sign-up"} element={<SignUp />} />
        <Route exact path={"/forgot-password"} element={<ForgotPassword />} />
        <Route exact path={"/reset-password"} element={<ResetPassword />} />
        <Route path="/*" element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default Auth;