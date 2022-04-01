import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import Divider from '@mui/material/Divider';

import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Style from "../../Connexion.module.scss";


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    '(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.2rem' }} />}
    {...props}
    />
))(({ theme }) => ({
    /*
        backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    */
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2, 4.2),
    paddingTop : '0px',
    borderTop: '0px solid rgba(0, 0, 0, .125)',
}));

const Faq = () => {
    
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className={ Style.containerFaq}>
            <h4><span>QUESTIONS</span>FRÉQUENTES</h4>
            <Divider></Divider>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{ padding: '0px 0px'}}>
                    <Typography className={ Style.faqTypoTitle }>A QUEL RYTHME LA COMMISSION DES CANDIDATURES SE RÉUNIT-ELLE</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={ Style.faqTypo }>
                        2 fois par ans
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header"  style={{ padding: '0px 0px'}}>
                    <Typography className={ Style.faqTypoTitle }>A QUEL RYTHME LA COMMISSION DES CANDIDATURES SE RÉUNIT-ELLE</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={ Style.faqTypo }>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lac
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header"  style={{ padding: '0px 0px'}}>
                    <Typography className={ Style.faqTypoTitle }>A QUEL RYTHME LA COMMISSION DES CANDIDATURES SE RÉUNIT-ELLE</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={ Style.faqTypo }>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Faq;