import * as React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Paper, Typography, Grid, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Fab, Icon, Tooltip } from '@material-ui/core';
import { AppContext } from '../AppContext';


interface TaskProps {
    task: string
}

export function TaskPage(props: TaskProps) : JSX.Element {
    const context = useContext(AppContext);
    const history = useHistory();


    const task = context.store.get_task(props.task);

    let floatingButton;
    if (context.store.user.loggedIn){
        floatingButton = (
            <Tooltip title={"You are logged in as " + context.store.user.name + " from team " + context.store.user.team} >
            <Fab id="Upload" color="secondary">
                <Icon>upload</Icon>
            </Fab>
            </Tooltip>
        )
    }
    else {
        floatingButton = (
            <Tooltip title="Log in to upload">
            <Fab id="Upload" color="secondary" onClick={() => history.push("/login")}>
                <Icon>person_outline</Icon>
            </Fab>
            </Tooltip>
        )
    }

    return (
        <Grid container className="TaskPage" id={props.task} justifyContent="center" spacing={2} >
            <Grid container item id="PageTitle" justifyContent="center" xs={12}>
                <Typography id="PageTitle">{task.name}</Typography>
            </Grid>

            <Grid container item id="Score" justifyContent="center" xs={12}>
                <Grid item xs={8} md={6} lg={4}>
                <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Team</TableCell>
                        <TableCell align="center">Score</TableCell>
                        <TableCell align="center">Submits</TableCell>
                    </TableRow>
                    </TableHead>

                    <TableBody>
                    {task.teams.map(team => (
                        <TableRow key={team.id}>
                        <TableCell component="th" scope="row">
                            {team.name}
                        </TableCell>
                        <TableCell align="center">{team.score}</TableCell>
                        <TableCell align="center">{team.numOfSubmits}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </Grid>

                {floatingButton}
            </Grid>
        </Grid>
    )
}
