import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
import { useMemo } from 'react';

const formData = {
  displayName: 'Manuel Paredes',
  email: 'manuel@gmail.com',
  password: '123456'
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El email debe tener un @' ],
  password: [ (value) => value.length >= 6, 'El password debe tener mas de 6 letras' ],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio' ]
}

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] )

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid 
  } = useForm( formData, formValidations );

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword(formState) );
  }

  return (
    <AuthLayout title='Create account'>
      
      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              name='displayName'
              value={ displayName }
              onChange={ onInputChange }
              label='Name' 
              type='text'
              placeholder='Your name...'
              fullWidth
              error={ !!displayNameValid && formSubmitted }
              helperText={ displayNameValid }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              name='email'
              value={ email }
              onChange={ onInputChange } 
              label='Email' 
              type='email'
              placeholder='email@google.com'
              fullWidth
              error={ !!emailValid && formSubmitted  }
              helperText={ emailValid }
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
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={ 12 } sm={ 6 } display={ !!errorMessage ? '': 'none' }>

              <Alert severity='error'>
                { errorMessage }
              </Alert>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 }>

              <Button disabled={ isCheckingAuthentication } type='submit' variant='contained' fullWidth>
                Register
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>

            <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
            <Link component={ RouterLink } color='inherit' to='/auth/login'>
              Log in
            </Link>

          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}
