import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import MuiAlert from '@material-ui/lab/Alert';
import {
    submitFormSessionCreate,
    resetSessionCreateForm,
    submitFormSessionUpdate,
    submitFormSessionRemove,
} from 'actions/session';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Draggable from 'react-draggable';
import ErrorDisplay from 'views/Common/ErrorDisplay';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    paper: {
        borderRadius: '20px',
    },
    model: {
        boxShadow: '0px 0px 14px #0000000D',
        opacity: 1,
        borderRadius: '20px',
    },
    inputrow: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '15px',
        [theme.breakpoints.down(500)]:{
            display: 'block',
            justifyContent: 'space-between',
        }
    },
    datePicker: {
        marginTop: '0px',
        [theme.breakpoints.down(500)]:{
            width:'100%'
        }
    },
    inputLabel: {
        letterSpacing: '0px',
        color: '#043B84',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    inputFeild: {
        width: '100%',
        background: '#F3F3F3 0% 0% no-repeat padding-box',
        borderRadius: '2px',
        height: '53px',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    titleRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
    },
    deleteIcon: {
        position: 'absolute',
        right: '23px',
        top: '43px',
        color: 'red',
    },
    confirmationDialog: {
        padding: '20px',
    },
    confirmationActions: {
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    deleteConfirmBtn: {
        color: 'red',
    },
    validateMsg:{
        color: 'red',
        fontSize : 16,
    },
}));

function PaperComponent(props) {
    return (
        <Draggable
            handle="#session-create-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const DialogTitle = withStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing(2),
    },
    mainFont: {
        color: '#004F8B',
        'font-weight': 1000,
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
}))(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography {...other}>
            <div className={classes.root}>
                <div>
                    <Typography variant="h2" className={classes.mainFont}>
                        {children}
                    </Typography>
                </div>
                <div>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
}))(MuiDialogActions);

const SubmitButton = withStyles(theme => ({
    root: {
        backgroundColor: '#004F8B',
        width: '100%',
        '&:hover': {
            backgroundColor: '#004F8B',
        },
        height: '50px',
    },
}))(Button);

const SessionAdd = ({
    submitFormSessionCreate,
    submitFormSessionUpdate,
    submitFormSessionRemove,
    centerData,
    confirmation,
    seletedRowData,
    resetSessionCreateForm,
    error
}) => {
    useEffect(() => {
        if (seletedRowData) {
            setSelectedDataToForm(seletedRowData.select);
            setEditMode(true);
            setOpen(true);
            setLoading(false);
        }
    }, [seletedRowData]);

    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    const classes = useStyles();

    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);

    const [vaccinationCenter, setVaccinationCenter] = React.useState('');
    const [sessionDate, setSessiondate] = React.useState(todayDate);
    const [sessionStartTime, setSessionStartTime] = React.useState(new Date());
    const [sessionEndTime, setSessionEndTime] = React.useState(new Date());
    const [sessionVaccines, setSessionVaccines] = React.useState(0);
    const [sessionAppoinments, setSessionAppoinments] = React.useState(0);
    const [appointmentCount, setAppointmentCount] = React.useState(0);
    const [sessionVaccineType, setSessionVaccineType] = React.useState('');
    //const [sessionVaccineDose, setSessionVaccineDose] = React.useState('');

    const validForm =
        vaccinationCenter !== '' &&
        sessionStartTime !== '' &&
        sessionEndTime !== '' &&
        sessionVaccines !== '' &&
        sessionVaccines !== 0 &&
        sessionAppoinments !== 0 &&
        sessionVaccines >= sessionAppoinments &&
        sessionAppoinments > 0 &&
        sessionStartTime < sessionEndTime &&
        sessionVaccineType !== '' ;

   /*  const handleSessionVaccineDoseChange = event =>{
        setSessionVaccineDose(event.target.value);
    } */

    const handleSessionVaccineTypeChange = event =>{
        setSessionVaccineType(event.target.value);
    }
    const handleCenterChange = (event, value) => {
        let tmpCenter = value || '';
        setVaccinationCenter(tmpCenter);
    };
    const handleSessionDateChange = event => {
        let tmpDate = new Date(event);
        tmpDate = moment(tmpDate).format(moment.HTML5_FMT.DATE);
        setSessiondate(tmpDate);
    };
    const handleSessionStartTimeChange = event => {
        let tmpStartTime = event;
        setSessionStartTime(new Date(tmpStartTime));
    };
    const handleSessionEndTimeChange = event => {
        let tmpEndTime = event;
        setSessionEndTime(new Date(tmpEndTime));
    };
    const handleSessionVaccinesChange = event => {
        let tmpSessionVaccines = Math.abs(event.target.value);
        setSessionVaccines(tmpSessionVaccines);
    };
    const handleSessionAppoinmentChange = event => {
        let tmpSessionAppoinments = Math.abs(event.target.value);
        setSessionAppoinments(tmpSessionAppoinments);
    };
    const handleSessionFormReset = event => {
        resetSessionCreateForm({});
        handleResetSessionObj();
        setOpen(false);
    };

    // Handle model from the create session button
    const handleClickOpen = () => {
        setLoading(false);
        setEditMode(false);
        handleResetSessionObj();
        setOpen(true);
    };
    const handleClose = () => {
        handleSessionFormReset();
        setOpen(false);
    };
    const handleOpenAlert = () => {
        setOpenAlert(true);
    };
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleResetSessionObj = () => {
        setSessionAppoinments('');
        setSessionEndTime('');
        setSessionStartTime('');
        setSessionVaccines('');
        setVaccinationCenter('');
        setAppointmentCount(0);
        setSessiondate(todayDate);
       // setSessionVaccineDose('');
        setSessionVaccineType('');
    };

    const setSelectedDataToForm = selectedData => {
        const selectedCenter = centerData.filter(
            res => res.id === selectedData.mohCentersEntity.id
        )[0];

        setSessionAppoinments(selectedData.appoinments);
        setSessiondate(selectedData.date);
        setSessionEndTime(new Date('2021T' + selectedData.toTime));
        setSessionStartTime(new Date('2021T' + selectedData.fromTime));
        setSessionVaccines(selectedData.vaccines);
        setVaccinationCenter(selectedCenter);
        setAppointmentCount(selectedData.appointmentCount);
       // setSessionVaccineDose(selectedData.sessionVaccineDose);
        setSessionVaccineType(selectedData.sessionVaccineType);
    };

    const handleSessionCreateSubmission = () => {
        setLoading(true);
        submitFormSessionCreate({
            id: null,
            date: sessionDate,
            fromTime: moment(sessionStartTime).format('HH:mm'),
            toTime: moment(sessionEndTime).format('HH:mm'),
            vaccines: sessionVaccines.toString(),
            appoinments: sessionAppoinments.toString(),
            centersId: vaccinationCenter.id,
            adminUserNic: '',
            sessionVaccineType: sessionVaccineType.toString(),
            //sessionVaccineDose: sessionVaccineDose.toString()
        });
    };

    const handleSessionUpdateSubmission = () => {
        setLoading(true);
        submitFormSessionUpdate({
            id: seletedRowData.select.id,
            date:sessionDate,
            fromTime: moment(sessionStartTime).format('HH:mm'),
            toTime: moment(sessionEndTime).format('HH:mm'),
            vaccines: sessionVaccines.toString(),
            appoinments: sessionAppoinments.toString(),
            centersId: vaccinationCenter.id,
            adminUserNic: '',
            sessionVaccineType : sessionVaccineType.toString(),
            //sessionVaccineDose: sessionVaccineDose.toString()
        });
    };

    const handleRemoveSession = () => {
        setOpenAlert(false);
        setLoading(true);
        submitFormSessionRemove({
            id: seletedRowData.select.id,
        });
    };

    const sessionCreated = confirmation.payload.status === 'Saved successful !';
    const sessionUpdated =
        confirmation.payload.status === 'Update Successful !';
    const notEdit = !(sessionCreated || sessionUpdated);
    const sessionDeleted = notEdit
        ? confirmation.payload?.split(' id')[0] === 'Delete Success'
        : false;

    const confirmed = sessionCreated || sessionUpdated || sessionDeleted || error;

    return (
        <div>
            <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={classes.confirmationDialog}>
                    Are you sure you want to delete this session ?
                    <div className={classes.confirmationActions}>
                        <Button
                            onClick={handleRemoveSession}
                            className={classes.deleteConfirmBtn}
                        >
                            Yes
                        </Button>
                        <Button onClick={handleCloseAlert}> No </Button>
                    </div>
                </div>
            </Dialog>

            <Button
                onClick={handleClickOpen}
                variant="text"
                color="primary"
                endIcon={<AddIcon />}
            >
                <Typography
                    component="h3"
                    variant="h6"
                    align="left"
                    className={classes.mainFont}
                >
                    Create Session
                </Typography>
            </Button>
            <Dialog
                fullWidth
                maxWidth="sm"
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                className={classes.model}
                PaperProps={{
                    style: {
                        borderRadius: '20px',
                    },
                }}
                PaperComponent={PaperComponent}
            >
                <div className={classes.titleRow}>
                    <DialogTitle
                        style={{ cursor: 'move' }}
                        id="session-create-dialog-title"
                        onClose={handleClose}
                    >   {!editMode ? 'Create Session' : 'Update Session'}
                    </DialogTitle>
                    <div>
                        {editMode && !loading ? (
                            <Button
                                onClick={handleOpenAlert}
                                variant="text"
                                color="primary"
                                endIcon={<DeleteIcon />}
                                className={classes.deleteIcon}
                                disabled={appointmentCount > 0 ? true :loading}
                            >
                                Remove this session
                            </Button>
                        ) : null}
                    </div>
                </div>

                <DialogContent dividers>
                    {/* {error !== '' ? (
                        <Alert severity="error">Form in invalid.</Alert>
                    ) : null} */}

                    {error ? (
                        <Alert severity="error">{error}</Alert>
                    ) :
                    sessionUpdated ? (
                        <Alert severity="success">Session updated.</Alert>
                    ) : sessionCreated ? (
                        <Alert severity="success">New session created.</Alert>
                    ) : sessionDeleted ? (
                        <Alert severity="success">Session removed.</Alert>
                    ) :  null}

                    {!confirmed ? (
                        <div>

                            <div className={classes.inputLabel}>
                                Vaccination center
                            </div>
                            <Autocomplete
                                className={classes.inputFeild}
                                id="sessionCenter"
                                value={vaccinationCenter}
                                options={centerData}
                                getOptionLabel={option =>
                                    option?.displayName || ''
                                }
                                renderInput={params => (
                                    <TextField {...params} variant="outlined" />
                                )}
                                onChange={(event, newValue) => {
                                    handleCenterChange(event, newValue);
                                }}
                            />
                            <br />
                            <br />
                            <div className={classes.inputrow}>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardDatePicker
                                        className={classes.datePicker}
                                        label="Session date"
                                        disableToolbar
                                        variant="inline"
                                        format="dd-MM-yyyy"
                                        margin="normal"
                                        id="sessionDate"
                                        value={sessionDate || todayDate}
                                        keyboardbuttonprops={{
                                            'aria-label': 'change date',
                                        }}
                                        minDate={todayDate}
                                        autoOk={true}
                                        onChange={handleSessionDateChange}
                                    />

                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="startTime"
                                        label="Start time"
                                        value={sessionStartTime || new Date()}
                                        onChange={handleSessionStartTimeChange}
                                        className={classes.datePicker}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 0,
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />

                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="endTime"
                                        label="End time"
                                        error={sessionEndTime < sessionStartTime}
                                        helperText={sessionEndTime < sessionStartTime ?
                                            `Invalid time ("End time" should be later time than "Start time")` : ""}
                                        value={sessionEndTime || new Date()}
                                        onChange={handleSessionEndTimeChange}
                                        className={classes.datePicker}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 0,
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />

                                </MuiPickersUtilsProvider>
                                {/* <TextField
                                    id="startTime"
                                    label="Start time"
                                    type="time"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 0,
                                    }}
                                    value={sessionStartTime || ''}
                                    onChange={handleSessionStartTimeChange}
                                />

                                <TextField
                                    id="endTime"
                                    label="End time"
                                    type="time"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 0,
                                    }}
                                    value={sessionEndTime || ''}
                                    onChange={handleSessionEndTimeChange}
                                    required
                                /> */}
                            </div>

                            <br />
                            <br />
                            <div className={classes.inputLabel}>
                                Total number of vaccines
                            </div>
                            <TextField
                                className={classes.inputFeild}
                                required
                                error={sessionVaccines < 0}
                                type="number"
                                id="sessionVaccines"
                                variant="outlined"
                                onChange={handleSessionVaccinesChange}
                                value={sessionVaccines || ''}
                                InputProps={{
                                    inputProps: { min: 0, max: 100000 },
                                }}
                            />
                            <br />
                            <br />
                            <div className={classes.inputLabel}>
                                Total number of on-line appointments
                            </div>
                            <TextField
                                className={classes.inputFeild}
                                error={sessionVaccines < sessionAppoinments}
                                required
                                type="number"
                                id="sessionAppoinments"
                                variant="outlined"
                                onChange={handleSessionAppoinmentChange}
                                value={sessionAppoinments || ''}
                                helperText={sessionVaccines < sessionAppoinments ?
                                    "Number of online allowed appoinments should be less than number of allowed vaccines" : ""}
                                InputProps={{
                                    inputProps: { min: 0, max: sessionVaccines },
                                }}
                            />
                            <br />
                            <br />
                            <div className={classes.inputLabel}>
                                Vaccine name
                            </div>
                            <TextField
                                className={classes.inputFeild}
                                //error={sessionVaccines < sessionAppoinments}
                                required
                                type="text"
                                id="sessionVaccineType"
                                variant="outlined"
                                onChange={handleSessionVaccineTypeChange}
                                value={sessionVaccineType || ''}
                                /* helperText={sessionVaccines < sessionAppoinments ?
                                    "Number of online allowed appoinments should be less than number of allowed vaccines" : ""} */
                            />
                            <br />
                            <br />
                            {/* <div className={classes.inputLabel}>
                                Vaccine dose
                            </div> */}
                            {/* <TextField
                                className={classes.inputFeild}
                                //error={sessionVaccines < sessionAppoinments}
                                required
                                type="text"
                                id="sessionVaccineDose"
                                variant="outlined"
                                onChange={handleSessionVaccineDoseChange}
                                value={sessionVaccineDose || ''}
                                 helperText={sessionVaccines < sessionAppoinments ?
                                    "Number of online allowed appoinments should be less than number of allowed vaccines" : ""} 
                            /> */}
                            {/* <div className={classes.inputLabel}>
                                Session Code
                            </div>
                            <TextField
                                className={classes.inputFeild}
                                required
                                id="sessioncode"
                                variant="outlined"
                                onChange={handleSessionCodeChange}
                                value={sessionCode || ''}
                            /> */}
                            {editMode && appointmentCount > 0 ? <p className={classes.validateMsg}>Once users are registered you cannot update the session.</p> : null}
                        </div>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    {confirmed ? (
                        <SubmitButton
                            className={classes.buttonStyle}
                            autoFocus
                            onClick={handleSessionFormReset}
                            color="primary"
                            variant="contained"
                        >
                            Ok
                        </SubmitButton>
                    ) : null}

                    {!confirmed ? (
                        !editMode ? (
                            <SubmitButton
                                className={classes.buttonStyle}
                                autoFocus
                                onClick={handleSessionCreateSubmission}
                                color="primary"
                                variant="contained"
                                disabled={loading || !validForm}
                            >
                                {loading ? 'Creating...' : 'Create'}
                            </SubmitButton>
                        ) : (
                                <SubmitButton
                                    className={classes.buttonStyle}
                                    autoFocus
                                    onClick={handleSessionUpdateSubmission}
                                    color="primary"
                                    variant="contained"
                                    disabled={loading || !validForm || appointmentCount > 0}
                                >
                                    {loading ? 'loading...' : 'Update'}
                                </SubmitButton>
                            )
                    ) : null}
                </DialogActions>
            </Dialog>
        </div>
    );
};

function mapStateToProps({session}) {
    let {error} = session?.confirmation;
    return {
      error
    };
}

export default connect(mapStateToProps, {
    submitFormSessionCreate,
    submitFormSessionUpdate,
    submitFormSessionRemove,
    resetSessionCreateForm,
})(SessionAdd);
