import { withUrqlClient } from 'next-urql'
import { Link } from '@chakra-ui/react'
import Layout from '../components/layout'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from 'next/link'

const Index = () => {
  const [{ data }] = usePostsQuery()

  return (
    <Layout>
      <NextLink href='/create-post'>
        <Link>create post</Link>
      </NextLink>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => {
          return <div key={post.id}>{post.title}</div>
        })
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
