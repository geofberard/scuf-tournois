import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { FC } from "react";
import { TeamSelector } from "./TeamSelector";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      marginTop: 80,
    },

    cardContent: {
      textAlign: "center",
    },
  }));

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
            image="img/login.jpg"
            title=""
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h6" component="h2">
              Bienvenue au tournois du SCUF !
            </Typography>
            <TeamSelector />
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};
