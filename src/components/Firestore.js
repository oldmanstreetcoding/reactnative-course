import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const Firestore = () => {
  const [name, setName] = useState('namina');

  const getUser = async () => {
    const userDoc = await firestore()
      .collection('users')
      .doc('h8pcfm9d9uEbGYYBVsmc')
      .get();

    setName(userDoc.data().name);
  };

  // Data Realtime
  const snapUser = () => {
    firestore()
      .collection('users')
      .doc('h8pcfm9d9uEbGYYBVsmc')
      .onSnapshot((doc) => {
        setName(doc.data().name);
      });
  };

  useEffect(() => {
    getUser();
    // snapUser();
  }, []);

  return (
    <>
      <Text>From Snap : {name}</Text>
    </>
  );
};

export default Firestore;
