import { getRepository } from 'typeorm';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFilename : string;
}

export default class UpdateUserAvatarService{
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRopository = getRepository(User);

    const user = await userRopository.findOne(user_id);

    if(!user){
      throw new AppError('Only authenticated users can change avatar',401);
    }
    if(user.avatar){
      //deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const useravatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(useravatarFileExists){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await userRopository.save(user);

    return user;
  }
}
