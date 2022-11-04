import { Heading, VStack, Text } from 'native-base'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

import Logo from '../assets/logo.svg'

export function NewPoll() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title='Criar novo bolão' />

      <VStack mt={8} alignItems="center" mx={5}>
        <Logo />
        <Heading fontFamily='heading' color="white" textAlign="center" mt={8} mb={8}>
          Crie seu próprio bolão da copa {'\n'}
           e compartilhe entre amigos!
        </Heading>
        <Input placeholder='Qual nome do seu bolão?' mb={2} />
        <Button title='CRIAR MEU BOLÃO' />
        <Text color="gray.200" mt={4} textAlign="center" px={6}>
           Após criar seu bolão, você receberá um código único que poderá usar para convidar {'\n'}
          outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}