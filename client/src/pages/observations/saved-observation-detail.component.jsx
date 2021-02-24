import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import { selectSingleSavedObservation } from '../../redux/saved-observations/saved-observations.selectors';
import { setObservationForm } from '../../redux/observation-form/oservation-form.actions';
import { resetObservationForm } from '../../redux/observation-form/oservation-form.actions';
import ObservationPage from '../observation-form/observation-form.component';

const SavedObservationDetail = ({ observation, match, setObservationForm, ...otherProps}) => {
    
    useEffect(() => {
        setObservationForm(observation);
    },[observation, setObservationForm]);
    
    return (
        <>
            <ObservationPage {...otherProps} />:   
        </>
    );
}

const mapStateToProps = (state, ownProps) => ({
    observation: selectSingleSavedObservation(ownProps.match.params.observationId)(state)
});

const mapDispatchToProps = (dispatch) => ({
    setObservationForm: form => dispatch(setObservationForm(form)),
    resetObservationForm: (details) => dispatch(resetObservationForm(details)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedObservationDetail);