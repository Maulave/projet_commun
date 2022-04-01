import React, { useState, useEffect } from "react";
import Style from "../../Annonces.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { setSlideLeftButton } from '../../../store/annoncesSlice';
import { Rating, CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PriceAnnonces from './price-annonces/PriceAnnonces';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { NavLink } from 'react-router-dom';

const DescriptionAnnonce = () => {

    /* -------------------------------------------------------------------------- */
    /*                                    REDUX                                   */
    /* -------------------------------------------------------------------------- */

    const dispatch = useDispatch();

    /* Recuperation des data du store */
    /* Je récupère selected = a 0 et affiche ma premiere annonce */
    /* je récupere mon buttonLeft = a false */
    const { error, data, selected, loading, buttonLeft } = useSelector(state => state.annonces);

    /* -------------------------------------------------------------------------- */
    /*                                   Window                                   */
    /* -------------------------------------------------------------------------- */

    /* Window Change */
    const [windowMatches, setWindowMatches] = useState({
        matche: window.matchMedia('(min-width: 1024px)').matches
    });

    useEffect(() => {
        const handler = (e) => setWindowMatches({ matche: e.matches });
        window.matchMedia('(min-width: 1024px)').addEventListener('change', handler);
        
    }, [windowMatches])

    /* -------------------------------------------------------------------------- */
    /*                                   Button                                   */
    /* -------------------------------------------------------------------------- */

    /* active la function quand on click sur le bouton */
    const handleSelect = () => {
        /* Si buttonLeft est égale a false, on 'true' la valeur du bouton dans le store */
    if(buttonLeft === false) {
        dispatch(setSlideLeftButton(true))
    } else if (buttonLeft === true)
        /* Si buttonLeft est égale a false, on 'true' la valeur du bouton dans le store */
        dispatch(setSlideLeftButton(false))
    }

    /* On initialise le useState() */
    const [slideLeft, setSlideLeft] = useState()
    const [buttonRight, setButtonRight] = useState()

    /* slideLeft prend la valeur du CSS */
    useEffect(() => {
        if (buttonLeft === false) {
        /* Si buttonLeft === false, setSlideLeft la fenetre ne s'ouvre pas */
            setSlideLeft(Style.containerDescriptionAnnonces);
            setButtonRight('+');
        /* Si buttonLeft === true setSlideLeft la fenetre s'ouvre */
        } else if (buttonLeft === true) {
            setSlideLeft(Style.containerDescriptionAnnonces + ' ' + Style.actionSlide);
            setButtonRight('-')
        }
    }, [buttonLeft])

    return (
        <>
            { data.length ? (
                <>
                    { windowMatches.matche && (
                        <div className={ Style.containerDescriptionAnnonces }>
                            <div className={ Style.containerHeadDescription }>
                                <div className={ Style.headerDescription }>
                                    <img width="90" height="90" src={ data[selected].annonceImage } alt="imageannonce"/>
                                    <div className={ Style.personDescription }>
                                        <span>{ data[selected].annonceName }</span>
                                        <h5>{ data[selected].annonceCategory }</h5>
                                    </div>
                                    <div className={ Style.personNote }>
                                    <Rating icon={<StarIcon fontSize="medium" />} emptyIcon={<StarBorderIcon fontSize="medium" />} name="half-rating-read" defaultValue={4} precision={0.5} readOnly />
                                    </div>
                                </div>
                                <h1>{ data[selected].annonceTitle }</h1>
                                <hr></hr>
                            </div>
                            <div className={ Style.containerContentDescription }>
                                { data[selected].annonceText }
                            </div>
                            <div className={ Style.containerButtonDescription }>
                                <PriceAnnonces />
                                <NavLink to="/message" className={ Style.sendMessage }>Envoyer un message</NavLink>
                            </div>
                        </div>
                    )}


                    { !windowMatches.matche && (
                        <>
                            <div className={ slideLeft }>
                                <div className={Style.containerSlide}>
                                    <div onClick={ () => handleSelect() } className={Style.buttonSlide}>{ buttonRight }</div>
                                </div>
                                <div className={ Style.containerScroll}>
                                    <div className={ Style.containerHeadDescription }>
                                        <div className={ Style.headerDescription }>
                                            <img width="90" height="90" src={ data[selected].annonceImage } alt="imageannonce"/>
                                            <div className={ Style.personDescription }>
                                                <span>Julien Maulave</span>
                                                <h5>{ data[selected].annonceCategory }</h5>
                                            </div>
                                            <div className={ Style.personNote }>
                                                <Rating icon={<StarIcon fontSize="medium" />} emptyIcon={<StarBorderIcon fontSize="medium" />} name="half-rating-read" defaultValue={4} precision={0.5} readOnly />
                                            </div>
                                        </div>
                                        <h1>{ data[selected].annonceTitle }</h1>
                                        <hr></hr>
                                    </div>
                                    <div className={ Style.containerContentDescription }>
                                        <p>
                                            { data[selected].annonceText }
                                        </p>
                                    </div>
                                    <div className={ Style.containerButtonDescription }>
                                        <PriceAnnonces />
                                        <NavLink to="/message" className={ Style.sendMessage }>Envoyer un message</NavLink>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className={ Style.loadingContainerDescription }>
                    <CircularProgress />
                </div>
                
            )}
        </>
    );
}

export default DescriptionAnnonce;

