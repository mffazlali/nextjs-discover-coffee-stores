import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext } from 'react'

const StoreContext = createContext<any>(null)
interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const initialState = {
    latlang: '',
    coffeeStores: [],
  };
  return (
    <StoreContext.Provider value={{ state: initialState }}>
      {children}
    </StoreContext.Provider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return <StoreProvider><Component {...pageProps} /></StoreProvider>
}
