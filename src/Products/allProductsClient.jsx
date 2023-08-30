import {Box, Card, CardHeader, CardBody, CardFooter, useStatStyles,Stack,Heading,Text,Divider,ButtonGroup,Button,Image } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'


export default function AllProductsClient(){
    const [data,setData]=useState()
    const [loading,setLoading]=useState()
    const fetch=async()=>{
        try {
            const response=await axios.get('https://server-spuh.onrender.com/products/all')
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{

        fetch().then(pro=>{setData(pro);console.log(data);setLoading(true)})
    },[loading])

    const displayProduct=(e)=>{
            const url ='http://'+ location.host+`/products/byId/${e.target.id}`
            location.assign(url)
    }
    return(
<Box display={'flex'} flexDirection={['column','row']} gap={10}>

{
    data&&data.map(product=>{return(
<Card maxW='sm' key={product.id} >
  <CardBody>
    <Image
      src={product.img}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{product.name}</Heading>
      <Text>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, earthy toned spaces and for people who love a chic design with a
        sprinkle of vintage design.
      </Text>
      <Text>catagory :{product.catagory}</Text>
      <Text color='blue.600' fontSize='2xl'>
       {product.price}
      </Text>
    </Stack>
  </CardBody>
  <Divider />

</Card>
     ) })

}

</Box>
    )}
