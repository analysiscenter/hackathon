import * as React from 'react';
import { useContext } from 'react';
import { Paper, Icon, Typography, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AppContext, AppContextType } from '../AppContext';


interface TaskIconProps {
    id: string,
    link: string,
    text: string,
    icon: string,
}

function TaskIcon(props: TaskIconProps) : JSX.Element {
    return (
    <Grid item id={props.id} className="Task" xs={6} md={5} lg={4}>
    <Link to={props.link}>
    <Paper elevation={3} className="Task" id="Card">
        <Icon className="Icon">{props.icon}</Icon>
        <Typography>{props.text}</Typography>
    </Paper>
    </Link>
    </Grid>
    )
}

export function ChooseTask() : JSX.Element {

    const context = useContext(AppContext);

    const loginButton = <Button id="Login" variant="contained" component={Link} to="/login">Log in</Button>;
    const loggedIn = <Typography>You are logged in as {context.store.user.name}</Typography>;
    const login = context.store.user.loggedIn ? loggedIn : loginButton;

    return (
        <Grid container id="TaskList" spacing={2}>
            <Grid container item justifyContent="center" xs={12}>
                <Typography id="Prompt">Choose a task</Typography>
            </Grid>

            <Grid container item justifyContent="center" xs={12}>
                {Object.keys(context.store.tasks).map(id =>
                    <TaskIcon key={id} id={id}
                        link={context.store.tasks[id].link}
                        text={context.store.tasks[id].name}
                        icon={context.store.tasks[id].icon} />
                )}
            </Grid>

            <Grid container item justifyContent="center" xs={12}>
                {login}
            </Grid>

        </Grid>
    )
}
