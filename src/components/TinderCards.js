import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import TinderCard from 'react-tinder-card';
import styled from 'styled-components';
import db from '../firebase';

const TinderCards = ({ users, setUsers, childRefs }) => {
  return (
    <TinderCardsContainer>
      <div className="cards__container container">
      {users.map((user, index) => (
        <TinderCard
          ref={childRefs[index]}
          className="swipe"
          onSwipe={(dir) => {
            console.log(dir)
            
          }}
          onCardLeftScreen={() => setUsers(prev => prev.slice(0, prev.length - 1))}
          preventSwipe={['up', 'down']}
          key={user.id}
        >
          <div className="card" style={{ backgroundImage: `url(${user.data.url})`}}>
            <img src={user.data.url} alt=""/>
            <h3>{user.data.name}</h3>
          </div>
        </TinderCard>
      ))}
      </div>
    </TinderCardsContainer>
  );
}

export default TinderCards;

const TinderCardsContainer = styled.div`
  flex: 1;
  display: flex;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .card {
    overflow: hidden;
    position: relative;
    width: 80vw;
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
    h3 {
      background-color: whitesmoke;
      padding: 10px 20px;
      border-radius: 25px;
      color: #fe3c72;
      text-align: center;
      min-width: 200px;
      width: fit-content;
      position: absolute;
      bottom: 20px;
    }
  }

  .swipe {
    position: absolute;
  }
`;

// [
//   { name: "Kylie Jenner", url: "https://instagram.farn1-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/134180963_418667435987935_5965094163892432827_n.jpg?tp=1&_nc_ht=instagram.farn1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=It9DpuQxnhEAX_Bui_L&edm=AP_V10EAAAAA&ccb=7-4&oh=638b68ec69238c8e1a62e00239651f9f&oe=6091031A&_nc_sid=4f375e", id:"0" },
//   { name: "Cardi B", url: "https://instagram.farn1-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/129715863_237773897683886_2930395826025004301_n.jpg?tp=1&_nc_ht=instagram.farn1-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=20vbC3hh3CkAX8EjXzv&edm=AP_V10EAAAAA&ccb=7-4&oh=f00a46806c7e0f5557687a72aed801fd&oe=6091736F&_nc_sid=4f375e", id:"1" },
//   { name: "Sommer Ray", url: "https://instagram.farn1-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/133926308_739358250116136_5003557919553765790_n.jpg?tp=1&_nc_ht=instagram.farn1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=ucy5nengFg0AX8Zpn45&edm=AP_V10EAAAAA&ccb=7-4&oh=06f67d82a6d90b9dd4005d5a96566389&oe=60933CF4&_nc_sid=4f375e", id:"2" },
//   { name: "Bhad Bhabie", url: "https://instagram.farn1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/166828320_1217719698686529_4384029468339889115_n.jpg?tp=1&_nc_ht=instagram.farn1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=0vVXI0hVB0gAX_Pk1i-&edm=AP_V10EAAAAA&ccb=7-4&oh=6b7b8cccf4b1cc67685ca2ada0c1b95f&oe=6091AF00&_nc_sid=4f375e", id:"3" },
// ]