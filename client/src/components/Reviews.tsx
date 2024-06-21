import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  FormControl,
  TextareaAutosize
} from "@mui/material";

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

  const showReviews = () => {
    axios
      .get(`/api/albums/${album.artist}/${album.name}/reviews`)
      .then((response) => {
        if (response.data.error) {
          alert("Save album!");
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
        review
      )
      .then((response) => {
        setReviews((prev) => [...prev, response.data]);
        setReview({ text: "", rating: 5 });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert(error.response.data);
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

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Button variant="contained" onClick={() => navigate(`/search-results/${query}`)} sx={{ mb: 2 }}>
        &larr; Back to Search Results
      </Button>
      <Box sx={{ display: "flex", flexDirection: "column" }} mt={2}>
        <Typography variant="h1">Reviews</Typography>
        <Typography
          sx={{ marginBottom: "10px", fontSize: "2rem", fontWeight: "bold" }}
        >
          {album.name}
        </Typography>
        <Box sx={{ flex: 1, display: "flex", gap: {
          xs: "10px",
          sm: "90px"
        }, alignItems: "center", flexDirection: { xs: "column", sm: "row" }, mr: {
          xs: 1.5
        }}} >
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
              variant="outlined"
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
                  color="primary"
                  onClick={() => deleteReview(rev.id)}
                  sx={{ marginTop: "10px" }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setReview(rev)}
                  sx={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  Update
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">No reviews yet.</Typography>
        )}
      </div>
    </Container>
  );
};

export default Reviews;
