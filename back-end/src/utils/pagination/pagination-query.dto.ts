import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export interface IPaginationData {
  page: number;

  totalDocs: number;
  totalPages: number;

  hasNext: boolean;
  hasPrev: boolean;
}

export class PaginationQueryDto {
  @IsString()
  @ApiProperty({ required: false })
  search: string = '';

  @IsNumberString()
  @ApiProperty({ required: true })
  limit: string = '5';

  @IsNumberString()
  @ApiProperty({ required: true })
  page: string = '1';
}
