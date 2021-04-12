import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SwipeButtons from '../components/SwipeButtons';
import TinderCards from '../components/TinderCards';
import { selectUserData } from '../features/userSlice';
import db from '../firebase';


const Home = () => {
  const [users, setUsers] = useState([]);
  const userData = useSelector(selectUserData); 
  const childRefs = useMemo(() => Array(users.length).fill(0).map(i => React.createRef()), [users])

  const leftSwipe = () => { console.log("left") }
  const rightSwipe = () => { console.log("right") }

  useEffect(() => console.log(userData), [userData]);
  useEffect(() => console.log(users), [users]);
  // limit ting
  useEffect(() => {
    if (!userData) return;

    const unsubscribe = db
    .collection('users')
    .onSnapshot(snapshot => {
      console.log(snapshot)
      const userDocs = snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));
      setUsers(userDocs);
    })

    return unsubscribe;

    // const unsubscribe = db
    // .collection('people')
    // .onSnapshot(snapshot => {
    //   const userDocs = snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));
    //   setUsers(userDocs);
    // })

    // return unsubscribe;
  }, [userData]);

  const swipe = (dir) => { 
    if (users.length) {
      childRefs[users.length - 1].current.swipe(dir) // Swipe the card!
    }
  }

  return (
    <HomeContainer>
      <TinderCards users={users} childRefs={childRefs} setUsers={setUsers} />
      <SwipeButtons swipe={swipe}  />
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
