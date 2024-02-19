import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserInterface } from '../interface/UserInterface';
import userService from '../api/Service/UserService';

interface UserContextProps {
    userLogged: UserInterface | null;
    setUser: (userData: UserInterface | null) => void;
}

const UserContext = createContext<UserContextProps>({ 
    userLogged: null,
    setUser: () => { },
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userLogged, setUserLogged] = useState<UserInterface | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
          const userId = localStorage.getItem('userId');
          if (userId) {
            const user = await userService.getUser(userId);
            setUserLogged(user);
          }
        };
    
        fetchUser();
      }, []);

    const setUser = (userData: UserInterface | null) => {
        setUserLogged(userData);
    };

    return (
        <UserContext.Provider value={{ userLogged, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
