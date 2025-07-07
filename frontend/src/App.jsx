import Login from "./pages/Login";
import HeroSection from "./pages/user/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import CourseContainer from "./pages/user/CourseContainer";
import MyLearning from "./pages/user/MyLearning";
import Profile from "./pages/user/Profile";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AdminLayout from "./layout/AdminLayout";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <CourseContainer />
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/my-learning",
        element: <MyLearning />,
      },
      {
        path: "/my-profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />, // ✅ Wrap all admin pages in this layout
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "courses",
        element: <CourseTable />,
      },
      {
        path: "courses/create",
        element: <AddCourse />,
      },
      {
        path: "courses/:id",
        element: <EditCourse/>,
      },
      {
        path: "courses/:id/lectures",
        element: <CreateLecture/>
      }
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
