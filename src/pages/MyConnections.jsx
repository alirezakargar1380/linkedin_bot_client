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
  Container,
  Card, CardHeader, CardBody, CardFooter, Stack, Button, ListIcon, Box, FormControl, Input, Spinner, FormHelperText, Text
} from '@chakra-ui/react'
import axios from 'axios'
import { Component } from 'react'
import { Field, Form, Formik } from 'formik';

export default class MyConnections extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      isLoading: true,
      count: "1",
      pagination: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.ResetApi = this.ResetApi.bind(this)
    this.exportingMyConnectionSections = this.exportingMyConnectionSections.bind(this)
  }

  componentDidMount() {
    this.getData(1)
  }

  getData(page) {
    console.log(page)
    axios.get(`http://localhost:3333/api/connections/my_connection/${page}`)
      .then(({ data }) => {
        console.log(data.data)
        this.setState({
          data: data.data,
          isLoading: false,
          pagination: data.pagination,
          current_page: page
        })
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      isLoading: true
    })
    axios.post(`http://localhost:3333/api/bot/exporting/my_connection`)
      .then(({ data }) => {
        this.getData(1)
        this.setState({
          isLoading: false
        })
      })
  }

  exportUsersConnectionSections(_id) {
    this.setState({
      isLoading: true
    })
    axios.get(`http://localhost:3333/api/bot/exporting/user_connection/all_sections_info/${this.state.count}/${_id}`)
      .then(({ data }) => {
        this.setState({
          isLoading: false
        })
      })
  }

  exportingMyConnectionSections() {
    this.setState({
      isLoading: true
    })
    axios.post(`http://localhost:3333/api/bot/exporting/my_connection/all_sections_info/${this.state.count}`).then(() => {
      this.getData(this.state.current_page)
    })
  }

  ResetApi() {
    this.setState({
      isLoading: true
    })
    axios.delete(`http://localhost:3333/api/connections/delete_all`).then(() => {
      this.getData(this.state.current_page)
    })
  }

  render() {
    return (
      <Formik>
        <Form onSubmit={this.handleSubmit}>
          <Card>
            <CardHeader>
              <Stack spacing={4} direction='row' align='center'>
                <Button type='submit' colorScheme='linkedin' size='sm' isDisabled={(this.state.data.length) ? true : false}>Export My Connections Name's</Button>
                <Input placeholder='count' value={this.state.count} htmlSize={8} width='auto' name='count' onChange={this.handleChange} />
                <Button colorScheme='linkedin' size='sm' isDisabled={(this.state.data.length && !this.state.isLoading) ? false : true}
                  onClick={this.exportingMyConnectionSections}>Export My Connections Section's</Button>
                <Button type='button' whiteSpace={'pre-line'} colorScheme={'linkedin'} size='sm' isDisabled={(this.state.data.length && !this.state.isLoading) ? false : true}
                  onClick={() => {
                    this.setState({
                      isLoading: true
                    })
                    axios.post(`http://localhost:3333/api/bot/exporting/user_connection/${this.state.count}?my_connection=1`).then(() => {
                      this.getData(this.state.current_page)
                    })
                      .catch((e) => {
                        this.setState({
                          isLoading: false
                        })
                        console.log(e.response.data)
                      })
                  }}>
                  <Text width={'100%'} isDisabled={(!this.state.isLoading) ? false : true} py={"5"}>Export Users Connection Name's</Text>
                </Button>

                <Button type='button' colorScheme={'red'} size='sm' isDisabled={(!this.state.isLoading) ? false : true}
                  onClick={this.ResetApi}>Reset</Button>
              </Stack>
            </CardHeader>
            <CardBody textAlign={'center'}>
              {this.state.isLoading ? <Spinner size='md' /> : null}
              {(!this.state.data.length) ? <Text fontSize='xl'>There is no data to show</Text> :
                <TableContainer>
                  <Table variant='striped'>
                    <Thead>
                      <Tr>
                        <Th>name</Th>
                        <Th>current job title</Th>
                        <Th>is From MyConnection?</Th>
                        <Th>exported Connection list?</Th>
                        <Th>exported section Data?</Th>
                        <Th>Linkedin page</Th>
                        {/* <Th>user connection sections</Th> */}
                        <Th>connection number</Th>
                        <Th>section details</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {this.state.data.map((item, index) => {
                        return (
                          <Tr key={index}>
                            <Td>{item.name}</Td>
                            <Td>{item.current_job_title}</Td>
                            <Td>{(item.isFromMyConnection) ? <AddIcon as={CheckIcon} color={"green.300"} /> : <AddIcon as={CloseIcon} color={"red.400"} />}</Td>
                            <Td>{(item.exportedConnectionData) ? <AddIcon as={CheckIcon} color={"green.300"} /> : <AddIcon as={CloseIcon} color={"red.400"} />}</Td>
                            <Td>{(item.exportedSectionsData) ? <AddIcon as={CheckIcon} color={"green.300"} /> : <AddIcon as={CloseIcon} color={"red.400"} />}</Td>
                            <Td textAlign={"center"}>
                              <Box as='a' color='teal.400' href={item.link}>
                                <AddIcon as={ExternalLinkIcon} />
                              </Box>
                            </Td>
                            {/* <Td>
                              <Button
                                colorScheme={'linkedin'}
                                isDisabled={(item.exportedConnectionData && !this.state.isLoading && item.connection_link) ? false : true}
                                onClick={() => {
                                  this.exportUsersConnectionSections(item._id)
                                }}>
                                Export This User Connection Sections
                              </Button>
                            </Td> */}
                            <Td>
                              {item.connections_names.length}
                            </Td>
                            <Td>
                              <Box
                                as='a'
                                color='teal.400'
                                href={"/user/" + item._id}>
                                <Button
                                  colorScheme={'linkedin'}
                                  isDisabled={(item.exportedSectionsData && !this.state.isLoading) ? false : true}>
                                  <AddIcon as={ExternalLinkIcon} />
                                </Button>
                              </Box>
                            </Td>
                          </Tr>
                        )
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              }
            </CardBody>
            <CardFooter justifyContent={'center'}>
              <Stack spacing={0.5} direction='row' align='center'>
                {this.state.pagination.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      isDisabled={item.disabled}
                      onClick={() => {
                        this.getData(item.value)
                      }}
                      colorScheme={(item.value === this.state.current_page) ? 'facebook' : "blue"} size='xs'>{item.value}</Button>
                  )
                })}
              </Stack>
            </CardFooter>
          </Card>
        </Form>
      </Formik >
    )
  }

}
