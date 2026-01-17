import { createContext, useContext, useState, ReactNode } from 'react';

interface ServiceContextType {
  currentService: string;
  setCurrentService: (service: string) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [currentService, setCurrentService] = useState<string>('');

  return (
    <ServiceContext.Provider value={{ currentService, setCurrentService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within ServiceProvider');
  }
  return context;
};
