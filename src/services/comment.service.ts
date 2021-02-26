// entity를 import하여 비즈니스 로직을 구성(sevice)
import {Comment} from '../entities/comment.entity';
import {Post} from '../entities/post.entity';

export async function addComment(postId: number, content: string) {
  const comment: Comment = new Comment();
  const post: Post = await Post.findOne({id: postId});
  if(!post){
    throw Error('No post');
  }
  comment.content = content;
  comment.post = post;
  await comment.save();
  return comment;
}

export async function deleteComment(postId: number, id: number) {
  Post.id = postId;
  const comment: Comment = await Comment.findOne({id});
  await comment.remove();
  return comment;
}
