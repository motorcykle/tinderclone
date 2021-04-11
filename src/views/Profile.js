import { Avatar, Button, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUser, selectUserData } from '../features/userSlice';
import db, { auth, storeage } from '../firebase';
import FileUploader from "react-firebase-file-uploader";
import { v4 as uuidv4 } from 'uuid';
import { Add } from '@material-ui/icons';

const Profile = () => {
  const user = useSelector(selectUser);
  const userData = useSelector(selectUserData); 
  const [change, setChange] = useState(false);
  const [photos, setPhotos] = useState([]);

  const [desc, setDesc] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [preference, setPreference] = useState("");

  useEffect(() => {
    if (userData) {
      setDesc(userData.profile.description)
      setAge(userData.user.age)
      setGender(userData.user.gender)
      setPreference(userData.user.preference)
    }
  }, [userData])

  const userDoc = db
    .collection('users')
    .doc(user?.uid);

  const setChosenImage = (url) => {
    userDoc.update({ "profile.chosenImage": url });
  }

  const onChangeMethod = (target, setter, original) => {
    setter(prev => {
      if (prev !== target.value) setChange(true)
      return target.value
    })
  }

  useEffect(() => {
    const unsubscribe = userDoc
      .onSnapshot((doc) => {
        setPhotos(doc.data()?.profile.images);
      });
    return unsubscribe;
  }, [user])

  const handleUploadSuccess = (filename) => {
    storeage
      .ref(user.uid)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        userDoc.update({
            "profile.images": firebase.firestore.FieldValue.arrayUnion(url)
        });
        if (!userData?.profile.chosenImage) setChosenImage(url);
      });
  };

  return (
    <ProfileContainer>
      <div className="container">
        <div className="header">
          <div className="header__title">
            <Avatar src={user?.photoURL} />
            <p>Profile - </p>
          </div>
          
          <div className="header__btns">
            <Button variant="outlined" onClick={() => auth.signOut()}>LOGOUT</Button>
            { change &&
            <Button 
              variant="contained" 
              color="secondary" 
              className="headerSave__btn" 
              onClick={() => console.log("save")}>
                SAVE
            </Button>
            }
          </div>
        </div>
        <div className="body">

          <h2>{user?.displayName}</h2>

          <div className="body__images">

            <div className="firstImage__container imageContainer">
              {userData?.profile.chosenImage && <img src={userData?.profile.chosenImage} alt=""/>}
            </div>
            <div className="otherImages">
              {photos?.length ? photos.slice(1).map(photo => {
                const urlParams = new URLSearchParams(photo);
                const token = urlParams.get('token');
                console.log(token)
                return (
                  <div key={token} className="otherImage__container imageContainer">
                    <img src={photo} alt=""/>
                  </div>
                )
              }) : ""}
              <label className="addImage otherImage__container">
                <Add fontSize="large" />
                
                <small>Add Image</small>
                <FileUploader
                  hidden
                  filename={uuidv4()}
                  accept="image/*"
                  storageRef={storeage.ref(user.uid)}
                  onUploadSuccess={handleUploadSuccess}
                />
              </label>
            </div>
          </div>

          <textarea 
          value={desc}
          onChange={({target}) => onChangeMethod(target, setDesc)}
          placeholder="Type your description here...">
          </textarea>

          <div className="options">
            <div className="radioSection">
              <FormLabel component="legend">My gender is</FormLabel>
              {/* value={value} onChange={handleChange} */}
              <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={({target}) => onChangeMethod(target, setGender)}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </div>

            <div className="radioSection">
              <FormLabel component="legend">I'm looking for ...</FormLabel>
              {/* value={value} onChange={handleChange} */}
              <RadioGroup aria-label="lookingfor" name="gender2" value={preference} onChange={({target}) => onChangeMethod(target, setPreference)}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </div>

            <TextField 
            type="number" 
            id="outlined-basic" 
            label="My age is" 
            variant="outlined"
            value={age}
            onChange={({target}) => onChangeMethod(target, setAge)} />
          </div>

        </div>
      </div>
    </ProfileContainer>
  );
}

export default Profile;

const ProfileContainer = styled.div`
  flex: 1;
  width: 100%;
  .container {
    
  }
  .header {
    padding: 1em .5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header__title {
      display: flex;
      align-items: center;
    }
    .headerSave__btn {
      margin-left: 10px;
      color: #fff;
      box-shadow: none;
    }
    p {
      font-size: 1.8rem;
      color: grey;
      font-weight: 400;
      margin-left: 10px;
    }
    button {
      font-size: 1rem;
      color: grey;
    }
  }
  .body {
    padding: 1em .5em;
    display: grid;
    place-items: center;
    /* hello */
    h2 {
      font-weight: 600;
      text-decoration: underline;
    }
    .body__images {
      margin: 1rem 0;
      display: flex;
      justify-content: center;
      @media (max-width: 480px) {
        flex-wrap: wrap;
      } 
      .otherImages {
        display: flex;
        flex-wrap: wrap;
        justify-items: center;
        align-content: flex-start;
        @media (max-width: 480px) {
          justify-content: center;
        }
        .addImage {
          border: 2px solid grey;
          display: grid;
          place-items: center;
          place-content: center;
          border-radius: 25px;
          cursor: pointer;
          @media (max-width: 480px) {
            width: 70px;
            height: 70px;
            small {
              font-size: .5rem;
            }
          }
        }
      }
    }
    .imageContainer {
      border-radius: 25px;
      overflow: hidden;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    }
    .firstImage__container {
      max-width: 350px;
      max-height: 350px;
      margin-bottom: 10px;
      @media (min-width: 480px) {
        margin-right: 1rem;
      }
    }
    .otherImage__container {
      width: 100px;
      height: 100px;
      @media (max-width: 480px) {
        width: 50px;
        height: 50px;
      }
      margin: 5px;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    textarea {
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
      width: 100%;
      height: 25vh;
      background-color: transparent;
      border: 1px solid lightgrey;
      border-radius: 25px;
      padding: 1.3em;
      outline: none;
      margin-bottom: 2rem;
    }
    .options {
      width: 100%;
      .radioSection {
        margin-right: 2em;
        margin-bottom: .5em;
      }
    }
  }
`;