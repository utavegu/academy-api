import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createContact(contactData: any): Promise<Contact> {
    try {
      const newContact = await this.contactsRepository.save(contactData);
      return newContact;
    } catch (err) {
      console.error(err);
    }
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.contactsRepository.find();
  }
}
