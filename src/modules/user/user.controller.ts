import {
    Controller,

} from '@nestjs/common';
import { UserService } from './user.service';


// @UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

}
