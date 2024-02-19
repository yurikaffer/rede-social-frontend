import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, ButtonBase, Container, Link, TextField, Typography } from '@mui/material';
import AuthService from '../api/Service/AuthService';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useUser } from '../context/UserContext';
import UserService from '../api/Service/UserService';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setMsgError] = useState('');
    const { setUser } = useUser();
    AuthService.logout()
    setUser(null)

    useEffect(() => {
        setMsgError('')
    }, [password, username]);

    const handleLogin = async () => {
        const auth = await AuthService.authenticate(username, password);
        if (auth) {
            const userId = localStorage.getItem('userId')
            if (userId) {
                const user = await UserService.getUser(userId)
                setUser(user)
                navigate('/home');
            }
        } else {
            setMsgError('Usuário ou senha inválidos.')
        }
    }

    return (
        <Container maxWidth='lg' >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    gap: 20
                }}
            >
                <Box sx={{ width:"60%",
                    '@media (max-width: 900px)': {
                        display: 'none'
                    },
                }}>
                    <img src='/login-animate.svg' width="100%" alt="Login" />
                </Box>
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: '#1B2730',
                        padding: 3,
                        borderRadius: 3,
                    }}>
                    <Box mb={1}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Box>
                    <Typography variant="h5" color="white" gutterBottom>
                        Faça login ou cadastre-se!
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="userName"
                            label="Nome de usuário"
                            name="Nome de usuário"
                            autoComplete="userName"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        />
                        <TextField
                            sx={{ mt: 1 }}
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                        <Box width={'100%'} >
                            {msgError && (<Typography mt={1} ml={1} color={'red'} fontSize={14}>{msgError}</Typography>)}
                        </Box>
                        <ButtonBase
                            onClick={handleLogin}
                            sx={{ 
                                width: '100%',
                                color: 'whitesmoke',
                                backgroundColor: '#28343E',
                                padding: 1.5,
                                borderRadius: 2,
                                transition: '0.5s',
                                cursor: 'pointer',
                                mt: 2,
                                mb: 2,
                                '&:hover': {
                                    backgroundColor: '#323d45',
                                },
                            }}
                        >
                            Entrar
                        </ButtonBase>
                        <Link href="/register" variant="body2">
                            {"Não tem uma conta? cadastre-se"}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
