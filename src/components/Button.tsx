import { Button as ButtonNativeBase, Text, IButtonProps } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  type?: 'PRIMARY' | 'SECONDARY'
}

export function Button({ title, type = "SECONDARY", ...props }: ButtonProps) {
  return (
    <ButtonNativeBase 
      {...props} 
      rounded="sm" 
      w='full'
      h={14}
      mb={4}
      bgColor={type === "SECONDARY" ? "red.500" : "yellow.500"}
      _pressed={{
        bg: type === "SECONDARY" ? "red.600" : "yellow.600"
      }}
    >
      <Text 
        fontWeight="bold" 
        fontSize="sm" 
        textTransform="uppercase"
        color={type === "SECONDARY" ? "white" : "black"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}