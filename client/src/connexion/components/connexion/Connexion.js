import React, { useState } from 'react';
import Style from "../../../connexion/Connexion.module.scss";
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { Formik, Field, ErrorMessage } from "formik";
import { setUser } from '../../../store/appSlice';
import * as Yup from 'yup'


const Connexion = () => {

    const dispatch = useDispatch();

    /* Yup permet de vérifier les inputs */
    const userSchema = Yup.object().shape({
        email: Yup.string().email('Email invalid').required('Champ obligatoire'),
        password: Yup.string().min(5, 'Trop court').max(15, 'Trop long').required('Champ obligatoire'),
    })

    /* On indique l'url sur lequel on va fetch */
    const url = "http://localhost:5000/connexion"
    
    const [errorUserIdentifiant, setErrorUserIdentifiant] = useState(null);

    /* -------------------------------------------------------------------------- */
    /*                                    Error                                   */
    /* -------------------------------------------------------------------------- */

    /* on Custom les componentError grace a Formik */
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

    /* on Custom les component grace a Formik */
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

    const submit = (values, actions) => {

        /* On met les valeurs qu'on enverra au backend dans le users pour les préparer */
        const users = { 
            usersMails: values.email, 
            usersPassword: values.password 
        }

        /* On envois les données a l'URL */
        fetch(url,
        {
            /* METHOD : POST */
            method: 'POST',
            /* On indique le type de données */
            headers: { 'Content-Type': 'application/json'},
            /* On insert les données dans le body */
            body: JSON.stringify(users)
        })
        /* On récupere les données en Json() */
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                /* je met le token dans le localStorage */
                localStorage.setItem('auth-plateforme', data.token);
                /* je met les données dans le store appSlice pour quel me soit disponible sans faire de requete BDD */
                dispatch(setUser(data.user))
                /* Je reset tout le formulaire */
                actions.resetForm()
                actions.setSubmitting(false)
            } else {
                /* Je notifie la personne que les identifiants sont invalides */
                const errorUser = 'Identifiants invalide';
                setErrorUserIdentifiant(errorUser);
            }
        })
    }

    return (
        <div className={ Style.containerInscription }>
            <h1 className={ Style.connectFormTitle}>Se connecter</h1>
            <Formik
                onSubmit={ submit }
                initialValues={{ email: '', password: ''}}
                validationSchema={ userSchema }
            >{ ({
                handleSubmit,
                isSubmitting
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
                        <Button type='submit' disabled={ isSubmitting } fullWidth variant="contained" size='small' disableElevation>Se connecter</Button>
                    </div>
                </form>
            )}
            </Formik>
        </div>
    )
}

export default Connexion;