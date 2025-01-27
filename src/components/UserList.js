"use client";
import React, { useState, useEffect } from "react";
import {
  fetchUsers,
  deleteUser,
  editUser,
  addUser,
} from "@/app/services/api.js";
import { v4 as uuidv4 } from "uuid";
import UserForm from "./UserForm";
import { toast, ToastContainer } from "react-toastify";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css"; // Importing  the CSS of toast
import { CiEdit } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { GrNext, GrPrevious } from "react-icons/gr";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching users");
      toast.error("Error fetching users!"); // Displays error in toast
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id); // This returns status of user

      if (!response.ok) {
        toast.error(`user with id ${id} failed to delete`); // Display error toast
      } else {
        setUsers(users.filter((user) => user.id !== id));

        toast.success("User deleted successfully!"); // Display success toast
      }
    } catch (error) {
      setError("Error deleting user");
    }
  };

  const handleAddUser = async (user) => {
    const response = await addUser(user); // This returns status of user
    if (!response.ok) {
      toast.error("Failed to add user");
    } else {
      setUsers([...users, user]);

      toast.success("User added successfully!"); // Display success toast
    }
    console.log("res....", response);

    setIsModalOpen(false);
  };

  const handleEditUser = async (updatedUser) => {
    const response = await editUser(updatedUser.id, updatedUser); // This returns status of user
    if (!response.ok) {
      toast.error("Failed to add user");
    } else {
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );

      toast.success("User updated successfully!"); // Display success toast
    }
    console.log("res....", response);
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationRange = () => {
    const pages = [];
    if (totalPages <= 5) {
      // Show all pages if there are 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Handle pages with ellipses
      if (currentPage > 3) {
        pages.push(1, "..."); // First page with ellipsis
      }
      for (
        let i = Math.max(1, currentPage - 1);
        i <= Math.min(totalPages, currentPage + 1);
        i++
      ) {
        pages.push(i); // Current page range
      }
      if (currentPage < totalPages - 2) {
        pages.push("...", totalPages); // Last page with ellipsis
      }
    }
    return pages;
  };

  // Get the current users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="container mx-auto p-4">
      {error && <div className="bg-red-500 text-white p-2">{error}</div>}

      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold text-white">User List</h1>
        <button
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
          onClick={() => openModal()}
        >
          Add User
        </button>
      </div>
      {loading && (
        <div className="w-full flex justify-center items-center">
          <button
            className="m-auto  bg-red-600 hover:bg-red-700 text-white p-3 rounded-full"
            onClick={() => openModal()}
          >
            Loading....
          </button>
        </div>
      )}
      {users.length === 0 && loading === false && (
        <div className="w-full flex justify-center items-center">
          <button
            className="m-auto  bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
            onClick={() => openModal()}
          >
            Add New User
          </button>
        </div>
      )}
      {/* User details in cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {" "}
        {currentUsers.map((user) => (
          <div
            key={uuidv4()}
            className="bg-black text-white p-6 rounded-lg shadow-lg flex flex-col"
          >
            <h2 className="text-xl font-bold mb-2">{user.name}</h2>
            <p className="text-sm text-gray-400 mb-1">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="text-sm text-gray-400 mb-4">
              <strong>Email:</strong> {user.email}
            </p>
            <div className="mt-auto flex space-x-4">
              <button
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                onClick={() => openModal(user)}
              >
                <CiEdit />
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg"
                onClick={() => handleDelete(user.id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal Popup */}
      {isModalOpen && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? "Edit User" : "Add User"}
            </h2>
            <UserForm
              user={editingUser}
              onSubmit={editingUser ? handleEditUser : handleAddUser}
            />
            <button
              className="absolute top-0 right-3 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full mt-4"
              onClick={closeModal}
            >
              <RxCross1 />
            </button>
          </div>
        </div>
      )}
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4 w-full p-2">
        <button
          className={`${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } text-white px-4 py-2 rounded-lg`}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <GrPrevious />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-2">
          {getPaginationRange().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`${
                  currentPage === page
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-800"
                } px-4 py-2 rounded-lg`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          className={`${
            currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } text-white px-4 py-2 rounded-lg`}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <GrNext />
        </button>
      </div>

      {/* ToastContainer for showing toasts */}
      <ToastContainer />
    </div>
  );
};

export default UserList;
