import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { addToken } from '../../../../redux/action/addToken';
import { authUpdate } from '../../../../redux/action/authUpdate';
import InputIcon from '@material-ui/icons/Input';
import { useDispatch } from 'react-redux'
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = () => {

  const dispatch = useDispatch();
  const onLogout = () => {

    dispatch(addToken(null))
    dispatch(authUpdate(false))
  
  }



  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root)}
      color='white'
      style={{ boxShadow: '0 1px 1.5px 0 rgba(0, 0, 0, .12), 0 1px 1px 0 rgba(0, 0, 0, .24)' }}
    >
      <Toolbar>
        <h2 color='#303669' >Dashboard</h2>
        <div className={classes.flexGrow} />
        
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={onLogout}
          >
            <InputIcon onClick={onLogout} />
          </IconButton>
        
    
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
}
export default Topbar;
