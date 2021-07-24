import React, { useState } from 'react';

import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';

import { requestOTP, otpEntered } from 'actions/signin';
import ErrorDisplay from 'views/Common/ErrorDisplay';
import Spinner from 'views/Common/Spinner';

const useStyles = makeStyles(theme => ({
    container: {
        padding: '20px',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: ' 0px 0px 12px #0000001F',
        borderRadius: '17px',
        opacity: 1,
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    otpClass: {
        padding: '10px 50px',
    },
}));

const mobileRegex = new RegExp('^[0][7][0-9]{8}$');

const SignIn = ({
    requestOTP,
    otpEntered,
    requestedOTP,
    loading,
    error,
    loginSuccess,
    otpRequestedTime,
}) => {
    const classes = useStyles();

    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [isValidMobileNumber, setIsValidMobileNumber] = useState(true);
    const [retryTimeLeft, setRetryTimeLeft] = useState(60);

    const onMobileNumberFieldChange = event => {
        let mobileValue = event.target.value;
        setMobile(mobileValue);
        setIsValidMobileNumber(
            mobileValue.length < 10 ? true : mobileRegex.test(mobileValue)
        );
    };

    const clickResendButton = () => {
        // wait for 1 min to allow retry
        if (new Date().valueOf() - otpRequestedTime < 60000) {
            setRetryTimeLeft(
                60 - (new Date().valueOf() - otpRequestedTime) / 1000
            );
        } else {
            setOtp('');
            requestOTP(mobile);
            setRetryTimeLeft(60);
        }
    };

    return loginSuccess ? (
        <Redirect to="/vaccination-sessions" />
    ) : loading ? (
        <Spinner></Spinner>
    ) : error ? (
        <ErrorDisplay error={error} refreshButton={true}></ErrorDisplay>
    ) : (
        <div className={classes.root}>
            <Container
                component="main"
                maxWidth="xs"
                className={classes.container}
            >
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        {requestedOTP ? 'Enter your OTP code' : 'Sign in'}
                    </Typography>

                    {!requestedOTP ? (
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="mobile"
                                // label="Mobile number in (07########)"
                                placeholder="Mobile number in (07########) format"
                                name="mobile"
                                autoFocus
                                disabled={requestedOTP}
                                helperText="Enter your mobile number in (07########) format and get OTP to login."
                                onChange={onMobileNumberFieldChange}
                                error={!isValidMobileNumber}
                            />
                            <Button
                                variant="contained"
                                fullWidth
                                color="primary"
                                className={classes.submit}
                                onClick={() => requestOTP(mobile)}
                                disabled={
                                    mobile.length !== 10 || !isValidMobileNumber
                                }
                                type="submit"
                            >
                                Send OTP Code
                            </Button>
                        </form>
                    ) : (
                        <React.Fragment>
                            <form className={classes.form} noValidate>
                                <Typography variant="subtitle2" align="center">
                                    {`We have send a verification code to ${mobile}`}
                                </Typography>
                                <div className={classes.otpClass}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="mobile"
                                        onChange={e => setOtp(e.target.value)}
                                        autoFocus
                                        disabled={false}
                                        onInput={e => {
                                            e.target.value = Math.max(
                                                0,
                                                parseInt(e.target.value)
                                            )
                                                .toString()
                                                .slice(0, 6);
                                        }}
                                        label="Enter your OTP code"
                                    />
                                </div>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() =>
                                        otpEntered({
                                            mobileno: mobile,
                                            otp: parseInt(otp),
                                        })
                                    }
                                    disabled={otp.length !== 6}
                                    type="submit"
                                >
                                    Sign In
                                </Button>
                                <br />
                                <Typography variant="subtitle2" align="center">
                                If you didn't receive your verification,
                                </Typography>
                            </form>
                            <Link
                                onClick={clickResendButton}
                                variant="body2"
                                component="button"
                                color="primary"
                                align="center"
                            >
                                {`CLICK HERE to send again. ${
                                    retryTimeLeft < 60
                                        ? '(retry in ' +
                                          Math.floor(retryTimeLeft) +
                                          ' seconds)'
                                        : ''
                                }`}
                            </Link>
                        </React.Fragment>
                    )}
                </div>
            </Container>
        </div>
    );
};

function mapStateToProps({ signin }) {
    let { requestedOTP, loading, error, otpRequestedTime } = signin;
    let loginSuccess = sessionStorage.getItem('loginSuccess');
    return {
        requestedOTP,
        loading,
        error,
        loginSuccess,
        otpRequestedTime,
    };
}

export default connect(mapStateToProps, { requestOTP, otpEntered })(SignIn);
