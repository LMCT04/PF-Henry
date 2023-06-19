import React from "react";
//import style from "./cards.module.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';


const Cards = (props) => {
    return (
        <section>
            <Card  sx={{width: 300, height: 400, backgroundColor:'#eddcb9'}} >
                    <CardActionArea disableRipple >
                        <CardContent
                            sx={{height: 60, backgroundColor:'#A5CAA8', display:'flex', justifyContent:'center', alignItems:'center'}}
                        >
                            <Typography variant="h1" component="div" sx={{fontSize:23}} >
                            {props.element.name}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component='img'
                            height='160'
                            image={props.element.image}
                            alt='imagen'
                            sx={{backgroundColor: '#e4cfa5'}}
                        />
                            <Checkbox 
                                color='error' 
                                icon={<FavoriteBorder />} 
                                checkedIcon={<Favorite />} 
                                size="large"
                                sx={{ position: "absolute", left: "240px", top: "195px", zIndex: 1}}
                            />
                        <CardContent
                            sx={{height: 50}}
                        >
                            <Rating name="size-small" defaultValue={0} size="small" sx={{display:'flex'}}/>
                            <Typography variant="body1" component="div" sx={{fontSize:35, display:'flex', alignItems:'center', }} >
                                ${props.element.price}
                            </Typography>
                        </CardContent>
                        <CardContent
                            sx={{height: 35, display:'flex', justifyContent:'center', alignItems: 'center'}}
                        >
                            <Fab size="medium" color="success" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </CardContent>
                    </CardActionArea>
                </Card>
        </section>
    );
};
export default Cards;
