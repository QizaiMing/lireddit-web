import { withUrqlClient } from 'next-urql'
import { Navbar } from '../components/Navbar'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index = () => {
  const [{ data }] = usePostsQuery()

  return (
    <>
      <Navbar />
      <div>hello world</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => {
          return <div key={post.id}>{post.title}</div>
        })
      )}
    </>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
