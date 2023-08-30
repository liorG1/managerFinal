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
    Spinner
  } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default  function AllUsers(){

        const [success,setSuccess]=useState()
        
        console.log(success);
        const [user,setUser]=useState()

        const all=async()=>{
            const response=await axios.get('https://server-spuh.onrender.com/users/getAll')
            console.log(response.data);
            return response.data
        }
       
     useEffect(()=>{all().then(data=>{setSuccess(true);setUser(data.users)}).catch(err=>setSuccess(false))},[success])

    return (
<>
{success==undefined?<Spinner/>:
<TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>name</Th>
        <Th>email</Th>
        <Th >phone number</Th>
        <Th>address</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
user?user.map(user=>{
    return (
        <Tr>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.phone_number}</Td>
            <Td>{user.country} {user.streetAndApartment}</Td>
        </Tr>
    )
}):<>cant get users</>
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
}
</>
    )

}

