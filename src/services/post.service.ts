// entity를 import하여 비즈니스 로직을 구성(service)
import {Post} from '../entities/post.entity';
import {Hashtag} from '../entities/hashtag.entity';

export async function getPosts() {
  const posts: Post[] = await Post.find({
    relations: ['comments', 'hashtags'],
  });
  return posts;
}

export async function addPost(
  title: string,
  content: string,
  hashtags: string[]
) {
  const post: Post = new Post();
  post.title = title;
  post.content = content;
  const hashtagEntities: Hashtag[] = [];
  for (const hashtag of hashtags) {
    let hashtagEntity: Hashtag = await Hashtag.findOne({
      where: {
        name: hashtag,
      },
    });

    if (!hashtagEntity) {
      hashtagEntity = new Hashtag();
      hashtagEntity.name = hashtag;
      await hashtagEntity.save();
    }
    hashtagEntities.push(hashtagEntity);
  }
  post.hashtags = hashtagEntities;
  await post.save();
  return post;
}

export async function updatePost(id: number, title: string, content: string) {
  const post: Post = await Post.findOne({id});
  post.title = title;
  post.content = content;
  await post.save();
  return post;
}

export async function deletePost(id: number) {
  const post: Post = await Post.findOne({id});
  await post.remove();
  return post;
}
