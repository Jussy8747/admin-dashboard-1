import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useGetProductQuery } from "../../slices/globalSliceApi";
import Header from "../../component/Header";

const Product = ({
  _id,
  name,
  rating,
  price,
  description,
  stat,
  supply,
  category,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>

        <Typography varient="h5" component="div">
          {name}
        </Typography>

        <Typography
          varient="h5"
          color={theme.palette.secondary[400]}
          sx={{ mb: "1.5rem" }}
        >
          ${Number(price).toFixed(2)}
        </Typography>

        <Rating value="rating" readOnly />

        <Typography varient="body">{description}</Typography>
      </CardContent>

      <CardContent>
        <Button
          varient="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See more
        </Button>
      </CardContent>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>supply Left: {supply}</Typography>
          <Typography>
            Yearly sales this Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Unists Sale This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  console.log(data);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subTitle="See your list of product" />
      {data || isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          {data?.map(
            ({
              _id,
              name,
              rating,
              price,
              description,
              stat,
              supply,
              category,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                rating={rating}
                price={price}
                description={description}
                stat={stat}
                supply={supply}
                category={category}
              />
            )
          )}
        </Box>
      ) : (
        <>loading...</>
      )}
    </Box>
  );
};

export default Products;
