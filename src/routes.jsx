import {
    HomeIcon,
    UserCircleIcon,
    TableCellsIcon,
    InformationCircleIcon,
    ServerStackIcon,
    RectangleStackIcon,
} from "@heroicons/react/24/solid";

import { Account, Category, Dashboard, Product} from "./pages/admin";
import { SignIn, SignUp } from "./pages/auth";

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        layout: "admin",
        pages: [
            {
                icon: <HomeIcon {...icon} />,
                name: "dashboard",
                path: "/home",
                element: <Dashboard />,
            },
            {
                icon: <UserCircleIcon {...icon} />,
                name: "category",
                path: "/category",
                element: <Category />,
            },
            {
                icon: <TableCellsIcon {...icon} />,
                name: "product",
                path: "/product",
                element: <Product />,
            },
            {
                icon: <InformationCircleIcon {...icon} />,
                name: "account",
                path: "/account",
                element: <Account />,
            },
        ],
    },
    {
        title: "auth pages",
        layout: "auth",
        pages: [
          {
            icon: <ServerStackIcon {...icon} />,
            name: "sign in",
            path: "/sign-in",
            element: <SignIn />,
          },
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "sign up",
            path: "/sign-up",
            element: <SignUp />,
          },
        ],
      },
];

export default routes;
