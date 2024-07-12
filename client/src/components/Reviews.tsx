import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  FormControl,
  TextareaAutosize,
  Modal,
} from "../style";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Review {
  text: string;
  rating: number;
  userId: number;
  id: number;
}

interface LocationState {
  album: {
    id: number;
    image: any;
    name: string;
    artist: string;
  };
  query: string;
}

const Reviews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { album, query } = location.state as LocationState;

  const [userId, setUserId] = useState<null | number>(null);
  const [review, setReview] = useState<{
    text: string;
    rating: number;
    id?: number;
  }>({ text: "", rating: 5, id: undefined });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [show, setShow] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const showReviews = () => {
    axios
      .get(`/api/albums/${album.artist}/${album.name}/reviews`)
      .then((response) => {
        if (response.data.error) {
          setSnackbarMessage("Save album!");
          setSnackbarOpen(true);
          return;
        }
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving reviews:", error);
      });
  };

  const createReview = () => {
    if (!userId) {
      return;
    }
    axios
      .post(
        `/api/albums/${album.artist}/${album.name}/review/${userId}`,
        //to find a album we only need the userId, artistName and albumName
        //if it ISN'T found, we create it, and to create it we will also need the album image
        //pass the neccessary content to create a album, incase the album is not saved already
        {
          ...review, //since to the server the review object AND the album image
          image: album.image[3]["#text"],
        }
      )
      .then((response) => {
        setReviews((prev) => [...prev, response.data]);
        setReview({ text: "", rating: 5 });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setSnackbarMessage(error.response.data);
          setSnackbarOpen(true);
        }
        console.error("Error creating review:", error);
      });
  };

  const deleteReview = (reviewId: number) => {
    if (!userId) {
      return;
    }
    axios
      .delete(`/api/albums/review/${reviewId}/${userId}`)
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== reviewId));
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
    handleModalClose();
  };

  const updateReview = (reviewId?: number) => {
    if (!reviewId || !userId) {
      return;
    }
    axios
      .put(`/api/albums/review/${reviewId}/${userId}`, review)
      .then((response) => {
        setReviews(
          reviews.map((existingReview) =>
            existingReview.id === reviewId ? response.data : existingReview
          )
        );
        setReview({ text: "", rating: 5 });
      })
      .catch((error) => {
        console.error("Error updating review:", error);
      });
  };

  useEffect(() => {
    if (!album) return;
    showReviews();
    return () => {
      setReviews([]);
    };
  }, [album]);

  useEffect(() => {
    axios.get(`api/user`).then((response) => {
      if (response.status === 404) {
        return;
      }
      setUserId(response.data.id);
    });
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleModalClose = () => {
    setShow(false);
  };

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Button
        variant="contained"
        onClick={() => navigate(`/search-results/${query}`)}
        sx={{ mb: 2 }}
      >
        &larr; Back to Search Results
      </Button>
      <Box sx={{ display: "flex", flexDirection: "column" }} mt={2}>
        <Typography variant="h1">Reviews</Typography>
        <Typography
          sx={{ marginBottom: "10px", fontSize: "2rem", fontWeight: "bold" }}
        >
          {album.name}
        </Typography>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            gap: {
              xs: "10px",
              sm: "90px",
            },
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            mr: {
              xs: 1.5,
            },
          }}
        >
          <img
            src={album.image[3]["#text"]}
            alt={`${album.name} album cover`}
            style={{
              maxWidth: "100%",
              height: "auto",
              width: "500px",
              boxShadow: "10px 10px 0px #000",
              border: "2px solid #000",
            }}
          />
          <FormControl>
            <Typography
              variant="h5"
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              What did you think of the album?
            </Typography>
            <TextareaAutosize
              maxLength={18800}
              placeholder="Write review here"
              minRows={6}
              value={review.text}
              onChange={(e) => setReview({ ...review, text: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid #000",
                boxShadow: "5px 5px 0px #000",
                borderRadius: "0px",
                marginBottom: "20px",
                fontSize: "1rem",
                fontFamily: "Arial, sans-serif",
              }}
            ></TextareaAutosize>
            <Button
              variant="contained"
              color="primary"
              onClick={createReview}
              sx={{
                borderRadius: "0px",
                textTransform: "none",
                boxShadow: "5px 5px 0px #000",
                "&:hover": {
                  boxShadow: "7px 7px 0px #000",
                },
                ml: 1,
              }}
            >
              Submit Review
            </Button>
          </FormControl>
          {review.id && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => updateReview(review.id)}
              sx={{ marginLeft: "10px" }}
            >
              Update Review
            </Button>
          )}
        </Box>
      </Box>
      <div>
        <h2>All Reviews</h2>
        {reviews.length ? (
          reviews.map((rev) => (
            <Card
              key={rev.id}
              sx={{ marginBottom: "20px", boxShadow: "5px 5px 0px #000" }}
            >
              <CardContent>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {rev.text}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setReview(rev)}
                  sx={{ marginTop: "10px" }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShow(true)}
                  sx={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  Delete
                </Button>
              </CardContent>
              <Modal open={show} onClose={handleModalClose}
              sx={{
                top: isMobile ? "10%" : "10%",
                left: isMobile ? "10%" : "25%",
                width: isMobile ? "100%" : "100%",
                display: isMobile ? "block" : "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
              }}>
                <Box
                  sx={{
                    // width: 0.25,
                    // height: 0.25,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: "5px 5px 0px #000",
                    p: 10,
                    // alignContent: "center",
                    position: "fixed",
                    top: "25%",
                    left: "25%",
                  }}
                >
                  <Typography variant="h4">
                    Are you sure you want to delete your review?
                  </Typography>
                  <Button
                    onClick={() => deleteReview(rev.id)}
                    color="primary"
                    variant="contained"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </Button>
                </Box>
              </Modal>
            </Card>
          ))
        ) : (
          <Typography variant="body1">No reviews yet.</Typography>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent message={snackbarMessage} />
      </Snackbar>
    </Container>
  );
};

export default Reviews;
