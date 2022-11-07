import { Heading, useToast, VStack } from 'native-base'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useState } from 'react'
import { api } from '../services/api'
import { useNavigation } from '@react-navigation/native'


export function FindPoll() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  const { navigate } = useNavigation()

  const toast = useToast()

  async function handleJoinPoll() {
    try {
      setIsLoading(true)
      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código do bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post('/pools/join', { code })

      toast.show({
        title: 'Você entrou no bolão com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

      setIsLoading(false)
      setCode('')
      navigate('pools')
      

    } catch (error) {
        console.log(error)
        setIsLoading(false)
        if (error.response?.data?.message === 'Pool not found.') {
          return toast.show({
            title: 'Bolão não encontrado',
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        if (error.response?.data?.message === 'You already joined this pool.') {
          return toast.show({
            title: 'Você já está participando deste bolão',
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        toast.show({
          title: 'Erro ao encontrar o bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title='Buscar por código' showBackButton />

      <VStack mt={8} alignItems="center" mx={5}>
        <Heading fontFamily='heading' color="white" textAlign="center" mt={8} mb={8}>
          Encontre um bolão através de seu código único
        </Heading>
        <Input 
          placeholder='Qual o código do bolão?' 
          mb={2} 
          autoCapitalize="characters"
          onChangeText={setCode}
        />
        <Button 
          title='PARTICIPAR DO BOLÃO' 
          isLoading={isLoading} 
          onPress={handleJoinPoll}
        />
      </VStack>
    </VStack>
  )
}