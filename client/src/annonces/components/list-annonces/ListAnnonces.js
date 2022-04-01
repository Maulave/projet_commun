import React, { useEffect } from 'react';
import ElementAnnonce from './element-annonce/ElementAnnonce';
import SearchAnnonce from './search-annonce/SearchAnnonce';
import Style from "../../Annonces.module.scss";
import { fetchAnnonces } from '../../../store/annoncesSlice';
import { useDispatch, useSelector } from 'react-redux';


const ListAnnonces = () => {

    const dispatch = useDispatch();

    const { loading, error, selected, data } = useSelector(state => state.annonces);


    useEffect(() => {
        dispatch(fetchAnnonces(selected))
    }, [dispatch, selected])


    return (
        <div className={ Style.containerProfilAnnonces }>
            <SearchAnnonce />
            <ElementAnnonce />
        </div>
    )
}

export default ListAnnonces;
