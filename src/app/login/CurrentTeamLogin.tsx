import * as React from 'react';
import {FC, useState} from 'react';
import {Team} from "../data/team/Team";
import {useTournament} from "../TournamentContext";
import {TeamSelector} from "../TeamSelector";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {Container} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            marginTop: 30,
        },

        cardContent: {
            textAlign: "center",
        },
    }),
);

export const CurrentTeamLogin: FC = ({children}) => {
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="VolleyBall"
                        height="140"
                        image="/img/volleyball.jpg"
                        title=""
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h6" component="h2">
                            Bienvenue au tournois du SCUF !
                        </Typography>
                        <TeamSelector/>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    );
};