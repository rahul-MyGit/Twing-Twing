import { Post as PostData } from "../utils/db/dummy"

interface Props {
  post: PostData
}
function Post({post}: Props) {
  return (
    <div>Postzzzzz</div>
  )
}

export default Post