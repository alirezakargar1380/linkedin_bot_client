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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container, Heading,
  Card, CardHeader, CardBody, CardFooter, Stack, Button, ListIcon, Box, FormControl, Input, Spinner, FormHelperText, Text
} from '@chakra-ui/react'
import axios from "axios";
import React, { Component } from "react"
import { useParams } from "react-router-dom";

export default class User extends Component {
  constructor() {
    super()
    this.state = {
      connections: [],
      user: {},
      isLoading: false,
      does_users_have_connection: false,
      count: 10
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { user_id } = this.props.match
    this.getUserConnection()

    axios.get(`http://localhost:3333/api/connections/all_sections/info/${user_id}`).then(({ data }) => {
      console.log(data)
      this.setState({
        user: data[0]
      })
    })
  }

  getUserConnection() {
    const { user_id } = this.props.match
    axios.get(`http://localhost:3333/api/connections/user_connection/${user_id}`).then(({ data }) => {
      this.setState({
        connections: data
      })
    })
    .catch((e) => {
      console.log(e)
    })
  }

  exportUsersConnectionSections() {
    const { user_id } = this.props.match
    this.setState({
      isLoading: true
    })
    axios.post(`http://localhost:3333/api/bot/exporting/user_connection/all_sections_info/${this.state.count}/${user_id}`)
      .then(({ data }) => {
        this.setState({
          isLoading: false
        })
        this.getUserConnection()
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <>
        <Card mb={10}>
          <CardHeader>
            <Heading size={'md'}>Details Of User</Heading>
          </CardHeader>
          <CardBody>
            <div>{this.state.user?.name}</div>
            <div>{this.state.user?.current_job_title}</div>
          </CardBody>
        </Card>

        <Card mb={10}>
          <CardHeader>
            <Heading size={'md'} mb={'3'}>user connection list</Heading>
            <Stack direction={'row'}>

              <Input placeholder='count' value={this.state.count} htmlSize={8} width='auto' name='count' onChange={this.handleChange} />
              <Button
                colorScheme={'linkedin'}
                size='sm'
                isDisabled={(this.state.user.exportedSectionsData && this.state.user.connection_link && this.state.connections.length) ? false : true}
                // isDisabled={(this.state.user.link) ? false : true}
                // && !this.state.isLoading
                onClick={() => {
                  this.exportUsersConnectionSections()
                }}>
                Export {this.state.user?.name + "'s"} Connection users Sections
              </Button>


              <Button type='button' colorScheme={'linkedin'} size='sm'
                onClick={() => {
                  this.setState({
                    isLoading: true
                  })
                  const { user_id } = this.props.match
                  axios.post(`http://localhost:3333/api/bot/exporting/user_connection/${this.state.count}?my_connection=0&id=${user_id}`)
                    .then(() => {
                      this.getUserConnection()
                    })
                    .catch((e) => {
                      this.setState({
                        isLoading: false
                      })
                      alert(e.response.data)
                    })
                }}>Export {this.state.user?.name + "'s"} Connection Name's</Button>

            </Stack>
          </CardHeader>
          <CardBody>
            {(!this.state.connections.length) ? <Text fontSize='xl'>There is no data to show</Text> :
              <TableContainer>
                <Table variant='striped'>
                  <Thead>
                    <Tr>
                      <Th>name</Th>
                      <Th>exported section Data?</Th>
                      {/* <Th>is From MyConnection?</Th>
                        
                        
                        <Th>Linkedin page</Th>
                        <Th>user connection sections</Th>
                        */}
                      <Th>section details</Th>

                    </Tr>
                  </Thead>
                  <Tbody>
                    {this.state.connections.map((item, index) => {
                      if (item.user.connection_link) this.setState({
                        does_users_have_connection: true
                      })
                      return (
                        <Tr key={index}>
                          <Td>
                            <div>{item.user.name}</div>
                            <div>{item.user.current_job_title}</div>
                          </Td>
                          <Td>{(item.user.exportedSectionsData) ? <AddIcon as={CheckIcon} color={"green.300"} /> : <AddIcon as={CloseIcon} color={"red.400"} />}</Td>
                          <Td>
                            <Box
                              as='a'
                              color='teal.400'
                              href={"/user/" + item.user._id}>
                              <Button
                                colorScheme={'linkedin'}
                                isDisabled={(item.user.exportedSectionsData && !this.state.isLoading) ? false : true}>
                                <AddIcon as={ExternalLinkIcon} />
                              </Button>
                            </Box>
                          </Td>


                          {/* 
                            <Td textAlign={"center"}>
                              <Box as='a' color='teal.400' href={item.link}>
                                <AddIcon as={ExternalLinkIcon} />
                              </Box>
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
              Experience
            </Heading>
          </CardHeader>
          <CardBody>
            <Accordion>
              {this.state.user?.experience?.map((item, index) => {
                return (
                  <AccordionItem key={index}>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                        <Text fontSize={'md'}>{item.title}</Text>
                        <Text fontSize={'sm'} color={'gray.400'}>{item.time}</Text>
                        <Text fontSize={'sm'} color={'gray.400'}>{item.desAboutCompany}</Text>
                        <Text fontSize={'sm'} color={'gray.400'}>{item.location}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      {item.subset.map((item, index) => (
                        <Box mt={3} key={index}>
                          <Text bgColor={'gray.400'}>{item.title}</Text>
                          <Text bgColor={'gray.300'}>{item.time}</Text>
                        </Box>
                      ))}
                      <Text fontSize={'sm'} color={'gray.500'}>{item.description}</Text>
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </CardBody>
        </Card>

        <Card mb={10}>
          <CardHeader>
            <Heading size={'md'}>
              educations
            </Heading>
          </CardHeader>
          <CardBody>
            <Accordion>
              {this.state.user?.educations?.map((item, index) => {
                return (
                  <AccordionItem key={index}>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                        <Text fontSize={'md'}>{item.title}</Text>
                        <Text fontSize={'sm'} color={'gray.400'}>{item.year}</Text>
                        <Text fontSize={'sm'} color={'gray.400'}>{item.des}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Text fontSize={'sm'} color={'gray.500'}>{item.aboutUni}</Text>
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
            </Accordion>
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


