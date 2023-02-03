import { Grid, GridItem } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

export default function RootLayout() {
  return (
    <Grid templateColumns='repeat(10, 1fr)' bg={'gray.50'}>
      <GridItem
        as={"aside"}
        colSpan={{ '2xl': 1, xl: 2, lg: 2, md: 2, sm: 2 }}
        bg={"purple.400"}
        minHeight={"100vh"}
        p={"28px"}
        // paddingRight={"66px"}
      >
        <Sidebar />
      </GridItem>
      <GridItem as={"main"} colSpan={{ '2xl': 9, xl: 8, lg: 8, md: 8, sm: 8 }} p={"40px"}>
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  )
}
