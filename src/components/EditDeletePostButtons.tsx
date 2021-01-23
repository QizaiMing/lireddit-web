import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, IconButton, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useDeletePostMutation, useMeQuery } from '../generated/graphql'

interface EditDeletePostButtonsProps {
  id: number
  creatorId: number
}

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId
}) => {
  const { data: meData } = useMeQuery()
  const [deletePost] = useDeletePostMutation()

  if (meData?.me?.id !== creatorId) {
    return null
  }

  return (
    <Box>
      <NextLink href='/post/edit/[id]' as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          icon={<EditIcon />}
          aria-label='edit post'
        />
      </NextLink>

      <IconButton
        onClick={() => {
          deletePost({
            variables: { id },
            update: (cache) => {
              // Post:77
              cache.evict({ id: 'Post:' + id })
            }
          })
        }}
        icon={<DeleteIcon />}
        aria-label='delete post'
      />
    </Box>
  )
}

export default EditDeletePostButtons
