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
  Card, CardHeader, CardBody, CardFooter, Stack, Button
} from '@chakra-ui/react'

export default function Profile() {
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
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  )
}
