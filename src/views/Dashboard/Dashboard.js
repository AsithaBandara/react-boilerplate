import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
    content: {
        paddingTop: 150,
        textAlign: 'center',
    },
    image: {
        marginTop: 50,
        display: 'inline-block',
        maxWidth: '100%',
        width: 560,
    },
}));

const Dashboard = ({ loginSuccess }) => {
    const classes = useStyles();

    return loginSuccess ? (
        <div className={classes.root}>
            <Grid container justify="center" spacing={4}>
                <Grid item lg={6} xs={12}>
                    <div className={classes.content}>
                        <Typography variant="h1">
                            Welcome to Admin Portal
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    ) : (
        <Redirect to="/sign-in" />
    );
};

function mapStateToProps({ signin }) {
    let loginSuccess = sessionStorage.getItem('loginSuccess');

    return {
        loginSuccess,
    };
}

export default connect(mapStateToProps, {})(Dashboard);
