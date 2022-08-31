import { Link as RouterLink } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startLoginWithEmailAndPassword } from '../../store/auth/thunks';

import { AuthLayout } from '../layout/AuthLayout';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { useForm } from '../../hooks/useForm';
import React, { useMemo } from 'react';

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();
  
  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( startLoginWithEmailAndPassword({email, password}) );
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() )
  }

  return (
    <AuthLayout title='Login'>
      
      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              name='email'
              value={ email }
              onChange={ onInputChange }
              label='Email' 
              type='email'
              placeholder='email@google.com'
              fullWidth
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              name='password'
              value={ password }
              onChange={ onInputChange } 
              label='Password' 
              type='password'
              placeholder='Password...'
              fullWidth
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

             <Grid item xs={ 12 } sm={ 6 } display={ !!errorMessage ? '': 'none' }>

              <Alert severity='error'>
                { errorMessage }
              </Alert>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 }>
              <Button disabled={ isAuthenticating } type='submit' variant='contained' fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 }>

              <Button disabled={ isAuthenticating } onClick={ onGoogleSignIn } variant='contained' fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>

            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>

            <Link component={ RouterLink } color='inherit' to='/auth/register'>
              Create account
            </Link>

          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}
