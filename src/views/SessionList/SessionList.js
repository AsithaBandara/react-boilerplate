import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ErrorDisplay from 'views/Common/ErrorDisplay';
import Spinner from 'views/Common/Spinner';
import SessionAdd from './SessionAdd';
import {
    fetchCenters,
    submitFormSessionCreate,
    fetchSessions,
} from 'actions/session';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Redirect } from 'react-router-dom';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

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
    tableCell: {
        minWidth: 'fit-content'
    }
}));

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#e6e6e6',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 15,
    },
}))(TableCell);

const Sessions = ({
    loading,
    error,
    data,
    sessionsList,
    fetchCenters,
    confirmation,
    fetchSessions,
    loginSuccess,
}) => {
    useEffect(() => {
        fetchCenters();
        fetchSessions();
    }, [sessionStorage.getItem("token"), fetchCenters, fetchSessions]);

    const reLoadData = () => {
        fetchCenters();
        fetchSessions();
    }

    const classes = useStyles();

    function getCenterName(rowData) {
        return rowData.row.mohCentersEntity?.displayName;
    }

    function getSessionCode(rowData) {
        let returnVal = "";
        for(var i = 0 ; i < rowData.vaccineSessionPerHour?.length ; i++ ){
            returnVal += <div> {rowData.vaccineSessionPerHour[i].sessionStartAt + " : "+rowData.vaccineSessionPerHour[i].subSessionCode }</div>
            
        }
        return (returnVal);//returnVal;
    }

    function getSessionTime(time) {
        let hour = '';
        let minuite = '';
        let suffix = '';

        if (time) {
            let hourString = Number(time.split(':')[0]);
            hour = hourString % 12 || 12;
            minuite = time.split(':')[1];
            suffix = hourString >= 12 ? 'PM' : 'AM';
        }

        return `${hour}:${minuite} ${suffix}`;
    }

    function getToTime(rowData) {
        return getSessionTime(rowData?.toTime);
    }

    function getFromTime(rowData) {
        return getSessionTime(rowData?.fromTime);
    }

    const [expanded, setExpanded] = React.useState('panel0');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = [
        {
            field: 'date',
            headerName: 'SESSION DATE',
            //flex: 0.7,
            //width: 160,
            type: 'date',
            cellClassName: 'tableCell',
        },
        {
            field: 'mohCentersEntity',
            headerName: 'CENTER',
            //flex: 1,
            sortable: true,
            //width: '20%',
            valueGetter: getCenterName,
            cellClassName: 'tableCell',
        },
        {
            field: 'fromTime',
            headerName: 'START TIME',
            // flex: 0.5,
            // width: '10%',
            valueGetter: getFromTime,
            cellClassName: 'tableCell',
        },
        {
            field: 'toTime',
            headerName: 'END TIME',
            valueGetter: getToTime,
            // flex: 0.5,
            // width: '10%',
            cellClassName: 'tableCell',
        },
        {
            field: 'vaccines',
            headerName: 'TOTAL ALLOWED VACCINES',
            // flex: 1,
            // width: '10%',
            cellClassName: 'tableCell',
        },
        {
            field: 'appoinments',
            headerName: 'ALLOWED ONLINE APPOINTMENTS',
            // flex: 1,
            // width: '10%',
            cellClassName: 'tableCell',
        },
        {
            field: 'appointmentCount',
            headerName: 'REGISTERED COUNT',
           //  flex: 0.5,
            // width: '10%',
            cellClassName: 'tableCell',
        },
        {
            valueGetter: getSessionCode,
            field: 'sessionCode',
            headerName: 'SESSION CODE',
           //  flex: 0.5,
            // width: '10%',
            cellClassName: 'tableCell',
        },
    ];

    const [select, setSelection] = React.useState(null);

    const handleUpdate = (e) => {
        alert("dsds")
    }

    const handleSessionSelection = (selectedSession, ramdomId) => {
        let obj = {
            ramdomId: ramdomId,
            select: selectedSession,
        };
        setSelection(obj);
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    return !loginSuccess ? (
        <Redirect to="/sign-in" />
    ) : loading ? (
        <Spinner></Spinner>
    ) : error ? (
        <ErrorDisplay error={error} refreshButton={true}></ErrorDisplay>
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
                                            Vaccination sessions
                            </Typography>
                                        <Typography
                                            component="h1"
                                            variant="h2"
                                            align="left"
                                            className={classes.mainFont}
                                        >
                                            <i className="fa fa-refresh" onClick={() => { reLoadData() }}></i>
                                        </Typography>

                                        <SessionAdd
                                            seletedRowData={select}
                                            setSelection={setSelection}
                                            centerData={data}
                                            confirmation={confirmation}
                                            loading={loading}
                                        />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div
                                 style={{ height: '100%', width: '100%' }}
                                className={classes.root}
                                >
                                    {/*  <DataGrid
                            pagination
                            showColumnRightBorder
                            disableColumnMenu
                            rows={sessionsList}
                            columns={columns}
                            pageSize={5}
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            onRowClick={newSelection => {
                                handleSessionSelection(
                                    newSelection.row,
                                    Math.random()
                                );
                            }}
                        />  */}
                    {sessionsList.length === 0 ? (
                        <Typography component="h6" variant="h6" align="center">
                         No Data
                        </Typography>
                    ) : (
                        <React.Fragment>
                            <TableContainer component={Paper}>
                                <Table
                                    className={classes.table}
                                    aria-label="customized table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>
                                            SESSION DATE
                                            </StyledTableCell>
                                            <StyledTableCell>
                                            CENTER
                                            </StyledTableCell>
                                            <StyledTableCell>
                                            START TIME
                                            </StyledTableCell>
                                            <StyledTableCell>
                                            END TIME
                                            </StyledTableCell>
                                            <StyledTableCell>
                                            TOTAL ALLOWED VACCINES
                                            </StyledTableCell>
                                            <StyledTableCell>
                                            ALLOWED ONLINE APPOINTMENTS
                                            </StyledTableCell>
                                            <StyledTableCell>
                                            REGISTERED COUNT
                                            </StyledTableCell>
                                            <StyledTableCell>
                                            SESSION CODE
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead><TableBody>
                                        {sessionsList
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map(session => (
                                                
                                                <StyledTableRow key={session.id} onClick={()=>{handleSessionSelection(session)}}>
                                                    <StyledTableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {session.date}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {session.mohCentersEntity.displayName}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {
                                                            getFromTime(session)
                                                        }
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {
                                                            getToTime(session)
                                                        }
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {session.vaccines}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {session.appoinments}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {session.appointmentCount}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {
                                                            session.vaccineSessionPerHour?.map((val, ind) =>{
                                                                return(
                                                                    <div key = {val.id}>{getSessionTime(val.sessionStartAt) + " - " +getSessionTime(val.sessionEndAt) + " : " + val.subSessionCode}</div>
                                                                )
                                                            })
                                                        //getSessionCode(session)
                                                        }
                                                    </StyledTableCell>
                                                    
                                                    
                                                </StyledTableRow>
                                            ))}
                                    </TableBody>
                                    
                                </Table>
                            </TableContainer>
                             <TablePagination
                                rowsPerPageOptions={[5, 10, 50]}
                                component="div"
                                count={sessionsList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </React.Fragment>

                    )
                                                    }








                                    {/* <div>
                                        {
                                            sessionsList && sessionsList.map((value, index) => {
                                                return (
                                                    <Accordion square expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                                                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                            <Typography>{value.mohCentersEntity?.displayName + " | " + value.date + " | " + value.fromTime + " - " + value.toTime}</Typography>
                                                            <Typography><Button onClick={e => { handleSessionSelection(value , Math.random()) }}> Edit / Delete</Button></Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography>
                                                                <div
                                                                    style={{ height: 400, width: '100%' }}
                                                                //className={classes.root}
                                                                >
                                                                    <DataGrid
                                                                        // pagination
                                                                        // showColumnRightBorder
                                                                        disableColumnMenu
                                                                        rows={sessionsList}
                                                                        columns={columns}
                                                                       

                                                                    /> </div>

                                                            </Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                )
                                            })
                                        }

                                    </div> */}

                                </div>
                            </Paper>
                        </main>
                    </div>
                );
};

//  mention the reducer
function mapStateToProps({ session, signin }) {
    // what inside the reducer
    let loginSuccess = sessionStorage.getItem('loginSuccess');
    let { centers, confirmation, sessions } = session;

    // define attr inside the objs
    return {
        loginSuccess,
        loading: centers.loading || sessions.loading,
        error: centers.error,
        data: centers.data,
        confirmation: confirmation,
        sessionsList: sessions.data.resultList,
    };
}

// bind the actions here in a object
export default connect(mapStateToProps, {
    submitFormSessionCreate,
    fetchCenters,
    fetchSessions,
})(Sessions);
