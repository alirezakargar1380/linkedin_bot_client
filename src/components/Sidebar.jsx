import { InfoIcon } from '@chakra-ui/icons'
import { List, ListIcon, ListItem } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    return (
        <List color={"white"} fontSize={"1em"} spacing={3}>
            <ListItem>
                <NavLink to={"/"}>
                    <ListIcon as={InfoIcon} color={"white"} mb={0.6} />
                    Dashboard
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink to={"/profile"}>profile</NavLink>
            </ListItem>
        </List>
    )
}
