import {Text, Card, CardHeader, CardBody, CardFooter ,Heading,Stack,StackDivider,Image,Box,Divider,ButtonGroup,Button} from '@chakra-ui/react'
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'



export default function OrderCard(){
  const order_id= location.href.split('/').reverse()[0]
  const [cookie]=useCookies(['token'])
const [data,setData]=useState()
const [loading,setLoading]=useState()
 const [userId,setUserId]=useState() 
 const [userDetails,setUserDetails]=useState()
 const [check,setCheck]=useState(false)
const [products,setProducts]=useState([])
const fetch=async()=>{
  const response=await axios.get(`http://localhost:3000/orders/ById/${order_id}`)
  
  /* setData(response)
  console.log(data);

  setUserDetlis(await axios.get(`http://localhost:3000/users/getUser`,{
    headers:{
      token:cookie.token
    }
  })) */

  /* console.log(userDetalis); */
  /* console.log(response.data.order); */
  return response
  
}



const getUserDetalis=async()=>{

    const detalis=await axios.post('http://localhost:3000/users/getUser',{
      id:userId
    })
    return detalis 
}

const productsDetalis=async(id)=>{
    const response=await axios.get(`http://localhost:3000/products/ById/${id}`)
    return response.data.product
}

useEffect(()=>{
  fetch().then(response=>{
    setUserId(response.data.order.user_detalis)
    setData(response.data.order)  
   
    

    getUserDetalis().then(userd=>{
       if(userd.data.message=='valid user'){
         setUserDetails(userd) 
         data.products.map(async(id)=>{ 
          productsDetalis(id).then(pro=>{setProducts(pervPro=>[...pervPro,pro])})
          
        })
       setCheck(true)
      } 
      
    })
    })
},[userId])

/* useEffect(()=>{
  console.log(`secend`);
  console.log(userId);
    getUserDetalis().then(userd=>{
      console.log(userd);
      
      
    })
    console.log(userDetails);
  
},[userId, userDetails]) */

useEffect(()=>{
/*   console.log(userDetails);
  console.log('data');
  console.log(data);
  console.log(check); */
  console.log('products');
  console.log(products);
},[check])

    return(
      check==true?<Card>
      <CardHeader>
         <Heading size='md'>Order number: {data._id}</Heading> 
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
             <Heading size='xs' >
             <UnorderedList>
             <ListItem>client name : {userDetails.data.userDetails.name}</ListItem>
   <ListItem>client name : {userDetails.data.userDetails.name}</ListItem>
  <ListItem>client phone : {userDetails.data.userDetails.phone_number}</ListItem>
  <ListItem>client address : {userDetails.data.userDetails.address}</ListItem>
  <ListItem>client email : {userDetails.data.userDetails.email}.com</ListItem>
  <ListItem>total price : {data.total_price}$</ListItem>
   <ListItem>loading date : {data.date}$</ListItem>
  <ListItem fontSize={'2xl'}>order status : {data.status}</ListItem>  
</UnorderedList>
            </Heading> 
            <Text pt='2' fontSize='sm'>
              View a summary of all your clients over the last month.
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Overview
            </Heading>
             {products.map(product=>{
              return (
                <Card maxW='sm' display={'inline-flex'}>
                <CardBody>
                  <Image
                    src={product.img}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                  />
                  <Stack mt='6' spacing='3'>
                    <Heading size='md'>{product.name}</Heading>
                    <Text>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur minima repellat, saepe, iure doloremque, id dicta dolor nemo enim nihil deleniti soluta necessitatibus ut sed beatae vero consectetur molestiae rem.
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                      {product.price}$
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />  
              </Card> 
              )
            })
            }  
            
          </Box>
        {/*   <Box>
            <Heading size='xs' textTransform='uppercase'>
              total price
            </Heading>
            <Text pt='2' fontSize='sm'>
              See a detailed analysis of all your business clients.
            </Text>
          </Box> */}
        </Stack>
      </CardBody>
    </Card>:<></>
  
    )
    }

      
