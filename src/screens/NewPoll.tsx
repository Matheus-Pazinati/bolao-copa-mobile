import { useState } from 'react'

import { Heading, VStack, Text, useToast } from 'native-base'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

import Logo from '../assets/logo.svg'
import { api } from '../services/api'

export function NewPoll() {
  const toast = useToast()

  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleCreatePoll() {
    if (!title.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão',
        bgColor: 'red.500',
        placement: 'top'
      })
    }

    try {
      setIsLoading(true)
      await api.post('/pools', { title })
      toast.show({
        title: 'Bolão criado com sucesso',
        bgColor: 'green.500',
        placement: 'top'
      })
      setTitle('')

    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Erro ao criar o bolão',
        bgColor: 'red.500',
        placement: 'top'
      })

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title='Criar novo bolão' />

      <VStack mt={8} alignItems="center" mx={5}>
        <Logo />
        <Heading fontFamily='heading' color="white" textAlign="center" mt={8} mb={8}>
          Crie seu próprio bolão da copa {'\n'}
           e compartilhe entre amigos!
        </Heading>
        <Input 
          placeholder='Qual nome do seu bolão?' 
          mb={2} 
          onChangeText={setTitle}
          value={title}
        />
        <Button title='CRIAR MEU BOLÃO' onPress={handleCreatePoll} isLoading={isLoading} />
        <Text color="gray.200" mt={4} textAlign="center" px={6}>
           Após criar seu bolão, você receberá um código único que poderá usar para convidar {'\n'}
          outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}