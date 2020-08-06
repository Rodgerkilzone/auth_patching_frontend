import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { addToken } from '../../redux/action/addToken';
import { authUpdate } from '../../redux/action/authUpdate';
import config from '../../config.json';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({

  root: {
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: '10',
    width: '50%',
    maxWidth: 600,
    marginTop:20,
    minWidth: 400,
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 5px 0 rgba(0, 0, 0, .23)',
    zIndex: 10,
  },
  logo: {
    backgroundImage: 'url(/images/12182477.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: 150,
    width: 150
  },
  textField: {
    margin: 10
  },
  signInButton: {
    margin: 10,
  },
  title: {
    color: '#0D47A1',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  card_title: {
    width: '100%'
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(5px)'
  }
}));

const SignIn = props => {
  const { history } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]=useState('');
  const onSubmit = async() => {


    if (username.trim() === '' || password.trim() === '') {
    
      setError('Please fill in all the fields');
    } else {
  setLoading(true)
      const url = config.baseUrl+'/api/v1/signin';
      console.log(url)
      let body={
        username:username,
        password:password
      }
      let requestOptions = {
        headers: {
          'Content-Type': 'application/json',
    
        }
      };
      await axios.post(url, body, requestOptions)
        .then(response => {
          setLoading(false)
          dispatch(addToken(response.data.token))
          dispatch(authUpdate(true))
          history.push('/home');
   


        })
        .catch((err) => {
          setLoading(false)
          setError(err.message);

        });

     
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.loginCard}>
        <div className={classes.logo} />
        <div className={classes.card_title}>
          <Typography
            className={classes.title}
            style={{ color: 'black' }}
          >
            Login
          </Typography>
        </div>
        <TextField
          className={classes.textField}
          fullWidth
          label="Username"
          name="username"
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          required
          style={{ backgroundColor: 'transparent' }}
          type="text"
          value={username}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          fullWidth
          label="Password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          style={{ backgroundColor: 'transparent' }}
          type="password"
          value={password}
          variant="outlined"
        />
        <Button
          className={classes.signInButton}
          color="primary"
          fullWidth
          onClick={() => {
            onSubmit()
          }}
          size="large"
          type="submit"
          variant="contained"
        >   Sign in
        </Button>
        {error!=='' && <h5>{error}</h5>

        }
      </div>
      {loading &&
        <div style={{ position: 'fixed', color: 'white', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100, overflow: 'hidden', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', fontSize: 16 }}>
          <CircularProgress color="white" />
        </div>

      }
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};
export default withRouter(SignIn);
