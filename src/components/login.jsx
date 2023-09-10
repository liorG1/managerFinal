import { Box, Input, useToast } from '@chakra-ui/react'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useCookies } from 'react-cookie';
export default function Login(){
    const [userDetails,setDetails]=useState({
        name:'',
        email:'',
        password:''
    })

    console.log(location.origin);

    const [success,setSuccess]=useState(null)
    const [err,setError]=useState(null)

    const [cookies, setCookie] = useCookies(['token']);

    const addDetail=(e)=>{
        console.log(e.target.name);
        setDetails({...userDetails,[e.target.name]:e.target.value})
        console.log(userDetails);
    }

    const login= async(e)=>{
        
        e.preventDefault();
        try {
            const response=await axios.post(
                "https://server-spuh.onrender.com/users/login",
                userDetails,
                {
                   headers :{"Content-Type":"application/json"},
                }
            )
            console.log('response');
            console.log(response);
            setCookie('token',response.data.token)
            
            if( response.data.success){
                setSuccess(true)
            }
            else{
                setSuccess(false)
                setError(response.data.err)
            }
        } catch (error) {
            console.log(error);
            setSuccess(false)
            setError(error.response.data.err)
        }
        }
    return(
        <Box as={"form"} backgroundColor={'black'} >
            <div style={{color:"#CBB26A",fontSize:"2em"}}>Login page</div>
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

        <button type='submit' onClick={login} >click to login</button>

        {success&&<div>wellcome {userDetails.name}</div>}
        {success==false&&<div>login falild error: {err}</div>}
        </Box>
    )
}

