import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Button, OutlinedInput, InputAdornment } from '@mui/material';
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const DescriptionAnnonce = () => {

    /* -------------------------------------------------------------------------- */
    /*                                   Montant                                  */
    /* -------------------------------------------------------------------------- */

    const [values, setValues] = useState({
        amount: '',
    });

    const handleChange = (prop) => (event) => {

        setValues({ ...values, [prop]: event.target.value });
    };

    /* -------------------------------------------------------------------------- */
    /*                                    REDUX                                   */
    /* -------------------------------------------------------------------------- */

    /* Recuperation des data du store */
    /* Je récupère selected = a 0 et affiche ma premiere annonce */
    /* je récupere mon buttonLeft = a false */
    const { user } = useSelector(state => state.app);

    /* -------------------------------------------------------------------------- */
    /*                                     YUP                                    */
    /* -------------------------------------------------------------------------- */

    const url = "http://localhost:5000/annonces";

    const userSchema = Yup.object().shape({
        int: Yup.number()
        .typeError('')
        .positive('')
        .required('')
        .max(99999, '')
        .min(10, '')
    })

    /* -------------------------------------------------------------------------- */
    /*                                    Input                                   */
    /* -------------------------------------------------------------------------- */

    const inputPrice = ({ field, form, ...props }) => {

        return (
            <>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    name="int"
                    value={values}
                    className='inputPrice'
                    onChange={handleChange('amount')}
                    startAdornment={<InputAdornment position="start" className='sizeEuros' >€</InputAdornment>}
                    label="Montant"
                    { ...field }
                />
                <div className='divError'>
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

    function submit(e) {

        const price = { 
            priceAnnonceMessage: e.int, 
            idUsersMessage: user.userId, 
        }
        
        fetch(url,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(price)
        }
        ).then(() =>{
            console.log('Demmande de prix envoyé !')
        })
        
    }

    return (
        <div className='containerOffre'>
            <Formik
                onSubmit={(e) => submit(e)}
                initialValues={{ int: ''}}
                validationSchema={ userSchema }
            >{ ({
                handleSubmit
            }) => (
                <form onSubmit={ handleSubmit } className='formControl' >

                    {/* Montant */}
                    <div className="container-input">
                        <Field name='int' component={ inputPrice } />
                    </div>
                    <Button type="submit" variant="contained" size='small' disableElevation>Faire une offre</Button>
                </form>
                )}
            </Formik>
        </div>
    );
}

export default DescriptionAnnonce;