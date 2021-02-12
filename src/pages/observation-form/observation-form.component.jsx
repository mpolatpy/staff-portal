import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { resetForm } from '../../redux/observation-form/oservation-form.actions'; 

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

import ObservationStep, { getSteps } from './observation-form.utils';
import { useStyles } from './observation-form.styles';
import CustomizedSnackbar from '../../components/snack-bar/snack-bar.component';

const ObservationPage = ({ resetObservationForm }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    
    const handleNext = (e) => {
        e.preventDefault();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        resetObservationForm();
        handleNext(e);
        setOpen(true);
        console.log('Submitted');
    };

    const [open, setOpen] = React.useState(false);//snackbar

    const handleClose = (event, reason) => { //snacbar
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index, steps) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <form >
                            <ObservationStep step={index} />
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={
                                            index === steps.length - 1 ? 
                                            handleSubmit:
                                            handleNext 
                                            }
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                            </form>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    {/* <Typography>Observation submitted successfully.</Typography> */}
                    <Button
                    // color="secondary" 
                    variant="contained"
                    onClick={handleReset} 
                    className={classes.button}>
                        SUBMIT ANOTHER OBSERVATION
                    </Button>
                </Paper>
            )}

            <CustomizedSnackbar 
                open={open}
                handleClose={handleClose}
                severity="success"
                message='Observation submitted successfully.'
            />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    resetObservationForm: () => dispatch(resetForm())
});

export default connect(null, mapDispatchToProps)(ObservationPage);
