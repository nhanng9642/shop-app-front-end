import { Routes, Route, Outlet } from "react-router-dom";

import {
    Footer, Header, Sidenav
} from "../components/layout";

import routes from "../routes";

export function Admin() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
      />
      <div className="p-4 xl:ml-80">
        <Header />

        <Outlet />
        {/* <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "admin" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes> */}
        
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Admin;
