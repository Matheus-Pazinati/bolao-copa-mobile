import { createContext, ReactNode, useState, useEffect } from 'react'

import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'

import { api } from '../services/api'

WebBrowser.maybeCompleteAuthSession()

interface UserType {
  name: String
  avatarUrl: String
}

export interface AuthContextDataProps {
  user: UserType
  isUserLoading: boolean
  signIn: () => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {


  const [user, setUser] = useState<UserType>({} as UserType)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })


  async function signIn() {
    try {
      setIsUserLoading(true)
      await promptAsync()

    } catch (error) {
      console.log(error)
      throw error

    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(accessToken: string) {
    try {
      setIsUserLoading(true);
      
      const tokenResponse = await api.post('/users', {
        accessToken
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`

      const userInfoResponse = await api.get('/me');
      setUser(userInfoResponse.data.user)

    } catch (error) {
      console.log(error);
      throw error;

    } finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    if (response?.type === "success" && response?.authentication.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  },[response])

  return (
    <AuthContext.Provider value={{user, signIn, isUserLoading}}>
      {children}
    </AuthContext.Provider>
  )
}