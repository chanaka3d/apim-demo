import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Box } from '@mui/system';
import Check from '@material-ui/icons/Check';
import { green, pink } from '@material-ui/core/colors';
import axiosConfig from '../Config/axiosConfig';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    green: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
      },
}));
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

export default function Platforms() {
    const classes = useStyles();
    const [schedule, setSchedule] = useState(null);
    useEffect(() => {
        axiosConfig.get('/information/1.0.5/trains', {params: {}})
            .then(function (response) {
                console.log(response.data);
                setSchedule(response.data);
            })
            .catch(function (error) {
                alert(error)
            });
    }, []);
    
    if(!schedule) {
        return <CircularProgress />
    }
    return (
        <>
            <Box pb={2} pl={2}>
                <Typography variant="h3">Trains</Typography>
            </Box>
            <List className={classes.root}>
                {schedule.map(s => (<><ListItem alignItems="flex-start">
                    <Box style={{fontSize: 30, padding: 10, marginRight: 20, borderRadius: 5}}>
                        <img src={`/trains/train${randomIntFromInterval(1,3)}.jpg`} width='200' />
                    </Box>
                    <ListItemAvatar style={{marginRight: 80}}>
                    {s.isActive ? (<Avatar className={classes.green}>
                        <Check />
                    </Avatar>): (<Avatar>
                        <Check />
                    </Avatar>)}
                    {s.isActive ? 'Active': 'In-active'}
                    </ListItemAvatar>
                    <ListItemText
                        primary={`Model: ${s.model} - ${s.year}`}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {`Registered: ${s.registered} - Manufacturer: ${s.manufacturer}`}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                    <Divider variant="inset" component="li" />
                </>))}
            </List>
        </>
    );
}
