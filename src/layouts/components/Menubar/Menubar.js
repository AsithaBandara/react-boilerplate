import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { logout } from 'actions/signin';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
        backgroundColor: 'white',
        zIndex: 100,
        padding: '20px',
        position: 'inherit',
        height: '47px',
        paddingLeft: '80px',
    },
    flexGrow: {
        flexGrow: 1,
    },
    img: {
        width: 100,
    },
    logoWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    mainFont: {
        color: '#004F8B',
        'font-size': '20px',
        'font-weight': 1000,
    },
    textBox: {
        padding: '10px',
    },
    subtitle: {
        color: '#848484',
    },
    linkItem: {
        color: '#848484',
        paddingBottom: '30px',
        '&:hover': {
            color: '#004F8B',
            paddingBottom: '28px',
            borderBottom: '2px solid #004F8B',
        },
    },
    selectedLinkItem: {
        color: '#004F8B',
        paddingBottom: '28px',
        borderBottom: '2px solid #004F8B',
    },

    toolBar: {
        gap: '30px',
    },
    profile: {
        display: 'flex',
        position: 'absolute',
        right: 0,
        marginRight: '148px',
        alignItems: 'baseline',
        gap: '10px',
    },
    logout: {
        color: '#004F8B',
    },
}));

const Menubar = ({ logout, loginsuccess }) => {
    const currentLocation = useLocation();
    const classes = useStyles();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('loginSuccess');
        sessionStorage.removeItem('mobile');
        window.location = '/sign-in';
        logout();
    };
 
    var token = sessionStorage.getItem("token")
    var decoded = jwt_decode(token);
    return (
        <AppBar className={clsx(classes.root)}>
            <Toolbar
                component="nav"
                variant="dense"
                className={clsx(classes.toolBar)}
            >
                {/* <RouterLink to="/dashboard">
                    <Typography
                        inline="true"
                        component="h2"
                        variant="h5"
                        className={
                            (classes.subtitle,
                            currentLocation.pathname === '/dashboard'
                                ? classes.selectedLinkItem
                                : classes.linkItem)
                        }
                    >
                        Dashboard
                    </Typography>
                </RouterLink> */}

                <RouterLink to="/vaccination-sessions">
                    <Typography
                        inline="true"
                        component="h2"
                        variant="h5"
                        className={
                            (classes.subtitle,
                            currentLocation.pathname === '/vaccination-sessions'
                                ? classes.selectedLinkItem
                                : classes.linkItem)
                        }
                    >
                        Vaccination sessions
                    </Typography>
                </RouterLink>

                <RouterLink to="/registration-list">
                    <Typography
                        inline="true"
                        component="h2"
                        variant="h5"
                        className={
                            (classes.subtitle,
                            currentLocation.pathname === '/registration-list'
                                ? classes.selectedLinkItem
                                : classes.linkItem)
                        }
                    >
                        Registrations
                    </Typography>
                </RouterLink>

                <div className={classes.profile}>
                    <Typography
                        inline="true"
                        component="h2"
                        variant="h5"
                        className={(classes.subtitle, classes.linkItem)}
                    >
                        Hello {decoded?.userDetails?.name} !
                    </Typography>
                    <div>
                        <Button
                            className={classes.logout}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
};

Menubar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func,
};

function mapStateToProps({ signin }) {
    let { loginsuccess } = signin;
    return {
        loginsuccess,
    };
}

export default connect(mapStateToProps, {
    logout,
})(Menubar);
