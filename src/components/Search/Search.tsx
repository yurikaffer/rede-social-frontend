import React, { useState, useEffect } from 'react';
import UserService from '../../api/Service/UserService';
import Autocomplete from '@mui/material/Autocomplete';
import { UserInterface } from '../../interface/UserInterface';
import { Avatar, Box, InputBase, List, ListItem, Typography } from '@mui/material';

const Search: React.FC = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>([]);
    const [listOpen, setListOpen] = useState<boolean>();
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        const fetchUsers = async () => {
            const userList = await UserService.getAllUsers();
            setUsers(userList);
            setFilteredUsers(userList);
        };

        fetchUsers();
    }, []);

    const handleUserSelected = (user: UserInterface) => {
        setInputValue('')
        setListOpen(false);
        window.open(`/user/${user.id}`, '_blank');
    };

    const handleSearch = (value: string) => {
        const filtered = users.filter(user =>
            user.userName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);

        if (filtered.length > 0 && value) {
            setListOpen(true)
        } else {
            setListOpen(false)
        }
    };

    const renderListSearch = () => {
        if (listOpen) {
            return (
                <List sx={{
                    position: 'absolute',
                    width: '235px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: "#28343E",
                    borderRadius: '5px',
                    marginLeft: '10px',
                    color: 'white',
                    zIndex: 1,
                }}>
                    {filteredUsers.map(user => (
                        <ListItem key={user.id} button onClick={() => handleUserSelected(user)}>
                            <Avatar src={user.filePath}/>
                            <Box display={'flex'} flexDirection={'column'} pl={2} >
                                <Typography> {user.name} </Typography>
                                <Typography fontSize={13} color={'gray'}>@{user.userName}</Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )
        }
    }

    return (
        <Box width={'15vw'} >
            <Autocomplete
                freeSolo
                options={users.map(user => user.name)}
                onInputChange={(event, value) => handleSearch(value)}
                renderInput={(params) => (
                    <InputBase
                        {...params}
                        placeholder="Pesquise por usuários"
                        onChange={(event) => setInputValue(event.target.value)}
                        sx={{
                            backgroundColor: "#28343E",
                            borderRadius: 10,
                            padding: '5px 0px 5px 15px',
                            marginLeft: '10px',
                            color: 'white',
                            minWidth: '200px'
                        }}
                    />
                )}
            />
            {listOpen ? renderListSearch() : null}

        </Box>
    );
};

export default Search;
