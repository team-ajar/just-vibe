import axios from "axios";
import { assert } from "chai";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

describe("ProfileController", () => {
  it("Allow a user to edit their profile", async () => {
    const username = "username"
    const name = "name"
    const bio = "bio"
    const userId = 1;

    const response = await instance.patch(
      `/api/user/${userId}`,
      {
        username,
        name,
        bio
      }
    );

    assert.equal(response.data.name, name);
    assert.equal(response.data.username, username);
    assert.equal(response.data.bio, bio);
    assert.equal(response.data.id, userId);
  })
})