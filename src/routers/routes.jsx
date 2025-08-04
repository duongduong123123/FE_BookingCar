import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import Booking from "../pages/Booking";
import ManageBooking from "../pages/ManageBooking";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "booking", element: <Booking /> },
        ],
    },
    {
        path: "/manage-booking",
        element: <ManageBooking />,
    },
]);