import React, { useState } from "react";

const UserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState(
    user || { id: "", name: "", username: "", email: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block font-bold mb-2">ID</label>
        <input
          type="text"
          required
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={!!user}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Name</label>
        <input
          type="text"
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Username</label>
        <input
          type="text"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
      >
        {user ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
