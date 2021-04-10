import {User, PlatformType} from '../entities/user.entity';

export async function getUserBySub(sub: string) {
  const user: User = await User.findOne(
    {sub},
    {
      select: [
        'id',
        'sub',
        'email',
        'nickname',
        'platformType',
        'deletedAt',
        'createdAt',
        'updatedAt',
      ],
    }
  );
  return user;
}

export async function addUser(
  sub: string,
  email: string,
  nickname: string,
  platformType: PlatformType
) {
  const user: User = new User();
  user.sub = sub;
  user.nickname = nickname;
  user.email = email;
  user.platformType = platformType;
  await user.save();
  return user;
}

export async function updateUser(id: number, nickname: string) {
  const user: User = await User.findOne(
    {id},
    {
      select: [
        'id',
        'sub',
        'email',
        'nickname',
        'platformType',
        'deletedAt',
        'createdAt',
        'updatedAt',
      ],
    }
  );
  user.nickname = nickname;
  await user.save();
  return user;
}

export async function deleteUser(id: number) {
  const user: User = await User.findOne(
    {id},
    {
      select: [
        'id',
        'sub',
        'email',
        'nickname',
        'platformType',
        'deletedAt',
        'createdAt',
        'updatedAt',
      ],
    }
  );
  await user.remove();
  return user;
}
