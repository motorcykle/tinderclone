import { Button, IconButton } from '@material-ui/core';
import { ArrowBack, ArrowForward, Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { removeProfileUID, selectProfileUID } from '../features/appSlice';
import db, { storeage } from '../firebase';

const ViewProfile = () => {
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);
  const uid = useSelector(selectProfileUID);

  const removeUID = (e) => {
    dispatch(removeProfileUID())
  };

  useEffect(() => {
    db.collection('users').doc(uid).onSnapshot(snapshot => {
      console.log(snapshot)
    })
  }, [uid])

  useEffect(() => {
    storeage
      .ref(uid)
      .listAll()
      .then( async list => {
        const listTing = await Promise.all(list.items.map( async item => await item.getDownloadURL()))
        setPhotos(listTing)
      });
  }, [uid])

  return (
    <ViewProfileContainer onClick={removeUID}>
      <div className="profile" onClick={e => e.stopPropagation()}>
        <IconButton className="close__btn" onClick={removeUID}>
          <Close />
        </IconButton>

        <div className="card" style={{ backgroundImage: `url('https://instagram.farn1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/166828320_1217719698686529_4384029468339889115_n.jpg?tp=1&_nc_ht=instagram.farn1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=0vVXI0hVB0gAX_Pk1i-&edm=AP_V10EAAAAA&ccb=7-4&oh=6b7b8cccf4b1cc67685ca2ada0c1b95f&oe=6091AF00&_nc_sid=4f375e')`}}>
          <img src={'https://instagram.farn1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/166828320_1217719698686529_4384029468339889115_n.jpg?tp=1&_nc_ht=instagram.farn1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=0vVXI0hVB0gAX_Pk1i-&edm=AP_V10EAAAAA&ccb=7-4&oh=6b7b8cccf4b1cc67685ca2ada0c1b95f&oe=6091AF00&_nc_sid=4f375e'} alt=""/>
          <div className="btns">
            <IconButton>
              <ArrowBack />
            </IconButton>

            <IconButton>
              <ArrowForward />
            </IconButton>
          </div>
        </div>

        <div className="profile__body">
          <h2>Bhad Bhabie, 18</h2>
        </div>
        
      </div>
    </ViewProfileContainer>
  );
}

export default ViewProfile;

const ViewProfileContainer = styled.div`
  position: fixed;
  z-index: 1000;
  background-color: rgba(255, 255, 255, .3);
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  
  .profile {
    overflow: scroll;
    position: relative;
    height: 90vh;
    width: 90vw;
    background-color: whitesmoke;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    border-radius: 25px;
    padding: 20px;
    > .close__btn {
      z-index: 9999;
      position: fixed;
      right: 3vw;
      top:  2vw;
      color: white;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
      background: rgb(255,112,112);
      background: linear-gradient(90deg, rgba(255,112,112,1) 0%, rgba(252,70,107,1) 100%);
    }
    .card {
      overflow: hidden;
      /* width: 80vw; */
      position: relative;
      height: 75vh;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: rgba(0, 0, 0, 0.1);
      background-blend-mode: overlay; 
      border-radius: 25px;
      margin: auto;
      display: flex;
      justify-content: center;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
      img {
        height: 100%;
        object-fit: contain;
        margin: 0 auto;
      }
      .btns {
        padding: 0 5px;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        width: 100%;
        > button {
          background-color: rgba(1, 1, 1, 0.3);
        }
      }
    }
    .profile__body {
      h2 {
        margin: 1em 0;
        font-weight: 500;
        padding-bottom: 7.5px;
        border-bottom: 1px solid lightgrey;
      }
    }
  }
`;