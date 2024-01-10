import { Controller, Get, Post, Body } from '@nestjs/common';
import { PersonalDataService } from './personal-data.service';

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
}
