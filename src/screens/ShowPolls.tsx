import { VStack, Icon } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Octicons } from '@expo/vector-icons'

import { Button } from "../components/Button";
import { Header } from "../components/Header";

export function ShowPolls() {
  const navigation = useNavigation();

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
    </VStack>
  )
}