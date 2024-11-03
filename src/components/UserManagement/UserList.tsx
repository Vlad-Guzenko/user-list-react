import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './userList.css';

const UserList: React.FC<{ onUserSelect: (userId: number | null) => void }> = ({ onUserSelect }) => {
  const users = useSelector((state: RootState) => state.users.users);

  return (
    <div className="user-list-container">
      <List className="user-list">
        {users.map((user) => (
          <ListItem
            key={user.id}
            onClick={() => onUserSelect(user.id)}
            component={'div'}
          >
            <ListItemText primary={`${user.name} ${user.surname}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
