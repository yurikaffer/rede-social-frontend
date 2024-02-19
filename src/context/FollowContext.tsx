import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import FollowService from '../api/Service/FollowService';

interface FollowContextProps {
    followed: number;
    followers: number;
    setFollowed: (num: number) => void;
    setFollowers: (num: number) => void;
}

const FollowContext = createContext<FollowContextProps>({ 
    followed: 0,
    followers: 0,
    setFollowed: () => { },
    setFollowers: () => { },
});

export const FollowProvider: React.FC<{ children: ReactNode, userId: number }> = ({ children, userId }) => {
    const [followed, setFollowed] = useState(0);
    const [followers, setFollowers] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                setFollowers(await FollowService.getAllFollowersByUserId(userId)) //PEGA O NUMERO DE SEGUIDORES
                setFollowed(await FollowService.getAllFollowedByUserId(userId)) //PEGA O NUMERO DE SEGUIDORES
            }
        };
    
        fetchUser();
      }, []);

    return (
        <FollowContext.Provider value={{ setFollowed, setFollowers, followed, followers }}>
            {children}
        </FollowContext.Provider>
    );
};

export const useFollow = () => useContext(FollowContext);
