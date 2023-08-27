import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Select,Stack,
    Badge
  } from '@chakra-ui/react'
import axios from 'axios'
import { color } from 'framer-motion'
import { useEffect, useState } from 'react'
export default function AllOrders(){

const [data,setData]=useState()
const [loading,setLoading]=useState(false)

const url='http://localhost:3000/orders/all'
const getAll=async()=>{
    try {
        const response=await axios.get(url)
        console.log('response');
        console.log(response['data']['orders']);
         return (response['data']['orders']) 
    } catch (error) {
        console.log(error);
    }
    
}
useEffect(()=>{
   getAll().then(order=>{
     setData(order)
     setLoading(true)
    console.log(data);
   })
},[loading])



const status=async(e)=>{
  const status= e.target.value;
  const id= e.target.id;
  const response=await axios.get(`http://localhost:3000/orders/updateStatus/${id}/${status}`)
  console.log(response);
}

const AllOrders=()=>{
  location.assign(`${location.origin}/orders/all`);
}

const DoneOrders=()=>{
  location.assign(`${location.origin}/orders/done`);
}

const ProgressOrders=()=>{
  location.assign(`${location.origin}/orders/progress`)
}

const OrderCard=(e)=>{
  const oredrId= e.target.parentElement.id
 location.assign(`${location.origin}/orders/example/${oredrId}`) 
}
    return(
      <>
      <Stack direction='row'>
  <Badge onClick={AllOrders}>All</Badge>
  <Badge colorScheme='green' onClick={DoneOrders}>Done</Badge>
  <Badge colorScheme='red' onClick={ProgressOrders}>Progress</Badge>
</Stack>
      
        <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>order number</Th>
        <Th>date</Th>
        <Th>costumer name</Th>
        <Th >phone number</Th>
        <Th>address</Th>
        <Th>total price</Th>
        <Th>status</Th>
      </Tr>
    </Thead>
    <Tbody>
 {
    data?data.map(order=>{
        return(

<Tr key={order._id} id={order._id} onDoubleClick={OrderCard}>
    <Td key={order.id}>{order._id}</Td>
    <Td key={order.date}>{order.date}</Td>
     <Td key={order.user_detalis.name}>{order.user_detalis.name}</Td>
    <Td key={order.user_detalis.phone_number}>{order.user_detalis.phone_number}</Td>
    <Td key={order.user_detalis.address}>{order.user_detalis.address}</Td> 
    <Td key={order.totalPrice}>{order.totalPrice}</Td>
    <Td key={order.status}>
    <Select id={order._id} placeholder={order.status} onChange={status}  width={'max-content'}>
      {
        order.status=='progress'?<option value="done">done</option>:<option value="progress">progress</option>
      }

</Select>
    </Td>
</Tr>
        )
    }):<Tr key={'err'}><Td>there is no orders</Td></Tr>
} 
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
      </>
    )

}