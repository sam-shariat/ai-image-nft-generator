import React from 'react'
import { Button, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export function ThemeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button colorScheme='white' aria-label='toggleColorModeButton' onClick={toggleColorMode} variant={'ghost'} px={1}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}
