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

export default function TrainSchedule() {
    const classes = useStyles();
    const [schedule, setSchedule] = useState(null);
    useEffect(() => {
        axiosConfig.get('/infodesk/1/sheds', {params: {}})
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
                <Typography variant="h3">Train Schedule</Typography>
            </Box>
            <List className={classes.root}>
                {schedule.map(s => (<><ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    {s.isActive ? (<Avatar className={classes.green}>
                        <Check />
                    </Avatar>): (<Avatar>
                        <Check />
                    </Avatar>)}
                    {s.isActive ? 'Active': 'In-active'}
                    </ListItemAvatar>
                    <ListItemText
                        primary={s.location}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {` Commenced: ${s.commenced}`}
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
