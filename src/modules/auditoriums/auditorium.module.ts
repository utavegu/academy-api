import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditorium } from './entities/auditorium.entity';
import { AuditoriumsController } from './auditorium.controller';
import { AuditoriumsService } from './auditorium.service';

@Module({
  imports: [TypeOrmModule.forFeature([Auditorium])],
  controllers: [AuditoriumsController],
  providers: [AuditoriumsService],
})
export class AuditoriumsModule {}
