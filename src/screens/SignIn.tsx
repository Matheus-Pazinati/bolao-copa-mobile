import React from "react";
import { Center, Icon, Text } from "native-base";

import { Fontisto } from '@expo/vector-icons'

import Logo from '../assets/logo.svg'
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {

  const { signIn } = useAuth()

  return (
    <Center flex={1} bgColor="gray.900" p={7} >
      <Logo width={212} height={40} />
      <Button 
        title="Entrar com Google"
        leftIcon={<Icon as={Fontisto} name={'google'} width={20} height={20} />}
        mt={12}
        type="SECONDARY"
        onPress={signIn}
      />

      <Text color="#C4C4CC" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}