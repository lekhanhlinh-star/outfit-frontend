import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/home_page";
import SelectImage from "./page/SelectImage";
import ReviewPhotoPage from "./page/reviewPhoto";
import SelectOptionPage from "./page/FeedBackPage";
import ResultPage from "./page/Resuts";


const Routes = () => {
    const routesForPublic = [
    {
        path: "/",
        element: <Home></Home>
    }, 
    {
        path: "/image",
        element: <SelectImage></SelectImage>
    },

    {
        path: "/selectOptions",
        element:  <SelectOptionPage/>
    },
    {
        path : "/reviewPhoto",
        element: <ReviewPhotoPage/>
    }
    ,
    {
        path : "/feedback",
        element : < ResultPage/>
    }

]
    const router = createBrowserRouter([...routesForPublic]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
}
export default Routes;