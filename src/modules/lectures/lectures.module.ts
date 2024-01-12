import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { LecturesController } from './lectures.controller';
import { LecturesService } from './lectures.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  controllers: [LecturesController],
  providers: [LecturesService],
})
export class LecturesModule {}
