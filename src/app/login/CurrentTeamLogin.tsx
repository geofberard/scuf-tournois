import * as React from 'react';
import {FC} from 'react';
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
            marginTop: 80,
        },

        cardContent: {
            textAlign: "center",
        },
    }),
);

export const CurrentTeamLogin: FC = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="sm">
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="VolleyBall"
                        height="140"
                        image="/img/login.jpg"
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