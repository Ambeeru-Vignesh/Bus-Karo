import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { getUsers, updateUsers } from "../../redux/auth/authSlice";
import PageTitle from "../../components/PageTitle";
import DefaultLayout from "../../components/DefaultLayout";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const {
    users: usersList,
    isSuccess,
    isLoading,
    isUpdateSuccess,
    isError,
    user,
    errorMessage,
  } = useSelector((state) => state.auth);

  const updateUserPermissions = async (user, action) => {
    try {
      let payload = null;
      if (action === "make-admin") {
        payload = {
          ...user,
          isAdmin: true,
        };
      } else if (action === "remove-admin") {
        payload = {
          ...user,
          isAdmin: false,
        };
      } else if (action === "block") {
        payload = {
          ...user,
          isBlocked: true,
        };
      } else if (action === "unblock") {
        payload = {
          ...user,
          isBlocked: false,
        };
      }

      dispatch(updateUsers(payload));

      if (isUpdateSuccess) {
        dispatch(getUsers());
        message.success("User permissions updated successfully");
      }

      window.location.reload();
    } catch {
      message.error(errorMessage);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "",
      render: (data) => {
        return data.isBlocked ? "Blocked" : "Active";
      },
    },
    {
      title: "Role",
      dataIndex: "",
      render: (data) => {
        if (data?.isAdmin) {
          return "Admin";
        } else {
          return "User";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          {record?.isBlocked && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "unblock")}
            >
              UnBlock
            </p>
          )}
          {!record?.isBlocked && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "block")}
            >
              Block
            </p>
          )}
          {record?.isAdmin && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "remove-admin")}
            >
              Remove Admin
            </p>
          )}
          {!record?.isAdmin && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "make-admin")}
            >
              Make Admin
            </p>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(getUsers());
      if (isSuccess) {
        setUsers(usersList);
      }
    } else {
      message.error("Access denied");
    }
  }, [dispatch, isSuccess]);
  return (
    <>
      {user && user.isAdmin ? (
        <DefaultLayout>
          {isLoading && <Loader />}
          <div>
            <div className="d-flex justify-content-between my-2">
              <PageTitle title="Users" />
            </div>
            <Table columns={columns} dataSource={users} />
          </div>
        </DefaultLayout>
      ) : (
        <h1>Access Denied.</h1>
      )}
    </>
  );
};

export default AdminUsers;
