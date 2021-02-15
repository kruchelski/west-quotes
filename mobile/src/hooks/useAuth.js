import { useContext } from 'react';
import { AuthContext } from '../contexts';

export default () => {
  const context = useContext(AuthContext);
  
  return context;
}