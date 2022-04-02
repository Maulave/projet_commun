import React from 'react';
import Style from "../../../Annonces.module.scss";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { fetchAnnonces } from '../../../../store/annoncesSlice';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

const SearchAnnonce = () => {

    const dispatch = useDispatch();

    const { data } = useSelector(state => state.annonces);
    const annoncesNumbers = data.length

    //////////////////////////////////////////////////////

    /* -------------------------------------------------------------------------- */
    /*                                   RELOAD                                   */
    /* -------------------------------------------------------------------------- */

    function reload() {
        const object = {
            annonceCategory: 'All',
        }
        dispatch(fetchAnnonces({object}))
    }

    const names = [
        'Caméra',
        'Trépied',
        'Cable',
    ];

    const [personName, setPersonName] = React.useState([]);


    const handleChange = (event) => {

        const object = {
            annonceCategory: 'Cable',
        }

        const {
            target: { value },
        } = event;
        
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );


        console.log(object)
        dispatch(fetchAnnonces({object}))
    };


    return (
        <div className={ Style.containerHeadAnnonces }>
            <div>
                <span className={ Style.searchAnnonceTitle }>{ annoncesNumbers }</span>
                <span>ANNONCES</span>
            </div>
            <FormControl sx={{ m: 1, width: 300 }} className={ Style.containerFormSearchAnnonces }>
                <InputLabel id="demo-multiple-checkbox-label">Catégorie</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    sx={{
                        height: 50
                    }}
                >
                {names.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <div className={ Style.containerFormInput }>
                <Button onClick={() => reload()} variant="contained" size='small' type='submit' disableElevation>Réinitialiser</Button>
            </div>
        </div>
    )
}

export default SearchAnnonce;