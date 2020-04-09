import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Container} from "@material-ui/core";
import {useTournament} from "../TournamentContext";
import {Rule} from "../data/rule/Rule";
import makeStyles from "@material-ui/core/styles/makeStyles";

const EMPTY = "{empty}";
const BULLET = "{bullet}";

const useStyles = makeStyles((theme) => ({
    bullet: {
        paddingLeft: 10,
    },
}));

const parseRule = (rule: Rule) => {
    const classes = useStyles();
    return <><span className={rule.label.startsWith(BULLET) ? classes.bullet : ""}>{rule.label.replace(EMPTY, "").replace(BULLET, "• ")}</span><br/></>;
};

export const RulesView = () => {
    const tournament = useTournament();

    return (
        <Container maxWidth="sm">
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="VolleyBall"
                        height="140"
                        image="/img/volleyball.jpg"
                        title=""
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Règles du tournois
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {tournament.rules.map(parseRule)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    );
}
