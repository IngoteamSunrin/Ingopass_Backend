import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';

@Module({
  providers: [RentalService]
})
export class RentalModule {}
