import * as React from "react";
import { FC } from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Container } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      marginTop: 30,
    },

    cardContent: {
      textAlign: "center",
    },
  }));

interface MessageCardProps {
    label: string,
}

export const MessageCard: FC<MessageCardProps> = ({ label }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h6" component="h2">
              {label}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};
