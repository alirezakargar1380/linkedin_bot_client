import { AddIcon, CheckIcon, CloseIcon, ExternalLinkIcon } from '@chakra-ui/icons'
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
  Container, Heading,
  Card, CardHeader, CardBody, CardFooter, Stack, Button, ListIcon, Box, FormControl, Input, Spinner, FormHelperText, Text
} from '@chakra-ui/react'
import axios from "axios";
import React, { Component } from "react"
import { useParams } from "react-router-dom";

export default class Create extends Component {
  constructor() {
    super()
    this.state = {
      connections: [],
      user: {},
      isLoading: true
    }
  }

  componentDidMount() {
    const { user_id } = this.props.match
    axios.get(`http://localhost:3333/api/connections/${user_id}`).then(({ data }) => {
      this.setState({
        connections: data
      })
    })
    axios.get(`http://localhost:3333/api/connections/all_sections/info/${user_id}`).then(({ data }) => {
      console.log(data[0])
      this.setState({
        user: data[0]
      })
    })
  }

  render() {
    return (
      <>
        <Card mb={10}>
          <CardHeader>
            <Heading size={'md'}>user connection list</Heading>
          </CardHeader>
          <CardBody>
            {(!this.state.connections.length) ? <Text fontSize='xl'>There is no data to show</Text> :
              <TableContainer>
                <Table variant='striped'>
                  <Thead>
                    <Tr>
                      <Th>name</Th>
                      {/* <Th>is From MyConnection?</Th>
                        <Th>exported Connection list?</Th>
                        <Th>exported section Data?</Th>
                        <Th>Linkedin page</Th>
                        <Th>user connection sections</Th>
                        <Th>connection number</Th> */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {this.state.connections.map((item, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{item.user.name}</Td>
                          {/* <Td>{(item.user.isFromMyConnection) ? <AddIcon as={CheckIcon} color={"green.300"} /> : <AddIcon as={CloseIcon} color={"red.400"} />}</Td>
                            <Td>{(item.user.exportedConnectionData) ? <AddIcon as={CheckIcon} color={"green.300"} /> : <AddIcon as={CloseIcon} color={"red.400"} />}</Td>
                            <Td>{(item.user.exportedSectionsData) ? <AddIcon as={CheckIcon} color={"green.300"} /> : <AddIcon as={CloseIcon} color={"red.400"} />}</Td>
                            <Td textAlign={"center"}>
                              <Box as='a' color='teal.400' href={item.link}>
                                <AddIcon as={ExternalLinkIcon} />
                              </Box>
                            </Td>
                            <Td>
                              <Button
                                colorScheme={'linkedin'}
                                isDisabled={(item.user.exportedConnectionData && !this.state.isLoading && item.user.connection_link) ? false : true}
                                onClick={() => {
                                  this.exportUsersConnectionSections(item._id)
                                }}>
                                Export This User Connection Sections
                              </Button>
                            </Td>
                            <Td>
                              {item.user.connections_names.length}
                            </Td>
                            <Td>
                              <Box
                                as='a'
                                color='teal.400'
                                href={"/user/" + item._id}>
                                <Button
                                  colorScheme={'linkedin'}
                                  isDisabled={(item.exportedConnectionData && !this.state.isLoading && item.connection_link) ? false : true}>
                                  <AddIcon as={ExternalLinkIcon} />
                                </Button>
                              </Box>
                            </Td> */}
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            }
          </CardBody>
        </Card>
        <Card mb={10}>
          <CardHeader>
            <Heading size={'md'}>
              Contact Info
            </Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped'>
                <Thead>
                  <Tr>
                    <Th>title</Th>
                    <Th>value</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {this.state.user?.contactinfos?.map((item, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{item.title}</Td>
                        <Td>{item.value}</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
        <Card mb={10}>
          <CardHeader>
            <Heading size={'md'}>
              About
            </Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize='xl'>{this.state.user?.about?.text}</Text>
          </CardBody>
        </Card>
        <Card mb={10}>
          <CardHeader>
            <Heading size={'md'}>
              Skills
            </Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped'>
                <Thead>
                  <Tr>
                    <Th>title</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {this.state.user?.skills?.map((item, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{item.title}</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
        <Card mb={10}>
          <CardHeader>
            <Heading size={'md'}>
              Languages
            </Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped'>
                <Thead>
                  <Tr>
                    <Th>title</Th>
                    <Th>description</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {this.state.user?.languages?.map((item, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{item.title}</Td>
                        <Td>{item.des}</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
        <Card mb={10}>
          <CardHeader>
            <Heading size={'md'}>
              Courses
            </Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='striped'>
                <Thead>
                  <Tr>
                    <Th>title</Th>
                    <Th>description</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {this.state.user?.courses?.map((item, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{item.title}</Td>
                        <Td>{item.description}</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </>
    )
  }

}
// export default function Create() {

//   const params = useParams();
//   console.log(params)
//   return (
//     <div>Create</div>
//   )

// }


