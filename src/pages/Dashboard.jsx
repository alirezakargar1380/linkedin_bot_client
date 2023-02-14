import { Card, CardBody, CardHeader, Heading, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Component } from "react";

export default class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      connections: [],
      user: {},
      isLoading: false,
      count: 10
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3333/api/connections/report/exporting/count`)
      .then(({ data }) => {
        console.log(data)
        this.setState({
          ...data
        })
      })
  }

  render() {
    return (
      <Card mb={10}>
        <CardHeader>
          <Heading size={'md'}>expoerted users sections data report:</Heading>
        </CardHeader>
        <CardBody>
          <Stack direction={'row'}>
            <Text color={'green.400'} fontWeight='bold'>{this.state?.exported_users + " /"}</Text>
            <Text color={'red.600'} fontWeight='bold'>{this.state?.not_exported_users}</Text>
          </Stack>
        </CardBody>
      </Card>
    )

  }
}