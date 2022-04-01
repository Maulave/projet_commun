import React from 'react';
import { ListAnnonces, DescriptionAnnonce } from './components';
import Style from "./Annonces.module.scss";


const Annonces = (props) => {
    return (
        <div className={ Style.containerAnnonce }>
            <ListAnnonces />
            <DescriptionAnnonce />
        </div>
    )
}

export default Annonces;