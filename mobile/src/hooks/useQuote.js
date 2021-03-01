import { useContext } from 'react';
import { QuoteContext } from '../contexts';

export default () => {
  const context = useContext(QuoteContext);
  
  return context;
}