import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  createContact(@Body() data: any) {
    return this.contactsService.createContact(data);
  }

  @Get()
  getAllContacts() {
    return this.contactsService.getAllContacts();
  }
}
