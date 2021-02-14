import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchTeachersAsync } from '../../redux/teachers/teachers.actions';

import TeacherTableContainer from './teacher-table.container';

const TeachersList = (props) => {
    const { fetchTeachersAsync } = props;
    console.log(props);

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
