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

const RANDOM_TERM = [
  '알파카',
  '너구리',
  '감자도리',
  '뱁새',
  '개구리',
  '오리너구리',
  '오이',
  '빛과소금',
  '복숭아',
  '튤립',
];

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export async function getRandomNickname() {
  const randomNickname = `${RANDOM_TERM[randomNumber(0, 9)]}${randomNumber(
    1,
    100000
  )}`;
  const user: User = await User.findOne({
    where: {nickname: randomNickname},
    select: ['id', 'nickname'],
  });
  if (!user) {
    return randomNickname;
  }
  getRandomNickname();
}
