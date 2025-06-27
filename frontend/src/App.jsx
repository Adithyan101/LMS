import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/user/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import CourseContainer from "./pages/user/CourseContainer";
import MyLearning from "./pages/user/MyLearning";
import Profile from "./pages/user/Profile";



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <>
        <HeroSection/>
        <CourseContainer/>
        </>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/my-learning",
        element: <MyLearning/>
      },
      {
        path: "/my-profile",
        element: <Profile/>,
      },

    ],
  },
]);

function App() {
  return (
    <main >
      <RouterProvider router={appRouter} />
      
    </main>
  );
}

export default App;
