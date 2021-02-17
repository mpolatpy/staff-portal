import ObservationFormActionTypes from './oservation-form.types';

const INITIAL_STATE = {
    observationDetails: {
        observationDate: null,
        observationType: '',
        schoolYear: '',
        observer: null,
        teacher:null,
        school:'',
        department: '',
        block: '',
        course: '',
        partOfTheClass: ''
    },
    domainOne: {
        a: '0',
        b: '0',
        c: '0',
        d: '0',
        e: '0',
        f: '0'
    },
    domainTwo: {
        a: '0',
        b: '0',
        c: '0',
        d: '0',
        e: '0',
    },
    domainThree: {
        a: '0',
        b: '0',
        c: '0',
        d: '0',
        e: '0',
    },
    domainFour: {
        a: '0',
        b: '0',
        c: '0',
        d: '0',
        e: '0',
        f: '0'
    },
    observationNotes: ''
};

const observationFormReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ObservationFormActionTypes.SET_OBSERVATION_DETAILS:
            return {
                ...state,
                observationDetails: action.payload
            };
        case ObservationFormActionTypes.SET_STANDARD_ONE:
            return {
                ...state,
                domainOne: action.payload
            };
        case ObservationFormActionTypes.SET_STANDARD_TWO:
            return {
                ...state,
                domainTwo: action.payload
            };
        case ObservationFormActionTypes.SET_STANDARD_THREE:
            return {
                ...state,
                domainThree: action.payload
            };
        case ObservationFormActionTypes.SET_STANDARD_FOUR:
            return {
                ...state,
                domainFour: action.payload
            };
        case ObservationFormActionTypes.SET_OBSERVATION_NOTES:
            return {
                ...state,
                observationNotes: action.payload
            };
        case ObservationFormActionTypes.RESET_FORM:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default observationFormReducer;