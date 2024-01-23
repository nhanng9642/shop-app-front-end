import { Routes, Route } from "react-router-dom";

const authRoutes = [
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]

import { SignIn, SignUp } from "../pages/auth";
import NotFound from "../pages/NotFound";
export function Auth() {

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {authRoutes.map(({ path, element }) => (
          <Route exact path={path} element={element} key={path}/>
        ))}
        <Route path="/*" element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default Auth;