// React Native Login System dengan Backend Firebase

import React, {useEffect, useState} from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
} from 'native-base';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '406172679247-rrschom1qred7tml1hgamaq6n778rkat.apps.googleusercontent.com',
});

function LoginApp() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return <Text>Login</Text>;
  }

  return <Text>Welcome {user.email}</Text>;
}

const Login = () => {
  const regUser = () => {
    auth()
      .createUserWithEmailAndPassword(
        'gana.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const logIn = () => {
    auth()
      .signInWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <Container>
      <Header />
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>LOGIN</Text>
          </CardItem>
          <CardItem bordered>
            <Text />
            <Body>
              <Button block success onPress={regUser}>
                <Text>REGISTER</Text>
              </Button>
              <Button block warning onPress={logIn}>
                <Text>LOGIN</Text>
              </Button>
              <Button
                block
                info
                onPress={() =>
                  onGoogleButtonPress().then(() =>
                    console.log('Signed in with Google!'),
                  )
                }>
                <Text>GOOGLE</Text>
              </Button>
              <Button block danger onPress={logOut}>
                <Text>LOGOUT</Text>
              </Button>
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <LoginApp />
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Login;
