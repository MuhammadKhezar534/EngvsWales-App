import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }


    async findUserByEmailAndPassword(
        email: string,
        password: string,
    ): Promise<any> {
        const user = await this.userModel
            .findOne({
                $expr: {
                    $and: [{ $eq: ['$email', email] }, { $eq: ['$password', password] }],
                },
            })
            .exec();
        return user;
    }

    async findUserByEmail(email: string): Promise<any> {
        const user = await this.userModel.findOne({ email }).exec();
        return user;
    }



}



