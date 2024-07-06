import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import { Container, Typography, Card, CardContent, CardMedia, Button, Select, MenuItem, Box } from "../style";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const HomePage = () => {
  const [albumOfTheDay, setAlbumOfTheDay] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newAlbumId, setNewAlbumId] = useState<number | null>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const today = dayjs().format('dddd, MMMM D, YYYY');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios.get('/api/album-of-the-day')
      .then(response => {
        if (response.data) {
          setAlbumOfTheDay(response.data);
        } else {
          setErrorMessage('No album of the day set for today. Search for an album and set it as your album of the day!');
        }
      })
      .catch(error => {
        console.error('Error fetching album of the day', error);
        setErrorMessage('Error fetching album of the day');
      });

    axios.get('/api/music/albums')
      .then(response => {
        setAlbums(response.data);
      })
      .catch(error => {
        console.error('Error fetching albums', error);
        setErrorMessage('Error fetching albums');
      });
  }, []);

  const deleteAlbumOfTheDay = (id: number) => {
    axios.delete(`/api/album-of-the-day/${id}`)
      .then(() => {
        setAlbumOfTheDay(null);
        setErrorMessage('Album of the day has been deleted.');
      })
      .catch(error => {
        console.error('Error deleting album of the day', error);
        setErrorMessage('Error deleting album of the day');
      });
  };

  const editAlbumOfTheDay = (id: number, newAlbumId: number) => {
    axios.put(`/api/album-of-the-day/${id}`, { id, albumId: newAlbumId, userId: albumOfTheDay.user.id })
      .then(() => {
        axios.get('/api/album-of-the-day')
          .then(response => {
            if (response.data) {
              setAlbumOfTheDay(response.data);
              setIsEditing(false);
              setErrorMessage('Album of the day has been updated.');
            } else {
              setErrorMessage('Error fetching updated album of the day');
            }
          })
          .catch(error => {
            console.error('Error fetching updated album of the day', error);
            setErrorMessage('Error fetching updated album of the day');
          });
      })
      .catch(error => {
        console.error('Error editing album of the day', error);
        setErrorMessage('Error editing album of the day');
      });
  };

  const handleEditClick = () => {
    if (isEditing && newAlbumId) {
      editAlbumOfTheDay(albumOfTheDay.id, newAlbumId);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Typography variant="h1" gutterBottom>Welcome!</Typography>
      <Typography variant="body1" gutterBottom>{today}</Typography>
      <Typography variant="h2" gutterBottom>Your Album of The Day</Typography>
      {albumOfTheDay ? (
        <Box display="flex" justifyContent="flex-start" flexDirection={isMobile ? 'column' : 'row'}>
          <Card sx={{ width: isMobile ? 300 : '100%', display: isMobile ? 0 : 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
            <CardMedia
              component="div"
              sx={{
                width: isMobile ? '100%' : 200,
                height: isMobile ? 0 : 200,
                paddingTop: isMobile ? '100%' : 0,
                backgroundImage: `url(${albumOfTheDay.album.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h3">{albumOfTheDay.album.albumName}</Typography>
              <Typography variant="body2">{albumOfTheDay.album.artistName}</Typography>
              {isEditing && (
                <Box mt={2}>
                  <Select
                    value={newAlbumId || ''}
                    onChange={(e) => setNewAlbumId(Number(e.target.value))}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="" disabled>Select an album</MenuItem>
                    {albums.map(album => (
                      <MenuItem key={album.id} value={album.id}>
                        {album.albumName} by {album.artistName}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="contained" color="secondary" onClick={handleEditClick}>
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
                <Button variant="contained" color="primary" onClick={() => deleteAlbumOfTheDay(albumOfTheDay.id)}>Delete</Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Typography variant="body1">{errorMessage}</Typography>
      )}
    </Container>
  );
};

export default HomePage;
