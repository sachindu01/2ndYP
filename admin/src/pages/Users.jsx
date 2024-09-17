import React from "react";

// Dummy user data
const users = [
  { name: "Janindu Ranawaka", email: "janindu.admin@fundventory.com", role: "Admin" },
  { name: "Sachindu Ravishan", email: "sachindu@example.com", role: "User" },
  { name: "Nisitha Padeniya", email: "nisitha@example.com", role: "User" },
];

const UserList = () => {
  return (
    <div>
      <h2 className="mb-2">Users</h2>

      {/* User Table */}
      <div className="grid grid-cols-[2fr_3fr_1fr_1fr] gap-2 bg-gray-100 p-3 font-semibold border-b">
        <p>Name</p>
        <p>Email</p>
        <p>Role</p>
        <p>Actions</p>
      </div>

      {/* User List */}
      {users.map((user, index) => (
        <div
          key={index}
          className="grid grid-cols-[2fr_3fr_1fr_1fr] gap-2 p-2 border-b"
        >
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
          <a
            href={`/user/${index}`}
            className="text-blue-500 hover:underline"
          >
            View User
          </a>
        </div>
      ))}
    </div>
  );
};

export default UserList;
