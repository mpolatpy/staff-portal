import React from 'react';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { selectTeacherList, selectTeachersIsLoading } from "../../redux/teachers/teachers.selectors";

import Button from '@material-ui/core/Button';
import DataTable from '../../components/custom-table/custom-table.component';
import './teachers-table.styles.css';


const TeacherTableContainer = ({ teacherList, isLoading, history, match }) => {
    const rows = teacherList;
    // console.log(teacherList);
    const columns = [
        { field: 'firstName', headerName: 'First name', flex: 1.5 },
        { field: 'lastName', headerName: 'Last name', flex: 1.5 },
        { field: 'role', headerName: 'Role', flex: 1 },
        { field: 'department', headerName: 'Department', flex: 1.2 },
        { field: 'email', headerName: 'Email', flex: 1.2 },
        { 
            field: 'id', 
            headerName: 'See Details', 
            renderCell: () => (
                    <Button
                        component={Link}
                        to={`/users`}
                        // variant="contained"
                        // color="secondary"
                        size="small"
                        style={{ marginLeft: 16 }}
                    >
                        details
                    </Button>
            ),
            width: 200
        }
    ]

    return ( 
        <div>
            <DataTable 
            rows={rows}
            columns={columns}
            pageSize={5}
            // checkboxSelection
            isLoading={isLoading}
            />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    teacherList: selectTeacherList,
    isLoading: selectTeachersIsLoading
});


export default connect(mapStateToProps)(withRouter(TeacherTableContainer));