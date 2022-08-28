import { useContext } from 'react';
import FormAuth from './FormAuth/FormAuth';
import { userContext } from './UserContext/UserContext';
import { UserPage } from './UserPage/UserPage';

export const App = () => {
  const { user } = useContext(userContext);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      {user ? <UserPage /> : <FormAuth />}
    </div>
  );
};
