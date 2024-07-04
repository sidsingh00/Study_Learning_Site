"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/app/components/Loader";
import { styles } from "@/app/styles/styles";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";
import toast from "react-hot-toast";

type Props = {};

const Page = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [updateUserRole, { isSuccess, error: updateUserRoleError }] =
    useUpdateUserRoleMutation();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.3 },
    {
      field: "mail",
      headerName: "",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail size={20} className="text-green-500" />
            </a>
          </>
        );
      },
    },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.2 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.3 },
    { field: "created_at", headerName: "Joined At", flex: 0.3 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  {
    data &&
      data.users
        .filter((item: any) => item.role === "admin")
        .forEach((user: any) => {
          rows.push({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            courses: user.courses.length,
            created_at: format(user.createdAt),
          });
        });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
    refetch();
  };

  useEffect(() => {
    if (updateUserRoleError) {
      if ("data" in updateUserRoleError) {
        const errorData = updateUserRoleError as any;
        toast.error(errorData.data.message);
      }
    }

    if (isSuccess) {
      toast.success("User role updated successfully!");
      setActive(false);
    }
  }, [isSuccess, updateUserRoleError]);
  return (
    <div className="mt-[50px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={"20px"}>
          <div className="flex justify-end">
            <button
              className={`${styles.button} !w-[200px] text-white`}
              onClick={() => setActive(!active)}
            >
              Add New Member
            </button>
          </div>
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column-cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderTop: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      )}

      {active && (
        <Modal open={active} onClose={() => setActive(!active)}>
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <h1 className={styles.title}>Add New Member</h1>
            <div className="mt-3 space-y-4">
              <input
                type="email"
                placeholder="Enter email..."
                className={styles.input}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <select
                className={styles.input}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <button className={`${styles.button}`} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Page;
