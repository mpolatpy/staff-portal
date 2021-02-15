import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
    selectStandardOne,
    selectStandardTwo,
    selectStandardThree,
    selectStandardFour,
} from '../../redux/observation-form/oservation-form.selectors';
import { 
    setStandardOne,
    setStandardTwo,
    setStandardThree,
    setStandardFour,
} from '../../redux/observation-form/oservation-form.actions';

import ObservationFormDetails from '../../components/observation-form-components/observation-details/observation-details.component';
import ObservationStandardComponent from '../../components/observation-form-components/standards/observation-standard.component';
import { rubric } from '../../components/observation-form-components/observationRubric';
import CustomTextArea from '../../components/text-area/text-area.component';

export function getSteps() {
    return ['Observation Details', 'Standard I', 'Standard II', 'Standard III', 'Standard IV', 'Observavtion Notes'];
}

function ObservationStep(props) {
    const { 
        step, 
        standardOne,
        standardTwo,
        standardThree,
        standardFour,
        setStandardOne,
        setStandardTwo,
        setStandardThree,
        setStandardFour,
     } = props;

    switch (step) {
        case 0:
            return (
                <div>
                    <ObservationFormDetails />
                </div>
            );
        case 1:
            return (
                <div>
                    <ObservationStandardComponent 
                        domain={rubric.domainOne}
                        domainRdx={standardOne}
                        setDomainRdx={setStandardOne}
                    />
                </div>
            );
        case 2:
            return (
                <div>
                    <ObservationStandardComponent
                        domain={rubric.domainTwo}
                        domainRdx={standardTwo}
                        setDomainRdx={setStandardTwo}
                    />
                </div>
            );
        case 3:
            return (
                <div>
                    <ObservationStandardComponent
                        domain={rubric.domainThree}
                        domainRdx={standardThree}
                        setDomainRdx={setStandardThree}
                    />
                </div>
            );
        case 4:
            return (
                <div>
                    <ObservationStandardComponent
                        domain={rubric.domainFour}
                        domainRdx={standardFour}
                        setDomainRdx={setStandardFour}
                    />
                </div>
            );
        case 5: 
            return ( 
                <div>
                    <CustomTextArea />
                </div>
            );
        default:
            return 'Unknown step';
    }
}

const mapStateToProps = createStructuredSelector({
    standardOne: selectStandardOne,
    standardTwo: selectStandardTwo,
    standardThree: selectStandardThree,
    standardFour: selectStandardFour,
});

const mapDispatchToProps = dispatch => ({
    setStandardOne: observationItems => dispatch(setStandardOne(observationItems)),
    setStandardTwo: observationItems => dispatch(setStandardTwo(observationItems)),
    setStandardThree: observationItems => dispatch(setStandardThree(observationItems)),
    setStandardFour: observationItems => dispatch(setStandardFour(observationItems))
});


export default connect(mapStateToProps, mapDispatchToProps)(ObservationStep);