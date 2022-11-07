import { useState, useCallback } from "react";

import { VStack, Icon, useToast, FlatList } from "native-base";

import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Octicons } from '@expo/vector-icons'

import { api } from "../services/api";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolCard, PoolCardProps } from '../components/PoolCard'
import { EmptyPoolList } from "../components/EmptyPoolList";
import { Loading } from '../components/Loading'


export function ShowPolls() {
  const navigation = useNavigation();

  const [polls, setPolls] = useState<PoolCardProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()

  async function getPolls() {
    try {
      setIsLoading(true)
      const response = await api.get('/pools')
      setPolls(response.data.pools)

    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    getPolls()
  }, []))

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack mt={6} pb={4} mx={6} mb={4} borderBottomWidth={1} borderBottomColor="gray.600">
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigation.navigate('find')}
        />
      </VStack>

      {
        isLoading ? <Loading /> :
        <FlatList
          data={polls}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PoolCard 
              data={item}
              onPress={() => navigation.navigate('details', { id: item.id })} 
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      }

    </VStack>
  )
}