import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, Typography} from '@mui/material';
import Style from "../../../connexion/Connexion.module.scss";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'


const Inscription = () => {

    const userSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Trop court').max(15, 'Trop long').required('Champ obligatoire'),
        firstName: Yup.string().min(3, 'Trop court').max(15, 'Trop long').required('Champ obligatoire'),
        email: Yup.string().email('Email invalid').required('Champ obligatoire'),
        password: Yup.string().min(5, 'Trop court').max(15, 'Trop long').required('Champ obligatoire'),
    })

    const url = "http://localhost:5000/inscription";

    /* -------------------------------------------------------------------------- */
    /*                                  Checkbox                                  */
    /* -------------------------------------------------------------------------- */

    const [checked, setChecked] = useState(false);

    const handleChangeCheckBox = (event) => {
        setChecked(event.target.checked);
    };

    /* -------------------------------------------------------------------------- */
    /*                                    Input                                   */
    /* -------------------------------------------------------------------------- */

    const inputName = ({ field, form, ...props }) => {

        return (
            <div style={{ padding: '10px 0px 4px 0px'}}>
                <TextField
                    required
                    type='text'
                    variant="outlined"
                    label='Nom'
                    { ...field }
                />
                <div className={ Style.divError}>
                    <ErrorMessage name='name' component={ CustomError } />
                </div>
            </div>
        )
    }

    const inputFirstName = ({ field, form, ...props }) => {

        return (
            <div style={{ padding: '10px 0px 4px 0px'}}>
                <TextField
                    required
                    type='text'
                    variant="outlined"
                    label='Prénom'
                    { ...field }
                />
                <div className={ Style.divError}>
                    <ErrorMessage name='firstName' component={ CustomError } />
                </div>
            </div>
        )
    }

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

    const inputCheckBox = ({ field, form, ...props }) => {

        return (
            <div style={{ padding: '10px 0px 5px 0px'}} className={ Style.checkboxContainerInscription}>
                <Checkbox
                    required
                    checked={checked}
                    onChange={handleChangeCheckBox}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography>En cochant cette case, vous acceptez les conditions générales d'utilisations</Typography>
            </div>
        )
    }


    /* -------------------------------------------------------------------------- */
    /*                                    Error                                   */
    /* -------------------------------------------------------------------------- */

    const CustomError = (props) => {
        return (
            <span>{ props.children }</span>
        )
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Submit                                   */
    /* -------------------------------------------------------------------------- */

    const submit = (values, actions) => {

        const users = { 
            usersName: values.name, 
            usersFirstName: values.firstName, 
            usersMails: values.email, 
            usersPassword: values.password 
        }

        fetch(url,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(users)
        }
        ).then(() =>{
            console.log('Inscription réussi !')
            actions.resetForm()
            actions.setSubmitting(false)
        })

    }

    return (
        <div className={ Style.containerInscription }>
            <h1>Inscription</h1>
            <Formik
                onSubmit={submit}
                initialValues={{ name: '', firstName: '', email: '', password: ''}}
                validationSchema={ userSchema }
                validateOnBlur={ false }
            >{ ({
                handleSubmit,
                isSubmitting
            }) => (
                <form onSubmit={ handleSubmit } className={ Style.formInscription }>

                    {/* Nom */}

                    <Field name='name' component={ inputName } />

                    {/* Prenom */}

                    <Field name='firstName' component={ inputFirstName } /> 

                    {/* Email */}

                    <Field name='email' component={ inputEmail } />

                    {/* Mot de passe */}

                    <Field name='password' component={ inputPassword } />

                    {/* Conditions générales d'utilisations */}

                    <Field name='checkBox' component={ inputCheckBox } />

                    <div style={{ padding: '10px 0px'}}>
                        <Button type='submit' fullWidth disabled={ isSubmitting } variant="contained" size='small' disableElevation>S'inscrire</Button>
                    </div>
                </form>
            )}
            </Formik>
        </div>
    )
}

export default Inscription;
