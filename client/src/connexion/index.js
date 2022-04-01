import React from "react";
import { Connexion, Inscription, Faq } from './components';
import Style from "./Connexion.module.scss";
import { NavLink } from 'react-router-dom';

const ConnexionInscription = ({connexion}) => {

    return (
        <div className={ Style.connexionInscriptionContainer}>
            { connexion === 'connexion' ? (
                <>
                    <Connexion/>
                    <NavLink  to="/inscription" className={ Style.inscription }>Inscription</NavLink>
                </>
            ) : (
                <>
                    <Inscription/>
                    <NavLink to="/connexion" className={ Style.connexion }>Connexion</NavLink>
                </>
            )}
            <Faq/>
        </div>
    )
}

export default ConnexionInscription;