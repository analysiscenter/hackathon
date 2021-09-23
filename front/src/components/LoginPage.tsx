import * as React from 'react';
import { autorun } from "mobx";
import { observer } from 'mobx-react';

import { Button,  TextField, Grid, Paper, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

import { AppContext } from '../AppContext';



export const LoginPage = observer(
    class LoginPage extends React.Component<RouteComponentProps> {

        static contextType = AppContext;

        initState = () => {
            autorun(() => {
                if (this.context.store.user.loggedIn)
                    this.props.history.goBack();
            })

            return {
                username: this.context.store.user.name || "",
                password: "",
            }
        }

        state = this.initState()

        handleClose = () => {
            this.context.store.cancelLogin()
            this.props.history.goBack();
        }

        handleLogin = (event: React.FormEvent) => {
            this.context.store.login(this.state.username, this.state.password);

            // By default, submitting a form refreshes the page
            event.preventDefault()
        }


        render() {
            let button;
            if (this.context.store.user.isLogging)
                button = <Button color="primary"><CircularProgress id="Progress" size="1rem" />&nbsp;Signing in</Button>;
            else
                button = <Button type="submit" color="primary">Sign in</Button>;

            return (
            <Grid container id="LoginPage" spacing={2} justifyContent="center">
            <Grid container item id="Dialog" direction="row" justifyContent="center" xs={8} md={6} lg={4}>
            <Paper elevation={1}>
            <form id="login" onSubmit={this.handleLogin}>
                <DialogTitle>Sign in</DialogTitle>

                <DialogContent>
                <TextField fullWidth autoFocus margin="dense" id="username" label="Username" type="text" variant="outlined"
                    value={this.state.username} onChange={e => this.setState({ username : e.target.value })} />
                <TextField fullWidth margin="dense" id="password" label="Password" type="password" variant="outlined"
                    value={this.state.password} onChange={e => this.setState({ password : e.target.value })} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">Cancel</Button>
                    {button}
                </DialogActions>

            </form>
            </Paper>
            </Grid>
            </Grid>
            )
        }
});
