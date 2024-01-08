import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async createGroup(groupName: string): Promise<Group> {
    const newGroup = this.groupRepository.create({ groupName });
    return await this.groupRepository.save(newGroup);
  }

  async getAllGroups(): Promise<Group[]> {
    return await this.groupRepository.find();
  }
}
