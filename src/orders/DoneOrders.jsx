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
    Button,
    Badge,
    Stack
  } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

  export default function DoneOrders(){


    const [data,setData]=useState()
    const [loading,setLoading]=useState(false)

    const fetch=async()=>{

        try {
            const response=await axios.get('http://localhost:3000/orders/all')
           return response
        } catch (error) {
            console.log(error.message);
        }
    }
    const changeStatus =async(e)=>{
        try {
            const id= e.target.id;
            const response=await axios.get(`http://localhost:3000/orders/updateStatus/${id}/progress`)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
      
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

useEffect(()=>{

    fetch().then(ordersObj=>{
setData(ordersObj)
setLoading(true)
console.log('loading');
console.log(loading);
    console.log(data);
    
})


    
},[loading]
)

    return (<>
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
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Thead>
     <Tbody>
      {
 data?data.data.orders.filter(order=>order.status=='done').map(order=>{
return(
    <Tr key={order._id} id={order._id} onDoubleClick={OrderCard}>
    <Td key={order.id}>{order._id}</Td>
    <Td key={order.date}>{order.date}</Td>
    <Td key={order.user_detalis.name}>{order.user_detalis.name}</Td>
    <Td key={order.user_detalis.phone_number}>{order.user_detalis.phone_number}</Td>
    <Td key={order.user_detalis.address}>{order.user_detalis.address}</Td>
    <Td key={order.totalPrice}>{order.totalPrice}</Td>
    <Td><Button id={order._id} onClick={changeStatus}>progress</Button></Td>
</Tr>
)
}):<Tr><Td>no done orders</Td></Tr> 

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
</>  )
  }