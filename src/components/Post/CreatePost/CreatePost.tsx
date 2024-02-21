import React, { useState } from 'react';
import { Box, Avatar, IconButton, Button } from '@mui/material';
import PostService from '../../../api/Service/PostService';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import GifRoundedIcon from '@mui/icons-material/GifRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import SendIcon from '@mui/icons-material/Send';
import { usePostList } from '../../../context/PostListContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { storage } from '../../../FirebaseConfig';
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '../../../context/UserContext';
import { StyledBox, StyledIconButton, StyledImage, StyledInputBase } from './CreatePostStyles';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [file, setFile] = useState<File | null>();
  const { addPost } = usePostList();
  const { userLogged } = useUser();

  const handlePost = async () => {
    if (content) {
      const imgUrlFirebase = file ? await uploadImageToFirebase(file) : undefined;
      const post = await PostService.createPost(content, imgUrlFirebase);
      if (post) {
        addPost(post);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setContent('');
    setIsHovered(false);
    setImgUrl('');
    setFile(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result as string;
        setImgUrl(newImage);
        setIsHovered(true)
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToFirebase = async (file: File) => {
    if (userLogged && file) {
      const imageRef = ref(storage, `imagePost/${file.name + v4()}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL
    }
  }

  const handleDeleteImg = async () => {
    setImgUrl('')
    setFile(null)
    setIsHovered(false)
  };

  const renderImage = () => {
    return (
      imgUrl && (
        <Box display={'flex'} flexDirection={'column'} alignItems={'end'} marginBottom={1}>
          <StyledImage src={imgUrl} loading="lazy" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '5px', maxHeight: '600px' }}/> 
          {isHovered && (
            <StyledIconButton onClick={handleDeleteImg}>
              <DeleteIcon color='secondary' />
            </StyledIconButton>
          )}
        </Box>
      )
    );
  };

  const renderInputUser = () => {
    return (
      <Box display={'flex'} alignItems={'center'} marginBottom={2}>
        <Avatar sx={{ width: 42, height: 42 }} src={userLogged?.filePath} />
        <StyledInputBase
          fullWidth
          multiline
          value={content}
          placeholder="No que você está pensando?"
          onChange={(e) => setContent(e.target.value)}
        />
      </Box>
    )
  }


  const renderContainerButtons = () => {
    return (
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginLeft={6}>
        <Box display={'flex'}>
          <label htmlFor="file-upload">
            <IconButton component="span">
              <AddPhotoAlternateRoundedIcon color="secondary" />
            </IconButton>
          </label>
          <input type="file" id="file-upload" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
          <IconButton >
            <GifRoundedIcon color="secondary" />
          </IconButton>
          <IconButton >
            <EmojiEmotionsRoundedIcon color="secondary" />
          </IconButton>
        </Box>
        <Button sx={{ borderRadius: 5, textTransform: 'none' }} color="secondary" onClick={handlePost} endIcon={<SendIcon />} />
      </Box>
    )
  }

  return (
    <StyledBox>
      {renderInputUser()}
      {renderImage()}
      {renderContainerButtons()}
    </StyledBox>
  );
};

export default CreatePost;