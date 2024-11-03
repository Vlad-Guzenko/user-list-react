import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import UserList from './UserList';
import { RootState } from '../../redux/store';
import './userManagement.css';
import UserForm from './UserForm';

const UserManagement: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const users = useSelector((state: RootState) => state.users.users);

  const handleUserSelect = (userId: number | null) => {
    setSelectedUserId(userId);
  };

  const resetUserForm = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="user-management-container">
      <UserList onUserSelect={handleUserSelect} />
      <UserForm selectedUserId={selectedUserId} users={users} onFormReset={resetUserForm} />
    </div>
  );
};

export default UserManagement;
