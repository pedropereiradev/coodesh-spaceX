import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class PaginationQueryDto {
  @IsString()
  @ApiProperty({ required: false })
  search: string = '';

  @IsNumberString()
  @ApiProperty({ required: true })
  limit: string = '4';

  @IsNumberString()
  @ApiProperty({ required: true })
  page: string = '1';
}
