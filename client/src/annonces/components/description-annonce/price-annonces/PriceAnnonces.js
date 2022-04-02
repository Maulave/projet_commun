import React, { useState } from "react";
import Style from "../../../Annonces.module.scss";
import { useSelector } from 'react-redux';
import { Button, OutlinedInput, InputAdornment, InputLabel, FormControl } from '@mui/material';
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const DescriptionAnnonce = () => {

    /* -------------------------------------------------------------------------- */
    /*                                   Montant                                  */
    /* -------------------------------------------------------------------------- */
    /* On crée un useState de values que l'input prendra en valeur */
    const [values, setValues] = useState({
        amount: '',
    });

    /* handleChange permet de modifier l'input */
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    /* -------------------------------------------------------------------------- */
    /*                                    REDUX                                   */
    /* -------------------------------------------------------------------------- */

    /* Recuperation des data du store */
    const { user } = useSelector(state => state.app);
    const { loading, error, data, selected } = useSelector(state => state.annonces)
    const url = "http://localhost:5000/annonces/price";

    /* -------------------------------------------------------------------------- */
    /*                                     YUP                                    */
    /* -------------------------------------------------------------------------- */

    const userSchema = Yup.object().shape({
        int: Yup.number()
        .typeError('Nombre obligatoire')
        .positive('Valuer invalide')
        .required('Champ obligatoire')
        .max(99999, 'Montant trop élevé')
        .min(10, 'Montant trop faible')
    })

    /* -------------------------------------------------------------------------- */
    /*                                    Input                                   */
    /* -------------------------------------------------------------------------- */

    const inputPrice = ({ field, form, ...props }) => {

        return (
            <>
                <InputLabel htmlFor="outlined-adornment-amount">Montant</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="int"
                    value={values}
                    className={ Style.inputPrice }
                    onChange={handleChange('amount')}
                    startAdornment={<InputAdornment position="start" className={ Style.sizeEuros }>€</InputAdornment>}
                    label="Montant"
                    { ...field }
                />
                <div className={ Style.divError}>
                    <ErrorMessage name='int' component={ CustomError } />
                </div>
            </>
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
        /* Création de l'object pour envois en bdd */
        const price = { 
            priceAnnonceMessage: values.int, 
            usersMessage: 'Pour votre l\'object que vous recherchez dans votre annonce, je vous le vend pour ' + values.int + ' euros', 
            idUsersMessage: user.userId, 
            idAnnonceSend: data[selected].id,
            idUsersSend: data[selected].annonceUser,
        }

        /* Insertion de la demmande de prix dans la base de données */
        fetch(url,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(price)
        }
        ).then(() =>{
            console.log('Demmande de prix envoyé !')
            /* On remet le formulaire a 'vide' */
            actions.resetForm()
            actions.setSubmitting(false)
        })
        
    }

    return (
        <div className={ Style.containerOffre }>
            <Formik
                onSubmit={ submit }
                initialValues={{ int: ''}}
                validationSchema={ userSchema }
                validateOnBlur={ false }
            >{ ({
                handleSubmit,                                        
                isSubmitting
            }) => (
                <form onSubmit={ handleSubmit } className={ Style.formControl} >

                    {/* Montant */}

                    <Field name='int' component={ inputPrice } />

                    <Button type="submit" variant="contained" size='small' disabled={ isSubmitting } disableElevation>Faire une offre</Button>
                </form>
                )}
            </Formik>
        </div>
    );
}

export default DescriptionAnnonce;

