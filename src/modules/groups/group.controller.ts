import { Controller, Get, Post, Body } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  createGroup(@Body() { groupName }: { groupName: string }) {
    return this.groupService.createGroup(groupName);
  }

  @Get()
  getAllGroups() {
    return this.groupService.getAllGroups();
  }
}
