import { createHashRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./views/HomePage";



export const router = createHashRouter([

    {
        path: "/",
        element: <MainLayout/>,
        children: [
            { index: true, element: <HomePage/>},
        ],
    },


])