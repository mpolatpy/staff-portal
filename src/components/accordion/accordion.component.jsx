import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ObservationItemTable from '../observation-item-table/observation-item-table.component';
import StarRating from '../star-rating/star-rating.component';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    accordionHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});

export default function CustomAccordion(props) {
    const classes = useStyles();
    const { name, label, value, observationItem, handleStarChange} = props;

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id={`action-header-for-${name}`}
                >
                    {/* <CustomRadioButtons 
                        name={name}
                        options={options}
                        label={label}
                        value={value}
                        handleRadioChange={handleRadioChange}
                    /> */}
                    <div className={classes.accordionHeader}>
                        <Typography variant="subtitle1">{label}</Typography>
                        <StarRating
                            name={name}
                            value={value}
                            handleStarChange={handleStarChange}
                        />
                    </div>
                    
                </AccordionSummary>
                <AccordionDetails>
                    <ObservationItemTable observationItem={observationItem}/>
                </AccordionDetails>
            </Accordion>
     
        </div>
    );
}
