import React from 'react';

import { Typography } from '@material-ui/core';
import CustomAccordion from '../../accordion/accordion.component';
import { useStyles } from './observation-standard.styles';

const ObservationStandardComponent = ({ domain, domainRdx, setDomainRdx }) => {

    const classes = useStyles();
    const components = domain.components;
    const componentKeys = Object.keys(components);

    const handleStarChange = (event) => {
        const { name, value } = event.target;

        setDomainRdx({
            ...domainRdx,
            [name]: value
        });
    }

    return ( 
        <div className={classes.observationDomain}>
            <div className={classes.observationDomainInner}>
                <Typography variant="h6">{domain.domainName}</Typography>
                {
                    componentKeys.map(key =>
                        <CustomAccordion
                            key={key}
                            observationItem={components[key]}
                            name={key}
                            label={components[key].componentName}
                            value={domainRdx[key]}
                            // handleRadioChaSnge={handleRadioChange}
                            handleStarChange={handleStarChange}
                        />
                    )
                }
            </div>
        </div>
    );
};



export default ObservationStandardComponent;

