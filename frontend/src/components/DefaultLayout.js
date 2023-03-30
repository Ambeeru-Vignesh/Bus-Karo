import React, { useEffect, useState } from "react";
import "../resources/layout.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { message } from "antd";

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const { user, isLoading, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const userMenu = [
    {
      name: "Home",
      icon: "ri-home-line",
      path: "/",
    },
    {
      name: "Bookings",
      icon: "ri-file-list-line",
      path: "/bookings",
    },
    {
      name: "Profile",
      icon: "ri-user-settings-line",
      path: "/profile",
    },
    {
      name: "Logout",
      icon: "ri-logout-box-line",
      path: "/logout",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];

  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("book-now")) {
    activeRoute = "/";
  }

  const pathHandler = (path) => {
    if (path === "/logout") {
      dispatch(logout());
      localStorage.removeItem("user");
      message.error("Logged Out Successfully!");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <>
      {user ? (
        <div className="layout-parent">
          <div className="sidebar">
            <div className="sidebar-header">
              <h1 className={`${collapsed ? `logo-collapsed` : `logo`} `}>
                Bus Karo!
              </h1>
              <h1 className="role">
                <i
                  className="ri-user-3-line"
                  style={{ color: "white", paddingRight: "10px" }}
                ></i>
                {!collapsed && user.name.toUpperCase()}
                <br></br>
                {/* {user.isAdmin ? "Admin" : "User"} */}
              </h1>
            </div>{" "}
            {user.isAdmin ? (
              <div className="d-flex flex-column gap-2 justify-content-start menu">
                {adminMenu.map((item, index) => {
                  return (
                    <div
                      key={item.name}
                      className={`${
                        activeRoute === item.path && "active-menu-item"
                      } menu-item`}
                    >
                      <i className={item.icon}></i>{" "}
                      {!collapsed && (
                        <span onClick={() => pathHandler(item.path)}>
                          {item.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="d-flex flex-column gap-2 justify-content-start menu">
                {userMenu.map((item, index) => {
                  return (
                    <div
                      key={item.name}
                      className={`${
                        activeRoute === item.path && "active-menu-item"
                      } menu-item`}
                    >
                      <i className={item.icon}></i>{" "}
                      {!collapsed && (
                        <span onClick={() => pathHandler(item.path)}>
                          {item.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="body">
            <div className="header flex justify-between items-center side-by-side">
              {collapsed ? (
                <i
                  className="ri-menu-2-fill"
                  onClick={() => setCollapsed(!collapsed)}
                ></i>
              ) : (
                <i
                  className="ri-close-line"
                  onClick={() => setCollapsed(!collapsed)}
                ></i>
              )}
              <span className="tagline">
                <h1 className="text-lg">
                  Travel aasaan Karo, through Bus Karo!!
                </h1>
              </span>
            </div>
            <div className="content">{children}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DefaultLayout;
