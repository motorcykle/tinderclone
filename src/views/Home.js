import React, { useEffect, useMemo, useState } from 'react';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SwipeButtons from '../components/SwipeButtons';
import TinderCards from '../components/TinderCards';
import { selectUser, selectUserData } from '../features/userSlice';
import db from '../firebase';


const Home = () => {
  const [users, setUsers] = useState([]);
  const userData = useSelector(selectUserData);
  const user = useSelector(selectUser); 
  const childRefs = useMemo(() => Array(users.length).fill(0).map(i => React.createRef()), [users])

  const userDoc = db
    .collection('users')
    .doc(user?.uid);

  const swipeHandler = (dir) => {
    const group = dir === "left" ? "lefts" : "rights";
    console.log("adding", users[users.length - 1], "to this user's", group);
    const userId = users[users.length - 1].id;
    userDoc.update({
      swipedOn: firebase.firestore.FieldValue.arrayUnion(userId)
    });
    if (dir === "right") {
      userDoc.update({
        swipedRight: firebase.firestore.FieldValue.arrayUnion(userId)
      });
      db
        .collection('users')
        .doc(userId)
        .get()
        .then((doc) => {
          console.log(doc.data()?.swipedRight)
          if (doc.data()?.swipedRight.find((uid) => uid === user.uid)) {
            db.collection('matches').add({
              participants: [userId, user?.uid],
              lastMessage: null,
              timestamp: firebase.firestore.Timestamp.now()
            })
          }
        })
    }
  }

  useEffect(() => console.log(userData), [userData]);
  useEffect(() => console.log(users), [users]);
  // limit ting
  useEffect(() => {
    if (!userData) return;

    const unsubscribe = db
      .collection('users')
      // .where('user.uid', '!=', userData?.user.uid)
      .where('user.uid', 'not-in', userData?.swipedOn)
      .onSnapshot(snapshot => {
        console.log(snapshot)
        const userDocs = snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));
        setUsers(userDocs);
      })

    return unsubscribe;
  }, [userData]);

  const swipe = (dir) => { 
    if (users.length) {
      childRefs[users.length - 1].current.swipe(dir) // Swipe the card!
    }
  }

  return (
    <HomeContainer>
      <TinderCards users={users} childRefs={childRefs} setUsers={setUsers} swipeHandler={swipeHandler} />
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
