import React from 'react';

import {useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { NativeBaseProvider, StatusBar } from "native-base";

import { THEME } from './src/styles/theme'

import { SignIn } from './src/screens/SignIn';
import { Loading } from './src/components/Loading';
import { NewPoll } from './src/screens/NewPoll';

import { AuthContextProvider } from './src/contexts/AuthContext';

export default function App() {
const [fontsLoaded] = useFonts({
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
})

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <NewPoll /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
