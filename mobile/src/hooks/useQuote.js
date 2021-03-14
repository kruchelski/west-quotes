import { useContext } from 'react';
import { QuoteContext } from '../contexts';

const useQuote = () => {
  const context = useContext(QuoteContext);

  return context;
};

export default useQuote;
