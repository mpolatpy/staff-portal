import ObservationFormActionTypes from './oservation-form.types';


export const setObservationDetails = observationDetails => ({
    type: ObservationFormActionTypes.SET_OBSERVATION_DETAILS,
    payload: observationDetails
});

export const setStandardOne = standardOne => ({
    type: ObservationFormActionTypes.SET_STANDARD_ONE,
    payload: standardOne
});

export const setStandardTwo = standardTwo => ({
    type: ObservationFormActionTypes.SET_STANDARD_TWO,
    payload: standardTwo
});

export const setStandardThree = standardThree => ({
    type: ObservationFormActionTypes.SET_STANDARD_THREE,
    payload: standardThree
});

export const setStandardFour = standardFour => ({
    type: ObservationFormActionTypes.SET_STANDARD_FOUR,
    payload: standardFour
});

export const setObservationNotes = notes => ({
    type: ObservationFormActionTypes.SET_OBSERVATION_NOTES,
    payload: notes
});

export const resetForm = () => ({
    type: ObservationFormActionTypes.RESET_FORM,
});

