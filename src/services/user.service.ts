import {User, PlatformType} from '../entities/user.entity';

export async function getUsers() {
  const users: User[] = await User.find({withDeleted: false});
  return users;
}

export async function getUser(id: number) {
  const user: User = await User.findOne({id});
  return user;
}

export async function addUser(nickname: string, platformType?: PlatformType) {
  const user: User = new User();
  user.nickname = nickname;
  if (platformType) {
    user.platformType = platformType;
  }
  await user.save();
  return user;
}

export async function updateUser(id: number, nickname: string) {
  const user: User = await User.findOne({id});
  user.nickname = nickname;
  await user.save();
  return user;
}

export async function deleteUser(id: number) {
  const user: User = await User.findOne({id});
  await user.softRemove();
  return user;
}
