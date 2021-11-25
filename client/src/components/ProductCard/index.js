import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "next/link";

export default function ProductCard({ image, price, title, href }) {
  return (
    <Link href={href} passHref>
      <Card sx={{ maxWidth: 345 }} component="a">
        <CardActionArea>
          <CardMedia component="img" height="140" src={image} alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              ${price}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
