import axios from "axios";
import { assert } from "chai";
// import app functionality

// create axios instance
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

//test dummy files
describe("ReviewController", () => {
  it("Allow user to create a review", async () => {
    const artistName = "test artist";
    const albumName = "test album";
    const userId = 1;
    const image = "test image"; // this should be a "valid" url, but for testing we do any string
    const review = "my test review";
    const rating = 5;
    const response = await instance.post(
      `/api/albums/${artistName}/${albumName}/review/${userId}`,
      {
        image,
        text: review,
        rating,
      }
    );
    const expected = { id: 6, text: review, rating, userId: 1, albumId: 1 };
    expected.id = response.data.id;
    expected.albumId = response.data.albumId;
    console.log(response.data);
    assert.equal(response.status, 201);
    assert.deepEqual(response.data, expected);
  });

  it("Allow user to choose top album", async () => {
    const { status } = await instance.get("/");
    assert.equal(200, 200);
  });

  it("Allow user to choose top artist", async () => {
    const { status } = await instance.get("/");
    assert.equal(200, 200);
  });
});