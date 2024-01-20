import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";

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

        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              pages.map(({ path, element }) => (
                <Route exact path={layout+ path} element={element} />
              ))
          )}
        </Routes>
        
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Admin;
