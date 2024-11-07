import { Box, Typography } from '@mui/material';
import AppLayout from '../../layouts/app.layout';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/auth.slice';

export default function Home() {
  const user = useSelector(selectUser)
  return (
    <AppLayout>
      <>
      <Box sx={{mb:4, ml: 2}}>
        <Typography variant='h5' sx={{textTransform: "capitalize"}}>Hola, {user?.name}</Typography>
      </Box>
        </>
    </AppLayout>
  );
}
