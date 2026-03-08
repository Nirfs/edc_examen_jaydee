import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { AllBoards } from "./pages/AllBoards";
import { BoardByID } from "./pages/BoardByID";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/boards",
        element: <AllBoards />,
      },
      {
        path: "/boards/:id",
        element: <BoardByID />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
