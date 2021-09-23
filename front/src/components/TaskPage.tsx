import * as React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Paper, Typography, Grid, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Fab, Icon, Tooltip, makeStyles } from '@material-ui/core';
import { AppContext } from '../AppContext';



const useStyles = makeStyles({
    tooltip: {
      fontSize: "1em",
      backgroundColor: "#336699",
    },
});

interface TaskProps {
    task: string
}

export function TaskPage(props: TaskProps) : JSX.Element {
    const context = useContext(AppContext);
    const history = useHistory();
    const styles = useStyles();


    const task = context.store.get_task(props.task);

    let floatingButton;
    if (context.store.user.loggedIn){
        const text = (
            <span>Upload your submit.<br/><br/>
            You are logged in as <span className="TooltipBright"><b>{context.store.user.name}</b></span> from
            team <span className="TooltipBright"><b>{context.store.user.team}</b></span></span>
        );
        floatingButton = (
            <Tooltip arrow title={text} classes={{tooltip: styles.tooltip}} placement="bottom-start">
            <Fab id="Upload" color="secondary">
                <Icon>upload</Icon>
            </Fab>
            </Tooltip>
        )
    }
    else {
        floatingButton = (
            <Tooltip arrow title="Log in to upload" classes={{tooltip: styles.tooltip}}>
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
