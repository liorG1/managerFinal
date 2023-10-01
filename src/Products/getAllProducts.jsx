import { Center, list,Button } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect,useState } from 'react'
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
  Input
} from '@chakra-ui/react'
import { Cookies, useCookies } from "react-cookie";


const url='https://server-spuh.onrender.com/products/all'
function AllProducts(){
    const [data,setData]=useState('')
    const [inputElement,setInput]=useState(null)
    const [update,setUpdate]=useState(false)
    const [cookie] = useCookies(["token"]);
    const fetch =async()=>{
      try {
        const respons=await axios.get(url)
                setData(respons["data"]);   
              return respons['data']
         }
      catch (error) {
        console.log(error);
      }}
    


  useEffect(()=>{
    fetch().then(pro=>{setData(pro)})
  
        
      },[inputElement,update])
       const changeInput=(e)=>{

setInput(e.target.parentElement.id)
      } 

      const saveChanges=async(e)=>{
        console.log('change');
        setUpdate(!update) 
      
         const pro=e.target.parentElement.attributes.name.nodeValue
        console.log(pro);
        const value=e.target.previousElementSibling.value
        console.log(value);
        const url='https://server-spuh.onrender.com/products/update/'+ e.target.parentElement.id
        console.log(url);
         const response=await axios.put(
          url,{[pro]:value}, {
            headers: {
              token: `token=${cookie.token}`,
            },
          }
        ) 
        console.log(response); 
      }

      const deleteProduct=async(e)=>{
        const id=e.target.parentElement.id
        const url='https://server-spuh.onrender.com/products/delete/'+id
        console.log(url);
        const response=await axios.delete(url, {
          headers: {
            tokens: `token=${cookie.token}`,
           "Content-Type":"application/json"
          },
        })
        console.log(response);
      }
      
 return(
    <TableContainer >
  <Table variant='striped' colorScheme='teal' >
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>Product name</Th>
        <Th>description</Th>
        <Th textAlign={'center'} isNumeric>price</Th>
        <Th>catagory</Th>
        <Th>image</Th>
        <Th>options</Th>
      </Tr>
    </Thead>
    <Tbody>
     { data?data.map(element => {
      if (inputElement!=element._id){

        return (
          <Tr key={element._id} id={element._id} >
             <Td key={element.name}>{element.name}</Td> 
            <Td key={element.description} >{element.description}</Td>
            <Td key={element.price} textAlign={'center'} >{element.price}</Td>
            <Td key={element.catagory}>{element.catagory}</Td> 
            <Td key={element.img} maxWidth={'50px'} ><img src={element.img} alt="element img" /> </Td>
           <Td id={element._id} display={'flex'} flexDirection={'column'}><Button onClick={changeInput}>edit</Button><Button>delete</Button></Td>
          </Tr>
        )
      }else{
        return(
          <Tr key={element._id} id={element._id} >
             <Td key={element.name} id={element._id} name='name' ><Input placeholder={`${element.name}`}></Input><Button onClick={saveChanges}>save</Button></Td> 
            <Td key={element.description} id={element._id} name='description' ><Input placeholder={`${element.description}`}></Input><Button onClick={()=>{saveChanges}}>save</Button></Td>
            <Td key={element.price} id={element._id} textAlign={'center'} name='price' ><Input placeholder={`${element.price}`}></Input><Button onClick={saveChanges} >save</Button></Td>
            <Td key={element.img} maxWidth={'50px'} id={element._id} name='img'><Input placeholder={`${element.img}`}></Input><Button onClick={()=>{saveChanges}}>save</Button></Td>
           <Td id={element._id} display={'flex'} flexDirection={'column'}><Button onClick={changeInput}>edit</Button><Button colorScheme='red' onClick={deleteProduct}>delete</Button></Td>
          </Tr>
        )
      }
           }):<Tr><Td>no products</Td></Tr>}
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
) 
   }
export default AllProducts
