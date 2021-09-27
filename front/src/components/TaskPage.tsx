import * as React from 'react';
import { observer } from 'mobx-react';

import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Paper, Typography, Grid, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Fab, Icon, Tooltip, makeStyles, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, Input } from '@material-ui/core';
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


export const TaskPage = observer(
    function TaskPage(props: TaskProps) : JSX.Element {
        const context = useContext(AppContext);
        const history = useHistory();
        const styles = useStyles();


        const task = context.store.get_task(props.task);

        let floatingButton;
        if (context.store.user.loggedIn){
            if (context.store.user.isWaiting){
                const text = (
                    <span>Uploading your submit...</span>
                );
                floatingButton = (
                    <Tooltip arrow title={text} classes={{tooltip: styles.tooltip}} placement="bottom-start">
                        <Fab id="Upload" color="secondary">
                            <CircularProgress id="Uploading" size="1rem" color="primary" />
                        </Fab>
                    </Tooltip>
                )
            }
            else {
                const text = (
                    <span>Upload your submit.<br/><br/>
                    You are logged in as <span className="TooltipBright"><b>{context.store.user.name}</b></span> from
                    team <span className="TooltipBright"><b>{context.store.user.teamName}</b></span></span>
                );
                floatingButton = (
                    <label htmlFor="FileInput">
                        <Input id="FileInput" type="file" style={{ display: 'none'}} onChange={e => context.store.submit((e.target as HTMLInputElement).files[0])}/>
                        <Tooltip arrow title={text} classes={{tooltip: styles.tooltip}} placement="bottom-start">
                            <Fab id="Upload" color="secondary" component="span">
                                <Icon>upload</Icon>
                            </Fab>
                        </Tooltip>
                    </label>
                )
            }
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
)
