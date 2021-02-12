import { createSelector } from 'reselect';

export const selectTeachersState = state => state.teachers;

export const selectTeachers = createSelector( 
    [selectTeachersState], teachersState => teachersState.teachers
);

export const selectTeacherList = createSelector( 
    [selectTeachers], teachers => Object.keys(teachers).map(key => teachers[key])
);

export const selectTeachersIsLoading = createSelector(
    [selectTeachersState], teachersState => teachersState.isLoading
);

export const selectIsTeachersLoaded = createSelector(
    [selectTeachersState],
    teachersState => !!teachersState.teachers
);

