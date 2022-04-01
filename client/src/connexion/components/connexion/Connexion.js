import React, { useState } from 'react';
import Style from "../../../connexion/Connexion.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { Formik, Field, ErrorMessage } from "formik";
import { setUser } from '../../../store/appSlice';
import * as Yup from 'yup'


const Connexion = () => {

    const dispatch = useDispatch();

    const userSchema = Yup.object().shape({
        email: Yup.string().email('Email invalid').required('Champ obligatoire'),
        password: Yup.string().min(5, 'Trop court').max(15, 'Trop long').required('Champ obligatoire'),
    })

    const url = "http://localhost:5000/connexion"

    
    const [errorUserIdentifiant, setErrorUserIdentifiant] = useState(null);

    /* -------------------------------------------------------------------------- */
    /*                                    Error                                   */
    /* -------------------------------------------------------------------------- */

    const CustomError = (props) => {
        return (
            <span>{ props.children }</span>
        )
    }

    const CustomErrorIdentifiant = () => {
        return (
            <span style={{ fontSize:'1.2rem' }}>{ errorUserIdentifiant }</span>
        )
    }

    /* -------------------------------------------------------------------------- */
    /*                                    Input                                   */
    /* -------------------------------------------------------------------------- */

    const inputEmail = ({ field, form, ...props }) => {

        return (
            <div style={{ padding: '10px 0px 4px 0px'}}>
                <TextField
                    required
                    type='email'
                    variant="outlined"
                    label='Email'
                    { ...field }
                />
                <div className={ Style.divError}>
                    <ErrorMessage name='email' component={ CustomError } />
                </div>
            </div>
        )
    }

    const inputPassword = ({ field, form, ...props }) => {

        return (
            <div style={{ padding: '10px 0px 4px 0px'}}>
                <TextField
                    required
                    type='password'
                    variant="outlined"
                    label='Mot de passe'
                    { ...field }
                />
                <div className={ Style.divError}>
                    <ErrorMessage name='password' component={ CustomError } />
                </div>
            </div>
        )
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Submit                                   */
    /* -------------------------------------------------------------------------- */

    function submit(e) {

        const users = { 
            usersMails: e.email, 
            usersPassword: e.password 
        }

        fetch(url,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(users)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                localStorage.setItem('auth-plateforme', data.token);
                dispatch(setUser(data.user))
            } else {
                const errorUser = 'Identifiants invalide';
                setErrorUserIdentifiant(errorUser);
            }
        })
    }

    return (
        <div className={ Style.containerInscription }>
            <h1 className={ Style.connectFormTitle}>Se connecter</h1>
            <Formik
                onSubmit={(e) => submit(e)}
                initialValues={{ email: '', password: ''}}
                validationSchema={ userSchema }
            >{ ({
                handleSubmit
            }) => (
                <form onSubmit={ handleSubmit } className={ Style.formInscription }>

                    <div style={{ padding: '3px 0px 10px 0px', height:'25px', color:'red'}}>
                        <CustomErrorIdentifiant />
                    </div>

                    {/* Email */}

                    <Field name='email' component={ inputEmail } />

                    {/* Mot de passe */}

                    <Field name='password' component={ inputPassword } />

                    <div style={{ padding: '10px 0px'}}>
                        <Button type='submit' fullWidth variant="contained" size='small' disableElevation>Se connecter</Button>
                    </div>
                </form>
            )}
            </Formik>
        </div>
    )
}

export default Connexion;