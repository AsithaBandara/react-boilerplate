import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ErrorDisplay from 'views/Common/ErrorDisplay';
import Spinner from 'views/Common/Spinner';
import {
    fetchCenters,
    submitFormSessionCreate,
    fetchSessions,
} from 'actions/session';
import {
    fetchRegisteredUsers,
    fetchRegisteredUsersReset,
} from 'actions/registrationList';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Redirect } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    root: {
        '& .table--cell': {
            fontSize: '13px',
        },
    },

    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: '85%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        borderRadius: '20px',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    mainFont: {
        color: '#004F8B',
        'font-weight': 1000,
    },
    textBox: {
        padding: '10px',
    },
    subtitle: {
        color: '#848484',
    },
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    tableHeaderTitle: {
        display: 'flex',
        gap: '20px',
    },
    sessionListSelector: {
        width: '50%',
    },
    reLoadIcon: {
        ':hover' :{
            cursor: 'pointer'
        }
    }
}));

const Registrations = ({
    loading,
    error,
    data,
    sessionsList,
    fetchCenters,
    confirmation,
    fetchSessions,
    loginSuccess,
    usersList,
    userListLoading,
    fetchRegisteredUsers,
    fetchRegisteredUsersReset,
}) => {
    useEffect(() => {
        fetchCenters();
        fetchSessions();
        fetchRegisteredUsersReset();
    }, [fetchCenters, fetchSessions]);

    const reLoadData = () =>{
        fetchRegisteredUsers(select)
    }
    const classes = useStyles();

    function getUserNic(rowData) {
        return rowData.row.citizenInfo?.nic;
    }

    function getUserFirstDosage(rowData) {
        return rowData.row.citizenInfo?.recivedFisrtDose;
    }

    function getUserName(rowData) {
        return rowData.row.citizenInfo?.name;
    }

    function getUserGender(rowData) {
        return rowData.row.citizenInfo?.gender;
    }

    function getUserMobile(rowData) {
        return rowData.row.citizenInfo?.mobileNo;
    }

    const columns = [
        {
            field: 'appoinmentTimeSlot',
            headerName: 'SESSION START TIME',
            flex: 0.5,
            cellClassName: 'table--cell',
        },
        {
            field: 'name',
            headerName: 'NAME',
            valueGetter: getUserName,
            flex: 1,
            cellClassName: 'table--cell',
        },
        {
            field: 'mobileNo',
            headerName: 'MOBILE NO',
            valueGetter: getUserMobile,
            flex: 1,
            cellClassName: 'table--cell',
        },
        {
            field: 'nic',
            headerName: 'NIC',
            valueGetter: getUserNic,
            flex: 1,
            cellClassName: 'table--cell',
        },
        {
            field: 'gender',
            headerName: 'GENDER',
            valueGetter: getUserGender,
            flex: 0.4,
            cellClassName: 'table--cell',
        },
        {
            field: 'recivedFisrtDose',
            headerName: 'FIRST DOSAGE',
            valueGetter: getUserFirstDosage,
            flex: 0.5,
            cellClassName: 'table--cell',
        },
    ];

    const [select, setSelection] = React.useState(null);

    const handleSessionSelection = (event, value) => {
        let tmpSession = value || '';
        setSelection(tmpSession);
        fetchRegisteredUsers(tmpSession);
    };

    return !loginSuccess ? (
        <Redirect to="/sign-in" />
    ) : loading ? (
        <Spinner></Spinner>
    ) : error ? (
        <ErrorDisplay error={error}></ErrorDisplay>
    ) : (
        <div className={classes.root}>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <div className={classes.tableHeader}>
                        <div className={classes.tableHeaderTitle}>
                            <Typography
                                component="h1"
                                variant="h2"
                                align="left"
                                className={classes.mainFont}
                            >
                                Registered Users
                            </Typography>
                            <Typography
                                component="h1"
                                variant="h2"
                                align="left"
                                className={classes.mainFont}
                            >
                               <i className="fa fa-refresh reLoadIcon" onClick={()=>{reLoadData()}}></i>
                            </Typography>
                        </div>
                        <Autocomplete
                            className={classes.sessionListSelector}
                            id="sessionCenter"
                            value={select}
                            options={sessionsList}
                            getOptionLabel={option =>
                                option?.mohCentersEntity?.displayName +
                                    ' | ' +
                                    option.date
                            }
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select the session"
                                />
                            )}
                            onChange={(event, newValue) => {
                                handleSessionSelection(event, newValue);
                            }}
                        />
                    </div>
                    <br />
                    <br />
                    <div
                        style={{ height: 400, width: '100%' }}
                        className={classes.root}
                    >
                        {usersList ? (
                            <DataGrid
                                pagination
                                showColumnRightBorder
                                disableColumnMenu
                                rows={usersList}
                                columns={columns}
                                pageSize={5}
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                            />
                        ) : null}
                    </div>
                </Paper>
            </main>
        </div>
    );
};

//  mention the reducer
function mapStateToProps({ session, signin, registrationList }) {
    // what inside the reducer
    let loginSuccess = sessionStorage.getItem('loginSuccess');
    let { centers, confirmation, sessions } = session;
    let { data, loading } = registrationList;

    // define attr inside the objs
    return {
        loginSuccess,
        loading: centers.loading || sessions.loading,
        error: centers.error,
        data: centers.data,
        confirmation: confirmation,
        sessionsList: sessions.data.resultList,
        usersList: data,
        userListLoading: loading,
    };
}

// bind the actions here in a object
export default connect(mapStateToProps, {
    submitFormSessionCreate,
    fetchCenters,
    fetchSessions,
    fetchRegisteredUsers,
    fetchRegisteredUsersReset,
})(Registrations);
