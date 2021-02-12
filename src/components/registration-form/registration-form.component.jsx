import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CustomSelect from '../custom-select/custom-select.component';
import WithSpinner from '../with-spinner/with-spinner.component';
import useStyles from "./register.styles";
import options from './register.options';

const RegistrationForm = (props) => {
    const classes = useStyles();
    const { staff, handleSubmit, handleChange } = props;
    const { departmentOptions, schoolOptions, jobTitleOptions, roleOptions } = options;

    return ( 
        <div className={classes.root}>
            {staff.submissionMessage &&
                <Alert severity={staff.submissionMessage.type}>
                    {staff.submissionMessage.text}
                </Alert>
            }
            <Grid item xs={12} sm={6} >
                <form className={classes.inputContainer} onSubmit={handleSubmit}>
                    <Typography align="justify" variant="h5" mb={5}><strong>Add New Staff Member</strong></Typography>
                    <TextField
                        required
                        className={classes.textInput}
                        onChange={handleChange}
                        value={staff.firstName}
                        type="text"
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                    />
                    <TextField
                        required
                        className={classes.textInput}
                        onChange={handleChange}
                        value={staff.lastName}
                        type="text"
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                    />
                    <TextField
                        required
                        className={classes.textInput}
                        onChange={handleChange}
                        value={staff.email}
                        type="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                    />
                    <TextField
                        required
                        className={classes.textInput}
                        value={staff.password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        label="Password"
                        variant="outlined"
                    />
                    <CustomSelect
                        required
                        label="Department"
                        name="department"
                        value={staff.department}
                        handleSelect={handleChange}
                        options={departmentOptions}
                        variant="outlined"
                    />
                    <CustomSelect
                        required
                        label="School"
                        name="school"
                        value={staff.school}
                        handleSelect={handleChange}
                        options={schoolOptions}
                        variant="outlined"
                    />
                    <CustomSelect
                        required
                        label="Job Title"
                        name="jobTitle"
                        value={staff.jobTitle}
                        handleSelect={handleChange}
                        options={jobTitleOptions}
                        variant="outlined"
                    />
                    <CustomSelect
                        required
                        label="Role"
                        name="role"
                        value={staff.role}
                        handleSelect={handleChange}
                        options={roleOptions}
                        variant="outlined"
                    />
                    <div className={classes.button}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                        >
                            Save
                    </Button>
                    </div>
                </form>
            </Grid>
        </div>
    );
} 

export default WithSpinner(RegistrationForm);