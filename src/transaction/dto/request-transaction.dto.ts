import { PickType, ApiProperty } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';

export class RequestTransactionDto extends PickType(CreateTransactionDto, [
  'type',
]) {
  @ApiProperty({ isArray: true })
  serialProduct: string[];
  @ApiProperty({ isArray: true })
  qtd: number[];
}
