import { useContext, useState } from 'react';
import { Button, TextField, Grid, Container, FormControl } from '@mui/material';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import auth from '../../Firebase/Config';
import { userContext } from '../UserContext/UserContext';

const classes = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  submit: {
    margin: '5px',
  },
  formControl: {
    minWidth: '100%',
    marginTop: '2vh',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '60%',
  },
  authNavigateText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'blue',
  },
};

const FormAuth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { newUser } = useContext(userContext);

  const handleChangeInput =
    name =>
    ({ target: { value } }) => {
      switch (name) {
        case 'email':
          setEmail(value);
          break;
        case 'password':
          setPassword(value);
          break;
        case 'displayName':
          setDisplayName(value);
          break;

        default:
          break;
      }
    };

  //onRegister : onLogin
  const onRegister = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(userCredential);
      })
      .catch(({ error }) => {
        // setErrorMessage(`${error.code} : ${error.message}`);
        // ..
        // ..
      });
    await updateProfile(auth.currentUser, { displayName }).then(res => {
      console.log('res', res);
      //   newUser({ user });
    });
    newUser({ user: auth.currentUser });
  };

  const onAuthGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const onLogin = () => {};

  return (
    <Container component="main" maxWidth="xs" style={classes.paper}>
      <h1>{isRegister ? 'REGISTER' : 'LOGIN'}</h1>
      {errorMessage && <p>{errorMessage}</p>}

      <Grid item xs={12}>
        <FormControl variant="outlined" style={classes.formControl}>
          <TextField
            autoComplete={email || 'Email'}
            name="email"
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email"
            value={email}
            onChange={handleChangeInput('email')}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" style={classes.formControl}>
          <TextField
            autoComplete={displayName || 'DisplayName'}
            name="displayName"
            variant="outlined"
            required
            fullWidth
            id="displayName"
            label="displayName"
            value={displayName}
            onChange={handleChangeInput('displayName')}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" style={classes.formControl}>
          <TextField
            autoComplete={password || 'Password'}
            name="password"
            variant="outlined"
            required
            fullWidth
            id="password"
            label="Password"
            value={password}
            onChange={handleChangeInput('password')}
          />
        </FormControl>
      </Grid>
      <div className={classes.buttonsWrapper}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={classes.submit}
          onClick={isRegister ? onRegister : onLogin}
        >
          {isRegister ? 'REGISTER' : 'LOGIN'}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={classes.submit}
          onClick={onAuthGoogle}
        >
          <a
            href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=665888736356-aq6fvfmau6mupt4nfbms5tfch0u2698i.apps.googleusercontent.com&prompt=consent&redirect_uri=https%3A%2F%2Fkapusta-backend.goit.global%2Fauth%2Fgoogle-redirect&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile"
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
          >
            Google
          </a>
        </Button>
        <div
          className={classes.authNavigateText}
          onClick={() => setIsRegister(!isRegister)}
        >
          <p>{isRegister ? 'go login >>' : 'go register >>'}</p>
        </div>
      </div>
    </Container>
  );
};

export default FormAuth;
