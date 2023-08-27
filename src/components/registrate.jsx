import { Box, Input,InputGroup ,InputLeftAddon} from '@chakra-ui/react'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
  

export default function Registrate(){
    const [userDetails,setDetails]=useState({
        name:undefined,
        email:undefined,
        password:undefined,
        address:'noni',
        phone_number:undefined
    })

    const [success,setSuccess]=useState(null)
    const [err,setError]=useState(null)
    const addDetail=(e)=>{
        console.log(e.target.name);
        setDetails({...userDetails,[e.target.name]:e.target.value})
        console.log(userDetails);
    }

    const submit= async(e)=>{
        e.preventDefault();
        try {
            const response=await axios.post(
                "http://localhost:3000/users/registrate",
                userDetails,
                {
                   headers :{"Content-Type":"application/json"},
                }
            )
            console.log(response);
            if( response.data.success){
                setSuccess(true)
            location.href='http://localhost:5173/allProducts'
            }
            else{
                setSuccess(false)
                setError(response.data.message)
            }
        } catch (error) {
            console.log(error);
            setSuccess(false)
            setError(error.response.data.err)
        }
        }
    return(
        <Box as={"form"}>
            <div style={{color:"red",fontSize:"2em"}}>registrate page</div>
        <FormControl id='name' >
        <FormLabel htmlFor='name' required>full name</FormLabel>
        <Input name='name' required type='text' onChange={addDetail} />
        </FormControl>

        <FormControl id='email' >
        <FormLabel htmlFor='email' required> email</FormLabel>
        <Input name='email' required type='email' onChange={addDetail} />
        </FormControl>

        <FormControl id='password' >
        <FormLabel htmlFor='password' required>password</FormLabel>
        <Input name='password' required type='password' onChange={addDetail} />
        </FormControl>





        <FormControl id='phone_number' >
        <FormLabel htmlFor='phone_number' required>phone number</FormLabel>
        <InputGroup>
        <InputLeftAddon children='+972' />
        <Input name='phone_number' required type='tel'  onChange={addDetail} />
        </InputGroup>
        </FormControl>
        <button type='submit' onClick={submit} >click to submit</button>

        {success&&<div>wellcome {userDetails.name}</div>}
        {success==false&&<div>registrate falild error: {err}</div>}
        </Box>
    )
}
