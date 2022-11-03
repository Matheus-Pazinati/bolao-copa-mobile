import { createContext, ReactNode } from 'react'

interface UserType {
  name: String
  avatarUrl: String
}

export interface AuthContextDataProps {
  user: UserType
  signIn: () => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  async function signIn() {
    console.log("Fez Login")
  }

  const user: UserType = {
    name: 'Pedro Henrique',
    avatarUrl: 'https://github.com/Matheus-Pazinati.png'
  }

  return (
    <AuthContext.Provider value={{user, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}