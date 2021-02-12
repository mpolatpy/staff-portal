import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchTeachersAsync } from '../../redux/teachers/teachers.actions';

import TeacherTableContainer from './teacher-table.container';

const TeachersList = ({ fetchTeachersAsync }) => {

    useEffect(() => {
        fetchTeachersAsync();
    }, [fetchTeachersAsync])

    return ( 
        <div>
            <TeacherTableContainer />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    fetchTeachersAsync: () => dispatch(fetchTeachersAsync())
});

export default connect(null, mapDispatchToProps)(TeachersList);
