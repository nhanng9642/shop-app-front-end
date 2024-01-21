import { Link, NavLink } from "react-router-dom";
import {
  Button,
  Typography,
} from "@material-tailwind/react";

export function Sidenav({ routes }) {
  return (
    <aside
      className={`bg-white shadow-sm
      -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 
      rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div
        className="relative"
      >
        <div className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color="blue-gray"
          >
            MY BOOK STORE
          </Typography>
        </div>
      </div>
      
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => { 
          if (layout !== "admin") return null;
          
          return (
           <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color= "white"
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={isActive ? "black" : "blue-gray"}
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        )})}
      </div>
    </aside>
  );
}

export default Sidenav;
