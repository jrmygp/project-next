import HomePage from "../Pages/HomePage";
import MyProfilePage from "../Pages/MyProfilePage/MyProfilePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Settings from "../Pages/Settings/Settings";
import UploadPage from "../Pages/UploadPage/UploadPage";
import NotFoundPage from "../Pages/404/404";


const routes = [
    {
      path: "/",
      component: <HomePage />,
      sideBar: true,
    },
    {
      path: "/MyProfilePage",
      component: <MyProfilePage />,
      sideBar: true,
    },
    {
      path: "/LoginPage",
      component: <LoginPage />,
      sideBar: false,
    },
    {
      path: "/Settings",
      component: <Settings />,
      sideBar: true,
    },
    {
      path: "/UploadPage",
      component: <UploadPage />,
      sideBar: true,
    },
    {
      path: "/*",
      component: <NotFoundPage />,
      sideBar: false,
    },
  ];
  