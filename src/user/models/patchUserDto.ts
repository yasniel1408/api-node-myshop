import { PutUserDto } from './putUserDto';

export interface PatchUserDto extends Partial<PutUserDto> {}
