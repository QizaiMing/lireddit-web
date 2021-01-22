import { withUrqlClient } from 'next-urql'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'
import Layout from '../components/Layout'
import { useDeletePostMutation, usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from 'next/link'
import React, { useState } from 'react'
import UpdootSection from '../components/UpdootSection'
import { DeleteIcon } from '@chakra-ui/icons'

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string
  })
  const [{ data, fetching }] = usePostsQuery({
    variables
  })

  const [, deletePost] = useDeletePostMutation()

  if (!fetching && !data) {
    return <div>Your query failed for some reason</div>
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((post) =>
            !post ? null : (
              <Flex key={post.id} p={5} shadow='md' borderWidth='1px'>
                <UpdootSection post={post} />
                <Box flex={1}>
                  <NextLink href='/post/[id]' as={`/post/${post.id}`}>
                    <Link>
                      <Heading fontSize='xl'>{post.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by {post.creator.username}</Text>
                  <Flex align='center'>
                    <Text flex={1} mt={4}>
                      {post.textSnippet}
                    </Text>
                    <IconButton
                      colorScheme='red'
                      ml='auto'
                      onClick={() => {
                        deletePost({ id: post.id })
                      }}
                      icon={<DeleteIcon />}
                      aria-label='delete post'
                    />
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt
              })
            }}
            isLoading={fetching}
            m='auto'
            my={8}>
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
