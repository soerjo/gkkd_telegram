import { PartialType } from '@nestjs/mapped-types';
import { CreateGkkdUserDto } from './create-gkkd-user.dto';

export class UpdateGkkdUserDto extends PartialType(CreateGkkdUserDto) {}
