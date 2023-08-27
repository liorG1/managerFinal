import { Flex } from "@chakra-ui/react";
import { Link,Outlet } from "react-router-dom";

export default function Links(){
    return (
        <Flex direction={"row"} width={'100%'} justifyContent={'center'} display={'block'}>
        <Link to={'allProducts'}>click to all products (manager)</Link>
        <Link to={'/allUsers'}>click to all users</Link>
        <Link to={'/Login'}>click to login</Link>
        <Link to={'/Registrate'}>click to registrate</Link>
        <Link to={'/addProduct'}>click to add product</Link>
        <Link to={'/orders/all'}>all orders</Link>
        <Link to={'products/all'}>all products client</Link>
        <Outlet></Outlet>
        </Flex>
    )
}

