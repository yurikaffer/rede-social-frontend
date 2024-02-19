import { useState } from 'react';
import { Box, TextField, Typography, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserService from '../api/Service/UserService';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import SimpleAlertError from '../components/Alert/SimpleAlertError';

const useFormSchema = z.object({
    password: z.string()
        .min(6, 'A senha deve conter no minimo 6 caracteres')
        .nonempty('Senha obrigatória.'),
    confirmPassword: z.string()
        .nonempty('Confirmação de senha obrigatória.'),
    email: z.string()
        .email('E-mail inválido.')
        .nonempty('E-mail obrigatório.'),
    userName: z.string()
        .nonempty('Nome de usuário obrigatório.')
        .max(55, 'Você excedeu o número máximo de 55 caracteres')
        .refine(userName => !/\s/.test(userName), {
            message: 'O nome de usuário não pode conter espaços em branco.',
        }),
    name: z.string()
        .nonempty('O Nome é obrigatório.')
        .max(55, 'Você excedeu o número máximo de 55 caracteres')
        .transform(name => {
            return name.trim().split(' ').map(word => {
                return word[0].toLocaleUpperCase().concat(word.substring(1))
            }).join(' ')
        }),
})

type useFormType = z.infer<typeof useFormSchema>

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [msgError, setMsgError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<useFormType>({
        resolver: zodResolver(useFormSchema)
    });

    const onSubmit = async (data: useFormType) => {
        setMsgError('');
        if (await validPassword(data)) {
            const updatedUser = {
                name: data.name,
                email: data.email,
                password: data.password,
                userName: data.userName,
            };

            const response = await UserService.registerUser(updatedUser);
            if ('error' in response) {
                setMsgError(response.error);
            } else {
                setMsgError('');
                navigate('/login');
            }
        }
    };

    const validPassword = async (data: useFormType): Promise<boolean> => {
        if (data.password === data.confirmPassword) {
            setIsValidPassword(true)
            return true
        }
        setIsValidPassword(false)
        return false
    }

    const renderErrosPassword = () => {
        if (errors.confirmPassword) {
            return <Typography color={'#d90026'}>{errors.confirmPassword.message}</Typography>
        } else if (!isValidPassword) {
            return <Typography color={'#d90026'}>As senhas não coincidem</Typography>
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            gap={20}
        >
            {msgError && (<SimpleAlertError msg={msgError} />)}

            <Box width={'390px'} component="form" onSubmit={handleSubmit(onSubmit)}
                sx={{
                    backgroundColor: 'white',
                    padding: 5,
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: '#1B2730'
                }}
            >
                <Typography component="h1" variant="h5" color={'white'}>
                    Registro de Usuário
                </Typography>
                <Box sx={{ mt: 3 }} width={'100%'}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Nome"
                        {...register('name')}
                    />
                    {errors.name && <Typography color={'#d90026'}>{errors.name.message}</Typography>}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="userName"
                        label="Nome de usuário"
                        {...register('userName')}
                    />
                    {errors.userName && <Typography color={'#d90026'}>{errors.userName.message}</Typography>}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        autoComplete="email"
                        {...register('email')}
                    />
                    {errors.email && <Typography color={'#d90026'}>{errors.email.message}</Typography>}
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Senha"
                        type="password"
                        id="password"
                        {...register('password')}
                    />
                    {errors.password && <Typography color={'#d90026'}>{errors.password.message}</Typography>}
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Confirme a senha"
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword')}
                    />
                    {renderErrosPassword()}
                    <Box display={'flex'} gap={2} mt={2}>
                        <ButtonBase
                            onClick={() => navigate('/login')}
                            sx={{
                                width: '50%',
                                color: 'whitesmoke',
                                backgroundColor: '#990000',
                                padding: 1.5,
                                borderRadius: 2,
                                transition: '0.5s',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#d90026',
                                },
                            }}
                        >
                            Voltar
                        </ButtonBase>
                        <ButtonBase
                            onClick={handleSubmit(onSubmit)}
                            type='submit'
                            sx={{
                                width: '50%',
                                color: 'whitesmoke',
                                backgroundColor: '#28343E',
                                padding: 1.5,
                                borderRadius: 2,
                                transition: '0.5s',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#323d45',
                                },
                            }}

                        >
                            Confirmar
                        </ButtonBase>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                width: "35%",
                '@media (max-width: 900px)': {
                    display: 'none'
                },
            }}>
                <img src='/forms-animate.svg' width="100%" alt="Login" />
            </Box>
        </Box>

    );
};

export default Register;
