import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRole, setNewRole] = useState('User');
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user/${id}`);
      if (response.data.success) {
        setUser(response.data.user);
        setNewRole(response.data.user.role || 'User');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error fetching user details');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async () => {
    setIsUpdatingRole(true);
    try {
      const response = await axios.patch(`http://localhost:4000/api/user/role/${id}`, { role: newRole });
      if (response.data.success) {
        setUser((prevUser) => ({ ...prevUser, role: newRole }));
        alert('User role updated successfully!');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error changing user role');
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const response = await axios.delete(`http://localhost:4000/api/user/${id}`);
      if (response.data.success) {
        alert('User deleted successfully!');
        navigate('/users');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error deleting user');
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading user details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return user ? (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">{user.name}'s Profile</h2>
        <p className="text-gray-600 mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-600"><strong>Role:</strong> {user.role || 'User'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Role Change Section */}
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Change User Role</h3>
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Inventory Manager">Inventory Manager</option>
          </select>
          <button
            onClick={handleRoleChange}
            disabled={isUpdatingRole}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ${
              isUpdatingRole ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isUpdatingRole ? 'Changing...' : 'Change Role'}
          </button>
        </div>

        {/* Delete User Section */}
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Delete User</h3>
          <button
            onClick={handleDeleteUser}
            disabled={isDeleting}
            className={`w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ${
              isDeleting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isDeleting ? 'Deleting...' : 'Delete User'}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500">No user found</p>
  );
};

export default UserProfile;
