import React, { useState,useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import config from '../../config.json';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { addToken } from '../../redux/action/addToken';
import { authUpdate } from '../../redux/action/authUpdate';
import {
  Button,
  Typography
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({

  root: {
 
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: '10',
    width: '50%',
    maxWidth: 600,
    minWidth: 400,
    minHeight: 300,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
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
    height: 90,
    width: 90

  },
  textField: {
    margin: 10
  },
 
  submitButton:{
    backgroundColor: '#0D47A1',
    color: 'white',
    margin: 10,
  },
  clearButton:{
    margin: 10,
  },
  title: {
    color: '#0D47A1',
    fontSize: '16px',
    fontWeight: 'normal'
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
  },
  textarea:{
    width:'100%',
    height:100,
    padding:5
  },
  buttonDiv:{
    display: 'flex',
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loading:{
    position: 'fixed', 
    color: 'white',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 100,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16
  }
}));

const SignIn = props => {
  const { history } = props;
  const dispatch = useDispatch();
  const { tokenInfo, authStatus } = useSelector(state => ({
    tokenInfo: state.token,
    authStatus: state.authStatus

  }));
  const classes = useStyles();
  const [json, setJson] = useState('');
  const [patch, setPatch] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tokenInfo === null || authStatus===false){
      history.push('/signin')
    }
  })

  const onSubmit = async () => {
  try{

 
    if (json.trim() === '' || patch.trim() === '') {

      setError('Please fill in all the fields');
    } else {
  setLoading(true)
      const url = config.baseUrl+'/api/v1/user/patch';
      console.log(url)
      let body = {
        json: JSON.parse(json),
        patch: JSON.parse(patch)
      }
  
      let requestOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': tokenInfo
        }
      };
      await axios.post(url, body, requestOptions)
        .then(response => {
          setError('');
          setLoading(false)
          setResult(JSON.stringify(response.data.result));

        })
        .catch(err => {
          setLoading(false)
          setError(err.message);
          if (err.message ==="Request failed with status code 401"){
            dispatch(addToken(null));
            dispatch(authUpdate(false));
       
          }


        });

    
    }
  } catch (e) {
    setLoading(false)
    setError(e.toString());
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
            JSON Text
          </Typography>
          <textarea
            aria-label="JSON TEXT"
            className={classes.textarea}
            onChange={(e) => {
              setJson(e.target.value)
            }}
            value={json}
            placeholder="Empty"
          />

          <Typography
            className={classes.title}
            style={{ color: 'black' }}
          >
            Patch
          </Typography>
          <textarea
            aria-label="JSON TEXT"
            className={classes.textarea}
            onChange={(e) => {
              setPatch(e.target.value)
            }}
            value={patch}
            placeholder="Empty"
          />
          <div className={classes.buttonDiv}>
          <div style={{flex:1}}>
            <Button
              className={classes.clearButton}
              // color="primary"
              fullWidth
              onClick={() => {
                setPatch('');
                setResult('');
                setJson('');
                setError('')
              }}
              size="large"
              type="submit"
              variant="contained"
            >   Clear
          </Button></div>
            <div style={{ flex: 1 }}>
              <Button
            className={classes.submitButton}
              fullWidth
                color="primary"
            onClick={() => {
              onSubmit()
            }}
                value={result}
            size="large"
            type="submit"
            variant="contained"
          >   Submit
          </Button></div>
          </div>
        
          {error !== '' && <h5 style={{color:'red'}}>{error}</h5>

          }
          <Typography
            className={classes.title}
            style={{ color: 'black' }}
          >
            Result
          </Typography>
     

          <textarea
            aria-label="JSON TEXT"
            className={classes.textarea}
            disabled
            placeholder="Empty"
            value={result}
          />
      
        </div>    </div>
      {loading &&
        <div className={classes.loading}>
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
