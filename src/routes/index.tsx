import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";

export const routes = createBrowserRouter([
    {
        path: '/atualizacoes/:id',
        element: <HomePage/>
    }
])