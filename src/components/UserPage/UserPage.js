import { useContext } from 'react';
import { userContext } from '../UserContext/UserContext';

export const UserPage = () => {
  const { user } = useContext(userContext);
  console.log('first', user);
  return (
    <>
      <p> Hello {user.displayName}</p>
    </>
  );
};
