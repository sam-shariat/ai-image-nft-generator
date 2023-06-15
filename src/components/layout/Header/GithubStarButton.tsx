import { Button } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { GITHUB_URL } from 'utils/config'
import { LinkComponent } from '../Link/LinkComponent'

interface Props {
  label: string
}
export function GithubStarButton({ label }: Props) {
  return (
    <LinkComponent href={GITHUB_URL}>
    <Button gap={2} variant={'solid'} borderRadius={12} colorScheme='gray'>
      <FaGithub /> {label}
    </Button>
    </LinkComponent>
  )
}
