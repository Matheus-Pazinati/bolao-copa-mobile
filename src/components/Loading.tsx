import React from 'react'
import { Center, Spinner } from 'native-base'


export function Loading() {
  return (
    <Center bgColor="gray.900">
      <Spinner flex={1} color="yellow.500" />
    </Center>
  )
}