import * as React from 'react';
import ProductCard from '../ProductCard';
import { makeStyles } from "@material-ui/styles";
import Grid from '@mui/material/Grid';
import { getItemsGroupedByCategories } from '../../api/category';
import {useState, useEffect} from 'react';
import { set } from 'js-cookie';


const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        marginLeft: "30px",
    }
}))

let vehicle = [];


const ProductBox = ({allItems}) => {
    const [isLoading, setIsLoading] = useState(true);
    const {container} = useStyles();
    const [items, setItems] = useState();
    const [electronics, setElectronics] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [petSupplies, setPetSupplies] = useState([]);
    const [hobbies, setHobbies] = useState([]);

    const sortItemsByCategories = (data) => {
        console.log('data', data)
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == 'Vehicle') {
                console.log('vehicle', data[i].items)
                setVehicles(data[i].items);
            } else if (data[i].name == 'Hobbies') {
                console.log('hobbies', data[i].items)
                setHobbies(data[i].items)
            } else if (data[i].name == 'Pet Supplies') {
                setPetSupplies(data[i].items)
            } else if (data[i].name == 'Electronics') {
                setElectronics(data[i].items)
            }
        }
    }

    useEffect(() => {
        getItemsGroupedByCategories()
            .then((res) => {
                sortItemsByCategories(res.data.categories)
                setIsLoading(false);
                console.log('res', res.data.categories)
            })
            .catch((err) => {
                setIsLoading(false);
                console.log('err')
            })
    }, [])

    const body = isLoading ? <div>Loading...</div> : (
        <div>
            <div id="electronics">
                <h1>Electronics</h1>
            </div>
            <hr />
            {electronics.length > 0 ? 
                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 20 }}>
                    {electronics.map(electronic => {
                        return (
                            <Grid item xs={1} sm={2} md={4}>
                                <ProductCard 
                                    price={electronic.price}
                                    title={electronic.name}
                                    image={electronic.image}
                                />
                            </Grid>)
                    })} 
                </Grid>
                :
                <p>
                    No Items Currently
                </p>
            }
            <div id="vehicles">
                <h1>Vehicles</h1>
            </div>
            <hr />
            {vehicles.length > 0 ? 
                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 20 }}>
                    {vehicles.map(vehicle => {
                        return (
                            <Grid item xs={1} sm={2} md={4}>
                                <ProductCard 
                                    price={vehicle.price}
                                    title={vehicle.name}
                                    image={vehicle.image}
                                />
                            </Grid>)
                    })} 
                </Grid>
                :
                <p>
                    No Items Currently
                </p>
            }
            <div id="pet-supplies">
                <h1>Pet Supplies</h1>
            </div>
            <hr />
            {petSupplies.length > 0 ? 
                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 20 }}>
                    {petSupplies.map(supply => {
                        return (
                            <Grid item xs={1} sm={2} md={4}>
                                <ProductCard 
                                    price={supply.price}
                                    title={supply.name}
                                    image={supply.image}
                                />
                            </Grid>)
                    })} 
                </Grid>
                :
                <p>
                    No Items Currently
                </p>
            }
            <div id="hobbies">
                <h1>Hobbies</h1>
            </div>
            <hr/>
            {hobbies.length > 0 ? 
                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 20 }}>
                {hobbies.map(hobby => {
                    return (
                        <Grid item xs={1} sm={2} md={4}>
                            <ProductCard 
                                price={hobby.price}
                                title={hobby.name}
                                image={hobby.image}
                            />
                        </Grid>)
                    })} 
                </Grid>
                :
                <p>
                    No Items Currently
                </p>
            }
        </div>
    )

    return (
        <div className={container}>
            {body}
        </div>
    )
}

export default ProductBox;
