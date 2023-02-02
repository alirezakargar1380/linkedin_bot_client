import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
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
  Card, CardHeader, CardBody, CardFooter, Stack, Button, ListIcon
} from '@chakra-ui/react'
import axios from 'axios'
import { Component } from 'react'


export default class Profile extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    axios.get(`http://localhost:3333/api/connections/my_connection/1`)
      .then(({ data }) => {
        this.setState({
          data: data
        })
        console.log(data)
      })
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <Stack spacing={4} direction='row' align='center'>
            <Button colorScheme='linkedin' size='sm'>Export My Connections Data</Button>
          </Stack>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant='striped'>
              <Thead>
                <Tr>
                  <Th>name</Th>
                  <Th>is From MyConnection?</Th>
                  <Th>exported Connection Data?</Th>
                  <Th>exported section Data?</Th>
                </Tr>
              </Thead>
              <Tbody>
                {this.state.data.map((item, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{item.name}</Td>
                      <Td>{(item.isFromMyConnection) ? <AddIcon as={CheckIcon} /> : <AddIcon as={CloseIcon} />}</Td>
                      <Td>{(item.exportedConnectionData) ? <AddIcon as={CheckIcon} /> : <AddIcon as={CloseIcon} />}</Td>
                      <Td>{(item.exportedSectionsData) ? <AddIcon as={CheckIcon} /> : <AddIcon as={CloseIcon} />}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    )
  }

}
