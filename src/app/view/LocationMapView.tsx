import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Container} from "@material-ui/core";

export const LocationMapView = () => {
    return (
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Plan du gymnase
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        alt="VolleyBall"
                        image="/img/map.jpg"
                        title=""
                    />
                </CardActionArea>
            </Card>
    );
}
