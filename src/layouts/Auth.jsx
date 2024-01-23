import { Routes, Route } from "react-router-dom";
import routes from "../routes";

import { SignIn, SignUp } from "../pages/auth";
import NotFound from "../pages/NotFound";
export function Auth() {

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
        <Route path="/*" element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default Auth;