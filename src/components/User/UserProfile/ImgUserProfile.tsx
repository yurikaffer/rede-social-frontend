import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import UserService from '../../../api/Service/UserService';
import { UserInterface } from '../../../interface/UserInterface';
import { storage } from '../../../FirebaseConfig';
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '../../../context/UserContext';
import ConfirmationModal from '../../Modal/ConfirmationModal';

interface ImgUserProfileProps {
    user: UserInterface
}

const ImgUserProfile: React.FC<ImgUserProfileProps> = ({ user }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [downloadURL, setDownloadURL] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { userLogged } = useUser()

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const uploadImageToFirebase = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (userLogged && file) {
            const imageRef = ref(storage, `imageUser/${file.name + v4()}`);
            try {
                await uploadBytes(imageRef, file);
                setDownloadURL(await getDownloadURL(imageRef))
                setIsModalOpen(true)
            } catch (error) {
                console.error('Erro ao enviar imagem para o Firebase:', error);
            }
        }
    }

    const onConfirm = async () => {
        await UserService.uploadFile(downloadURL)
        window.location.reload();
    }

    const onClose = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <Box onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} sx={{ position: 'relative', display: 'inline-block' }}>
                <img
                    src={user.filePath ? user.filePath : '/upload-icon.png'}
                    loading="lazy"
                    alt=""
                    style={{ 
                        objectFit: 'cover', 
                        width: '200px', 
                        height: '200px', 
                        borderRadius: '50%'
                    }}
                />
                {isHovered && (user.id === userLogged?.id) && (
                    <label htmlFor="image-upload">
                        <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '5px',
                                backgroundColor: '#28343E',
                                borderRadius: '10%'
                            }}
                            component="span" // Permite que o IconButton seja clicável
                        >
                            <EditIcon color='secondary' />
                        </IconButton>
                    </label>
                )}
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={uploadImageToFirebase}
                />
            </Box>
            {isModalOpen && (<ConfirmationModal
                    message={"Tem certeza de que deseja utilizar essa foto?"}
                    isOpen={isModalOpen}
                    onClose={onClose}
                    onConfirm={onConfirm}
                    imgString={downloadURL}
                />)}
        </>
    )
}

export default ImgUserProfile