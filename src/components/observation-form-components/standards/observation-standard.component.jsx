import React from 'react';

import { Typography } from '@material-ui/core';
import CustomAccordion from '../../accordion/accordion.component';


const ObservationStandardComponent = ({ domain, domainRdx, setDomainRdx }) => {

    const components = domain.components;
    const componentKeys = Object.keys(components);

    // const handleRadioChange = (event) => {
    //     const { name, value } = event.target;
    //     setDomainRdx({
    //         ...domainRdx,
    //         [name]: value
    //     });
    // };

    const handleStarChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setDomainRdx({
            ...domainRdx,
            [name]: value
        });
    }

    return ( 
        <div>
            <Typography variant="h6">{domain.domainName}</Typography>
            {
                componentKeys.map( key => 
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
    );
};



export default ObservationStandardComponent;

