import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomSelect from '../../custom-select/custom-select.component';
import DatePicker from '../../date-picker/date-picker.component';
import WithSpinner from '../../with-spinner/with-spinner.component';
import { 
    selectTeachersIsLoading, 
    selectTeacherOptions,
    selectTeachersObjWithNameKeys
 } from '../../../redux/teachers/teachers.selectors';
import { fetchTeachersAsync } from '../../../redux/teachers/teachers.actions';
import { selectObservationFormDetails } from '../../../redux/observation-form/oservation-form.selectors';
import { setObservationDetails } from '../../../redux/observation-form/oservation-form.actions';

import { useStyles } from './observation-details.styles';

const ObservationFormDetails = (props) => {
    const classes = useStyles();
    const { observationDetails, 
        setObservationFormDetails, 
        fetchTeachersAsync,
        teachers,
        teacherOptions        
     } = props;

    const [selectedTeacher, setSelectedTeacher] = useState('');

    useEffect(() => { 
        if (teacherOptions.length === 0) {
            fetchTeachersAsync();
        } 
        if(observationDetails.teacher){
            setSelectedTeacher(`${observationDetails.teacher.lastName}, ${observationDetails.teacher.firstName}`)
        }
    }, [teacherOptions, observationDetails])


    const handleChange = e => {
        const { name, value } = e.target;

        if (name === 'teacher') {
            setSelectedTeacher(value);
            setObservationFormDetails({
                ...observationDetails,
                teacher: teachers[value]
            });
        } else {
            setObservationFormDetails({
                ...observationDetails,
                [name]: value
            });
        }
    };

    const handleDateChange = (date) => {
        setObservationFormDetails({
            ...observationDetails,
            observationDate: date
        });
    };


    return ( 
        <div className={classes.root}>
            <div className={classes.newDiv} >
                <div className={classes.form_items}>
                    <DatePicker 
                        handleDateChange={handleDateChange} 
                        selectedDate={observationDetails.observationDate} 
                        name="observationDate" 
                        label="Observation Date" 
                        variant="outlined"
                    />
                </div>
                <div className={classes.form_items}>
                    <CustomSelect
                        required
                        // variant="outlined"
                        label="Department"
                        name="department"
                        handleSelect={handleChange}
                        value={observationDetails.department}
                        options={[
                            'ELA',
                            'Math',
                            'Humanities',
                            'Science',
                            'Special Services'
                        ]}
                    />
                </div>
                <div className={classes.form_items}>
                    <CustomSelect
                        required
                        label="School"
                        name="school"
                        handleSelect={handleChange}
                        value={observationDetails.school}
                        options={[
                            'HCSS East',
                            'HCSS West',
                        ]}
                    />
                </div>
                <div className={classes.form_items}>
                    <CustomSelect
                        required
                        name="teacher"
                        label="Teacher"
                        handleSelect={handleChange}
                        value={selectedTeacher}
                        options={ teacherOptions }
                    />
                </div>
                <div className={classes.form_items}>
                    <CustomSelect
                        required
                        name="observer"
                        label="Observer"
                        handleSelect={handleChange}
                        value={observationDetails.observer}
                        options={[1, 2, 3]}
                    />
                </div>
                <div className={classes.form_items}>
                    <CustomSelect
                        required
                        name="block"
                        label="Block"
                        handleSelect={handleChange}
                        value={observationDetails.block}
                        options={[1, 2, 3]}
                    />
                </div>
                <div className={classes.form_items}>
                    <CustomSelect
                        required
                        name="course"
                        label="Course"
                        handleSelect={handleChange}
                        value={observationDetails.course}
                        options={[1, 2, 3]}
                    />
                </div>
                <div className={classes.form_items}>
                    <CustomSelect
                        required
                        name="partOfTheClass"
                        label="Part of the Class"
                        handleSelect={handleChange}
                        value={observationDetails.partOfTheClass}
                        options={[1, 2, 3]}
                    />
                </div>
            </div>
        </div>
                    
                         
    );
}

const mapStateToProps = createStructuredSelector({
    observationDetails: selectObservationFormDetails,
    isLoading: selectTeachersIsLoading,
    teacherOptions: selectTeacherOptions,
    teachers: selectTeachersObjWithNameKeys,
});

const mapDispatchToProps = dispatch => ({
    setObservationFormDetails: details => dispatch(setObservationDetails(details)),
    fetchTeachersAsync: () => dispatch(fetchTeachersAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(WithSpinner(ObservationFormDetails));