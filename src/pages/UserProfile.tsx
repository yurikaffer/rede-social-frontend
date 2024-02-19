import Navbar from '../components/Navbar/Navbar';
import UserProfileCard from '../components/User/UserProfile/UserProfileCard';
import { Box } from '@mui/material';
import PostList from '../components/Post/PostList';

const UserProfile = () => {

  const style = {
    width: '90vh',
    '@media (max-width: 900px)': {
      width: '98%',
    }
  }

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        marginTop={5}
      >
        <Box sx={style}>
          <UserProfileCard />
          <PostList postsHome={false} />
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
