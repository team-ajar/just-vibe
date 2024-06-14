import React, { useState, useEffect } from "react";
import axios from "axios";
import { TopAlbums } from "@prisma/client";

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
}

//define the structure of a Album Object

interface Album {
  id: number;
  albumName: string;
  artistName: string;
  image: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    googleId: "",
    location: "",
    name: "",
    username: "",
  });

  //create another useState hook that will manage all of our savedAlbums
  //also use the typescript <[]> annotation to inform it's an array
  /** savedAlbums is the initial value of the empty array,
   * and setSavedAlbums is a function that will be used to update the savedAlbums array
   */
  const [albums, setAlbums] = useState<Album[]>([]); //Album is the interface defined above

  /**
   * we need a state that will set a TOP album
   */
  const [topAlbum, setTopAlbum] = useState<(TopAlbums | undefined)[]>([undefined, undefined, undefined]);

  const loadPage = () => {
    axios
      .get("/api/user")
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  };

  const editProfile = () => {
    let updateName = prompt("enter new name");
    axios
      .put(`/api/user/${user.id}`, {
        updateType: "name",
        updateVal: updateName,
      })
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  };

  const deleteProfile = () => {
    let answer = prompt("enter your username to delete:");
    const delUser = {
      id: 0,
      googleId: "",
      location: "",
      name: "",
      username: "",
    };
    if (answer === user.username) {
      axios.delete(`/api/user/${user.id}`).then(() => setUser(delUser));
    }
  };

  const getAlbums = () => {
    axios.get(`/api/top/albums/${user.id}`).then((response) => {
      console.log("SETALBUMS DATA", response.data.topAlbums);
      //invoke the setAlbums function to update the albums array in the state to the data.albums content
      setAlbums(response.data.albums);
      let topAlbum1 = response.data.topAlbums.find((album: TopAlbums) => album.position === 1);
      let topAlbum2 = response.data.topAlbums.find((album: TopAlbums) => album.position === 2);
      let topAlbum3 = response.data.topAlbums.find((album: TopAlbums) => album.position === 3);
      //
      setTopAlbum([topAlbum1, topAlbum2, topAlbum3]);
    });
  };

  const showSelectedAlbum = (
    newAlbumId: number,
    position: number,
    albumId: number
  ) => {
    //post request, at this location, we send a new albumId
    axios
      .post(`/api/top/albums/${albumId}/${position}/${user.id}`, {
        newAlbumId,
      })
      //once the content is posted to that location, we
      .then((response) => {
        //console.log("SHOW ALBUM", response);
        console.log(response.data)

        setTopAlbum((prev) => {
          prev[response.data.position - 1] = response.data
          return [...prev]
        });
      });
  };

  const deleteSelectedAlbum = (
    position: number,
    albumId: number | undefined
  ) => {
    //post request, at this location, we send a new albumId

    if (albumId === undefined) return
    axios
      .delete(`/api/top/albums/${albumId}/${position}/${user.id}`)
      //once the content is posted to that location, we
      .then((response) => {
        console.log("SHOW ALBUM", response);

        setTopAlbum((prev) => {
          return prev.map((topAlbum) => {
            if (topAlbum?.albumId === albumId) {
              return undefined;
            }
            return topAlbum;
          });
        });
      });
  };

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    //if the user id is 0, dont make the api call
    //because there is no user with the id of 0
    if (user.id === 0) {
      return; //if the user id is 0 stop execution, and dont get the album of the api call
    }
    getAlbums();
  }, [user]);

  const defaultImage =
    "https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png";
  let topAlbum1 = albums.find((album) => album.id === topAlbum[0]?.albumId);
  let topAlbum2 = albums.find((album) => album.id === topAlbum[1]?.albumId);
  let topAlbum3 = albums.find((album) => album.id === topAlbum[2]?.albumId);

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={() => editProfile()}>Edit profile</button>
      <button onClick={() => deleteProfile()}>Delete profile</button>
      <h3>Username: {user.username}</h3>
      <h4>Name: {user.name}</h4>
      <div>
        <h2>Top 3 Albums</h2>
        <div style={{ display: "flex" }}>
          <div>
            <img
              src={topAlbum1?.image || defaultImage}
              width="300"
              height="300"
            />
            <label>#1</label>
            <select
              value={topAlbum1?.id || ""}
              onChange={(e) => {
                console.log(e.target.value);
                if (e.target.value === "") return;
                showSelectedAlbum(
                  Number(e.target.value),
                  1,
                  topAlbum1?.id || 0
                );
              }}
            >
              {/* if this top album spot doesn't exist, show select album. if it does exist, dont show that option */}
              {!topAlbum1 && <option value="">Select Album</option>}
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.albumName}
                </option>
              ))}
            </select>
            <button onClick={() => deleteSelectedAlbum(1, topAlbum1?.id)} type="button">Delete</button>
          </div>

          <div>
            <img
              src={topAlbum2?.image || defaultImage}
              width="300"
              height="300"
            />
            <label>#2</label>
            <select
              value={topAlbum2?.id || ""}
              onChange={(e) => {
                console.log(e.target.value);
                if (e.target.value === "") return;
                showSelectedAlbum(
                  Number(e.target.value),
                  2,
                  topAlbum2?.id || 0
                );
              }}
            >
              {!topAlbum2 && <option value="">Select Album</option>}
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.albumName}
                </option>
              ))}
            </select>
            <button onClick={() => deleteSelectedAlbum(2, topAlbum2?.id)} type="button">Delete</button>
          </div>

          <div>
            <img
              src={topAlbum3?.image || defaultImage}
              width="300"
              height="300"
            />
            <label>#3</label>
            <select
              value={topAlbum3?.id || ""}
              onChange={(e) => {
                console.log(e.target.value);
                if (e.target.value === "") return;
                showSelectedAlbum(
                  Number(e.target.value),
                  3,
                  topAlbum3?.id || 0
                );
              }}
            >
              {!topAlbum3 && <option value="">Select Album</option>}
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.albumName}
                </option>
              ))}
            </select>
            <button onClick={() => deleteSelectedAlbum(3, topAlbum3?.id)} type="button">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
