import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  search?: string = '';

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  limit?: number = 4;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  totalDocs?: number = null;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  totalPages?: number = 1;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  hasNext?: boolean = false;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  hasPrev?: boolean = false;
}
