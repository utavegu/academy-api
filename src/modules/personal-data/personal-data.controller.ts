import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PersonalDataService } from './personal-data.service';
import { PersonalData } from './entities/personal-data.entity';

@Controller('personal')
export class PersonalDataController {
  constructor(private readonly personalDataService: PersonalDataService) {}

  @Post()
  createPersonalData(@Body() data: any) {
    return this.personalDataService.createPersonalData(data);
  }

  @Get()
  getAllPersonalData() {
    return this.personalDataService.getAllPersonalData();
  }

  @Get(':passport')
  checkPerson(@Param('passport') passport: PersonalData['passport']) {
    return this.personalDataService.findPerson(passport);
  }
}
