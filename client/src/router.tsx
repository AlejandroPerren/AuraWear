import { createHashRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./views/HomePage";
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./views/AuthPage";



export const router = createHashRouter([

    {
        path: "/",
        element: <MainLayout/>,
        children: [
            { index: true, element: <HomePage/>},
        ],
    },
    {
        path: "auth",
        element: <AuthLayout/>,
        children: [
            {index: true, element: <AuthPage/>},
        ],
    }


])