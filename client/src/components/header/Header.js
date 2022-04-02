import React, { useEffect, useState } from 'react';
import Style from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { ToggleButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';

const Header = () => {

    /* -------------------------------------------------------------------------- */
    /*                                    REDUX                                   */
    /* -------------------------------------------------------------------------- */

    /* Recuperation des data du store */
    const { user } = useSelector(state => state.app)

    /* -------------------------------------------------------------------------- */
    /*                                  useState                                  */
    /* -------------------------------------------------------------------------- */

    /* On initialise le useState() */
    const [burgerMenu, setBurgerMenu] = useState(false)
    const [styleMenu, setStyleMenu] = useState()


    /* -------------------------------------------------------------------------- */
    /*                                   Window                                   */
    /* -------------------------------------------------------------------------- */

    /* Window Change */
    const [windowMatches, setWindowMatches] = useState({
        matche: window.matchMedia('(min-width: 768px)').matches
    });

    useEffect(() => {
        const handler = (e) => setWindowMatches({ matche: e.matches });
        window.matchMedia('(min-width: 768px)').addEventListener('change', handler);
        
    }, [windowMatches])

    /* -------------------------------------------------------------------------- */
    /*                                 Burger Menu                                */
    /* -------------------------------------------------------------------------- */

    /* active la function quand on click sur le bouton */
    const handleSelect = () => {
        /* Si burgerMenu est égale a false, on 'true' la valeur du useState */
        if(burgerMenu === false) {
            setBurgerMenu(true)
        } else if (burgerMenu === true) {
            setBurgerMenu(false)
        }
    }

    const handleSelectBurger = () => {
        /* Si burgerMenu est égale a false, on 'true' la valeur du useState */
        if(burgerMenu === false) {
            setBurgerMenu(true)
        } else if (burgerMenu === true) {
            setBurgerMenu(false)
        }
    }



    useEffect(() => {
        if (burgerMenu === false) {
        /* Si buttonLeft === false, setSlideLeft la fenetre ne s'ouvre pas */
            setStyleMenu(Style.menuBurger);
        /* Si buttonLeft === true setSlideLeft la fenetre s'ouvre */
        } else if (burgerMenu === true) {
            setStyleMenu(Style.menuBurger + ' ' + Style.slideMenuBurger);
        }
    }, [burgerMenu])

    return (
        <>
            <header>
                <NavLink className={ Style.logoApp} to="/">Plateforme</NavLink>
                { windowMatches.matche && (
                    <div className={ Style.containerHeader }>
                        <div>
                            <ul>
                                <li>
                                    <NavLink to="/annonces">Annonces</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className={ Style.containerHeaderLogin }>
                            <ul>
                                <li>
                                    { user ? (
                                        <NavLink to="/compte"><PersonIcon /></NavLink>
                                    ) : (
                                        <NavLink to="/connexion">Connexion</NavLink>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                { !windowMatches.matche && (

                        <div className={ Style.containerHeader }>
                            <div className={ Style.containerHeaderLogin }>
                                <ul>
                                    <li>
                                        <ToggleButton onClick={ () => handleSelect() } value="justify" key="justify" className={ Style.borderBurger}>
                                            <FormatAlignJustifyIcon />
                                        </ToggleButton>
                                    </li>
                                </ul>
                            </div>
                        </div>
                )}
            </header>
            
            <div className={ styleMenu }>
                <div className={ Style.containerMenuBurger }>
                    <ul>
                        <li>
                            <HomeIcon />
                            <NavLink to="/" onClick={ () => handleSelectBurger() }>Acceuil</NavLink>
                        </li>
                        <li>
                            <ListAltIcon />
                            <NavLink to="/annonces" onClick={ () => handleSelectBurger() }>Annonces</NavLink>
                        </li>
                        <li>
                            { user ? (
                                <>
                                    <PersonIcon />
                                    <NavLink to="/compte" onClick={ () => handleSelectBurger() }>Mon compte</NavLink>
                                </>
                            ) : (
                                <>
                                    <GroupIcon />
                                    <NavLink to="/connexion" onClick={ () => handleSelectBurger() }>Connexion</NavLink>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}


export default Header;