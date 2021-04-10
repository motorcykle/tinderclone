import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import SwipeButtons from '../components/SwipeButtons';
import TinderCards from '../components/TinderCards';
import db from '../firebase';


const Home = () => {
  const [users, setUsers] = useState([]);
  const childRefs = useMemo(() => Array(users.length).fill(0).map(i => React.createRef()), [users])

  useEffect(() => {
    const unsubscribe = db
    .collection('people')
    .onSnapshot(snapshot => {
      const userDocs = snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));
      setUsers(userDocs);
    })

    return unsubscribe;
  }, []);

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
