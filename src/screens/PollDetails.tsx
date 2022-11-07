import { HStack, useToast, VStack } from "native-base";
import { Header } from "../components/Header";

import { Share } from 'react-native'

import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from "react";

import { Loading } from "../components/Loading";
import { PoolCardProps } from '../components/PoolCard'
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Guesses } from '../components/Guesses'

import { api } from "../services/api";

interface RouteParams {
  id: string
}

export function PollDetails() {
  const route = useRoute()
  const { id } = route.params as RouteParams

  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')

  const [isLoading, setIsLoading] = useState(true)
  const [pollDetails, setPollDetails] = useState<PoolCardProps>({} as PoolCardProps)

  const toast = useToast()

  async function getPollDetails() {
    try {
      const response = await api.get(`/pools/${id}`)
      setPollDetails(response.data.pool)

    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false)
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: pollDetails.code
    })
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }

  useEffect(() => {
    getPollDetails()
  }, [id])

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header 
        title={pollDetails.title} 
        showBackButton 
        showShareButton 
        onShare={handleCodeShare}
      />

      {
        pollDetails._count?.participants > 0 ? 
        <VStack>
          <PoolHeader data={pollDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb="5">
            <Option 
              title="Seus palpites" 
              isSelected={optionSelected === 'guesses'}
              onPress={() => setOptionSelected('guesses')}
            />
            <Option 
              title="Ranking do grupo" 
              isSelected={optionSelected === 'ranking'} 
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>
          
          <Guesses poolId={pollDetails.id} code={pollDetails.code} />
        </VStack>
        :
        <EmptyMyPoolList code={pollDetails.code} />
      }

    </VStack>
  )
}