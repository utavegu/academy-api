import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalData } from './entities/personal-data.entity';
import { PersonalDataController } from './personal-data.controller';
import { PersonalDataService } from './personal-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalData])],
  controllers: [PersonalDataController],
  providers: [PersonalDataService],
  exports: [PersonalDataService],
})
export class PersonalDataModule {}
