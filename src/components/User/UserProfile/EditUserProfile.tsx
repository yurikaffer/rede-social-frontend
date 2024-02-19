import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useUser } from '../../../context/UserContext';
import ModalComponent from '../../Modal/ModalComponent';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import UserService from '../../../api/Service/UserService';

interface EditUserProfileProps {
    isOpen: boolean
    onClose: () => void,
}

const useFormSchema = z.object({
    newPassword: z.string(),
    confirmPassword: z.string(),
    biography: z.string()
        .max(80, 'Você excedeu o número máximo de 80 caracteres'),
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

const EditUserProfile: React.FC<EditUserProfileProps> = ({ onClose, isOpen }) => {
    const { userLogged } = useUser();
    const [name, setName] = useState(userLogged?.name || '');
    const [biography, setBiography] = useState(userLogged?.biography || '');

    const [changePassword, setChangePassword] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const [display, setDisplay] = useState('none');

    useEffect(() => {
        changePassword ? setDisplay('') : setDisplay('none')
    }, [changePassword]);

    const { register, handleSubmit, formState: { errors } } = useForm<useFormType>({
        resolver: zodResolver(useFormSchema)
    });

    const onSubmit = async (data: useFormType) => {
        if (userLogged && validPassword(data)) {
            const updatedUser = {
                name: data.name,
                email: userLogged.email,
                password: data.newPassword, 
                userName: userLogged.userName,
                biography: data.biography
            };

            if (await UserService.updateUser(userLogged.id, updatedUser)) {
                onClose();
                window.location.reload();
            }
        }
    };

    const validPassword = (data: useFormType): boolean => {
        if (changePassword) {
            if ((data.newPassword === data.confirmPassword && data.newPassword !== '')) {
                setIsValidPassword(true)
                return true
            }
            setIsValidPassword(false)
            return false
        }
        setIsValidPassword(true)
        return true
    }

    const renderErrosPassword = () => {
        if (errors.confirmPassword) {
            return <Typography color={'#d90026'}>{errors.confirmPassword.message}</Typography>
        } else if (!isValidPassword && changePassword) {
            return <Typography color={'#d90026'}>As senhas não coincidem</Typography>
        }
    }

    return (
        <ModalComponent
            isOpen={isOpen}
            onClose={onClose}
        >
            <Typography color={'white'} variant="h5">
                Editar perfil
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={3} >
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="name"
                    label="Nome"
                    value={name}
                    onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    {...register('name')}
                />
                {errors.name && <Typography color={'#d90026'}>{errors.name.message}</Typography>}

                <TextField
                    margin="normal"
                    fullWidth
                    id="biography"
                    label="Biografia"
                    value={biography}
                    onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) => setBiography(e.target.value)}
                    {...register('biography')}
                />
                {errors.biography && <Typography color={'#d90026'}>{errors.biography.message}</Typography>}

                <TextField
                    margin="normal"
                    fullWidth
                    label="Nova senha"
                    type="password"
                    id="newPassword"
                    {...register('newPassword')}
                    sx={{ display:{display} }}
                />
                {errors.newPassword && <Typography color={'#d90026'}>{errors.newPassword.message}</Typography>}

                <TextField
                    margin="normal"
                    fullWidth
                    label="Confirme a senha"
                    type="password"
                    id="confirmPassword"
                    {...register('confirmPassword')}
                    sx={{ display:{display} }}
                />
                {renderErrosPassword()}
                    
                <Box display={'flex'} alignItems={'center'}>
                    <FormControlLabel sx={{ color: 'white' }}
                        control={
                            <Checkbox
                                checked={changePassword}
                                onChange={(e) => setChangePassword(e.target.checked)}
                                name="changePassword"
                                color="secondary"
                            />
                        }
                        label="Alterar senha"
                    />
                </Box>

                <Box display={'flex'} justifyContent={'end'} gap={1} marginTop={2}>
                    <ButtonBase
                        sx={{
                            width: '30%',
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
                        onClick={onClose}
                    >
                        Cancelar
                    </ButtonBase>
                    <ButtonBase
                        sx={{
                            width: '30%',
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
                        type='submit'
                    >
                        Confirmar
                    </ButtonBase>
                </Box>
            </Box>
        </ModalComponent>
    );
};

export default EditUserProfile;
