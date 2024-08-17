import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import configs from '../routine.json'
import {useState} from "react";
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === '#1A2027',
    ...theme.typography.body2,
    padding: 20,
    margin: 20,
    //textAlign: 'center',
    color: theme.palette.text.secondary,

}));

const {days, dias} = configs;

export default function BasicCard() {

    const getDayOfWeek = () => {
        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const date = new Date();
        const dayOfWeek = date.getDay();
        return daysOfWeek[dayOfWeek];
    };

    const [selectedDay, setSelectedDay] = useState(getDayOfWeek());
    const [already, setAlready] = useState(false);

    const handleChangeDay = (newDay) => {
        setSelectedDay(newDay);
    };

    const handleAlready = (index) => {
        setAlready((prev) => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const routineDay = days[selectedDay]
    return (
        <Grid container>
            <div align={"center"} style={{marginTop: 60, marginBottom: 40}}>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day, index) => (

                    <Button style={{
                        margin: '15px',
                    }} key={index} onClick={() => handleChangeDay(day)}
                            variant="contained"
                            color={selectedDay === day ? "success" : "primary"}
                    >
                        {dias[day]}
                    </Button>

                ))}
            </div>
            {routineDay.map((day, index) => (
                <div>
                    {'title' in day ? (
                        <div align={'center'}>
                            <h1>{day.title}</h1>
                        </div>
                    ) : (
                        <Grid item key={index}>
                            <Item>
                                <Card sx={{minWidth: 400, minHeight: 500, maxWidth: 400, maxHeight: 500}}>
                                    <CardMedia
                                        sx={{height: 300}}
                                        image={day.image}
                                        title={day.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {day.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {day.serie}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained"
                                                onClick={() => handleAlready(index)}
                                                color={!already[index] ? "primary" : "success"}
                                        >
                                            {!already[index] ? "¿Está hecho?" : "Hecho"}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Item>
                        </Grid>
                    )}
                </div>

            ))
            }

        </Grid>

    );
}

