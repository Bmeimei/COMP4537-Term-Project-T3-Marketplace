import * as React from 'react';
import ProductCard from '../ProductCard';
import { makeStyles } from "@material-ui/styles";
import Grid from '@mui/material/Grid';


const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        marginLeft: "30px",
        marginTop: "100px"
    }
}))


const ProductBox = () => {
    const {container} = useStyles();
    const productData = [
        {
            price: 50,
            title: "Apple Trackpad",
            location: "Burnaby, BC",
            imageUrl: "https://scontent.fyvr3-1.fna.fbcdn.net/v/t45.5328-4/p720x720/254146791_6475860252455424_1809870702632575574_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=c48759&_nc_ohc=1a2vHfHhjNAAX9trAdj&_nc_ht=scontent.fyvr3-1.fna&oh=92c355b60bccedcdec5bf8f3c9388c1b&oe=619BCD79"
        },
        {
            price: 30,
            title: "Vintage camera",
            location: "Vancouver, BC",
            imageUrl: "https://scontent.fyvr3-1.fna.fbcdn.net/v/t45.5328-4/p960x960/248520888_4615237525235993_7685561973991529050_n.png?_nc_cat=100&ccb=1-5&_nc_sid=c48759&_nc_ohc=1n-5Y6hV5MMAX-1DAUW&_nc_ht=scontent.fyvr3-1.fna&oh=fdbaef024bff829832e08da669801c98&oe=619A9E2C"
        },
        {
            price: 50,
            title: "Ikea Chair",
            location: "Vancouver, BC",
            imageUrl: "https://scontent.fyvr3-1.fna.fbcdn.net/v/t45.5328-4/s960x960/257558752_4751417588235602_8974633868936648062_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=c48759&_nc_ohc=i9a9JYpso04AX9wH9Sv&_nc_oc=AQkw7SHsjNsu16m-jn7N9DCHaseHH3iLAV6nBuKaDKRR8lFr018NGASoDcTifkjYN4E&tn=RYycWDG9_LRr-W1K&_nc_ht=scontent.fyvr3-1.fna&oh=ccb104976ab56d0f3ead168e92953461&oe=619A96B9"
        },
        {
            price: 99,
            title: "Dumbbells",
            location: "Surrey, BC",
            imageUrl: "https://scontent.fyvr3-1.fna.fbcdn.net/v/t45.5328-4/s960x960/243041815_4112861818818666_4510817175590675407_n.png?_nc_cat=102&ccb=1-5&_nc_sid=c48759&_nc_ohc=Zqbzg57-DVkAX_Sujl0&tn=RYycWDG9_LRr-W1K&_nc_ht=scontent.fyvr3-1.fna&oh=11007be4029bd19ef719f490f1dafadd&oe=619B4FD3"
        },
        {
            price: 220,
            title: "Espresso Machine",
            location: "Coquitlam, BC",
            imageUrl: "https://scontent.fyvr3-1.fna.fbcdn.net/v/t45.5328-4/s960x960/257470716_4417337248385915_3445690592961181934_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=c48759&_nc_ohc=tk6p2brGJS8AX8sRaPx&tn=RYycWDG9_LRr-W1K&_nc_ht=scontent.fyvr3-1.fna&oh=8eac6313afb77c67b7829238fb855417&oe=619BD0F5"
        },
    ]
    return (
        <div className={container}>
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 20 }}>
            {productData.map(({price, title, location, imageUrl}) => (
                <Grid item xs={1} sm={2} md={4}>
                <ProductCard 
                    price={price}
                    title={title}
                    location={location}
                    image={imageUrl}
                />
                </Grid>
            ))}
            </Grid>
        </div>
    )
}

export default ProductBox;