import React from 'react';
import Style from "../../../Annonces.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnonces, setSlideLeftButton } from '../../../../store/annoncesSlice';
import { setSelected } from '../../../../store/annoncesSlice';
import { CircularProgress } from '@mui/material';




const AnnonceElement = () => {

    const dispatch = useDispatch();
    const { loading, error, data } = useSelector(state => state.annonces);
    
    const handleSelect = (index) => {
        dispatch(setSelected(index));
        dispatch(setSlideLeftButton(true));
    }

    return (
        <>
            { !loading ? (
                <>
                { data.map((annonce, index) => (
                    <div key={ index } onClick={() => handleSelect(index)} >
                        <div className={ Style.annonce }>
                            <img src={ annonce.annonceImage } alt="imageannonce" />
                            <div>
                                <p>{ annonce.annonceCategory }</p>
                                <h5>{ annonce.annonceTitle }</h5>
                            </div>
                        </div>
                    </div>
                    )
                )}
                </>
            ) : (
                <div className={ Style.loadingContainerSearch }>
                    <CircularProgress />
                </div>
            )}
        </>
    )
}

export default AnnonceElement;