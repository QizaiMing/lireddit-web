import { Box, Button, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useMeQuery } from '../generated/graphql'

interface NavBarProps {}

export const Navbar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery()
  let body = null

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href='/login'>
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>Register</Link>
        </NextLink>
      </>
    )
    // user is logged in
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data?.me?.username}</Box>
        <Button variant='link'>Logout</Button>
      </Flex>
    )
  }

  return (
    <Flex bg='tan' p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  )
}