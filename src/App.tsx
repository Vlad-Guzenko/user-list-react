import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import UserManagement from './components/UserManagement/UserManagement';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <UserManagement />
    </Provider>
  );
};



export default App;
