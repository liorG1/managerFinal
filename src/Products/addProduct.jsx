import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Cookies, useCookies } from "react-cookie";

export default function AddProduct() {
  const [success, setSuccess] = useState(null);
  const [cookie] = useCookies(["token"]);

  const [product, setProduct] = useState({
    img: "",
    catagory: "",
    price: "",
    description: "",
    brand: "",
    name: "",
  });
  const ProductHandler = (e) => {
    e.preventDefault();
    if (e.target.name != "catagory") {
      setProduct({ ...product, [e.target.name]: e.target.value });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value.split(",") });
    }
    console.log(product);
  };

  const post = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://server-spuh.onrender.com/products/add",
        product,
        {
          headers: {
            token: `token=${cookie.token}`,
          },
        }
      );
      console.log(response.data.message);
      alert(`response : ${response.data.message}`)
    } catch (error) {
      console.log(error.response.data.error);
      alert(`response : ${response.data.message}`)
    }
  };
  return (
    <Box
      as="form"
      onSubmit={(e) => {
        post(e);
      }}
    >
      <span>add product</span>
      <FormControl id="name">
        <FormLabel id="name">product name</FormLabel>
        <Input name="name" onChange={ProductHandler}></Input>
      </FormControl>

      <FormControl id="brand">
        <FormLabel id="brand">product brand</FormLabel>
        <Input name="brand" onChange={ProductHandler}></Input>
      </FormControl>

      <FormControl id="description">
        <FormLabel id="description">product description</FormLabel>
        <Input name="description" onChange={ProductHandler}></Input>
      </FormControl>

      <FormControl id="img">
        <FormLabel id="img">product img</FormLabel>
        <Input name="img" onChange={ProductHandler}></Input>
      </FormControl>

      <FormControl id="price">
        <FormLabel id="price">product price</FormLabel>
        <Input name="price" onChange={ProductHandler}></Input>
      </FormControl>

      <FormControl id="catagory">
        <FormLabel id="catagory">product catagory</FormLabel>
        <Input name="catagory" onChange={ProductHandler}></Input>
      </FormControl>

      <button type="submit">add</button>
    </Box>
  );
}
