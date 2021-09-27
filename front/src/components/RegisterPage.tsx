import * as React from 'react';
import { observer } from 'mobx-react';

import { Button,  TextField, Grid, Paper, DialogActions, DialogContent, DialogTitle, CircularProgress, Divider } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

import { AppContext } from '../AppContext';


export const RegisterPage = observer(
    class RegisterPage extends React.Component<RouteComponentProps> {

        static contextType = AppContext;

        initState = () => {
            return {
                name: "",
                password: "",
                teamName: "",
            }
        }

        state = this.initState()

        handleClose = () => {
            this.props.history.goBack();
        }

        handleLogin = (event: React.FormEvent) => {
            this.context.store.register(this.state);

            // By default, submitting a form refreshes the page
            event.preventDefault()
        }


        render() {
            let button;
            if (this.context.store.user.isWaiting)
                button = <Button color="primary"><CircularProgress id="Progress" size="1rem" />&nbsp;Registering...</Button>;
            else
                button = <Button type="submit" color="primary">Register</Button>;

            return (
            <Grid container id="LoginPage" spacing={2} justifyContent="center">
            <Grid container item id="Dialog" direction="row" justifyContent="center" xs={8} md={6} lg={4}>
            <Paper elevation={1}>
            <form id="login" onSubmit={this.handleLogin}>
                <DialogTitle>Register a new team</DialogTitle>

                <DialogContent>
                <TextField fullWidth required margin="dense" id="email" label="e-mail" type="email" variant="outlined"
                    helperText="will be used as username for submits"
                    value={this.state.name} onChange={e => this.setState({ name : e.target.value })} />
                <TextField fullWidth required margin="dense" id="password" label="Password" type="password" variant="outlined"
                    value={this.state.password} onChange={e => this.setState({ password : e.target.value })} />

                <Divider style={{marginTop: '1rem', marginBottom: '1rem'}}/>

                <TextField fullWidth required margin="dense" id="teamName" label="Team name" variant="outlined"
                    helperText="max length is 40, so use sensibly"
                    inputProps={{ maxLength: 40 }} value={this.state.teamName} onChange={e => this.setState({ teamName : e.target.value })} />

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
