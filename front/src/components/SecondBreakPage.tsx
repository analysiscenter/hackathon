import * as React from 'react';
import { Paper, Icon, Typography, Grid } from '@material-ui/core';

export function SecondBreakPage() : JSX.Element {
    return (
        <Grid container id="SecondBreakPage" spacing={2}>
            <Grid container item justifyContent="center" xs={12}>
                <Typography id="Title">Second break picking</Typography>
            </Grid>

        </Grid>
    )
}
