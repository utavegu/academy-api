import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {}

  async createContact(contactData: any): Promise<Contact> {
    try {
      const contacts = await this.findContactsByPnoneOrEmail(
        contactData.phone,
        contactData.email,
      );
      if (contacts.length) {
        throw new BadRequestException('Такой контакт уже есть в базе!');
      }
      const newContact = await this.contactsRepository.save(contactData);
      return newContact;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.contactsRepository.find();
  }

  async findContactsByPnoneOrEmail(
    phone: Contact['phone'],
    email: Contact['email'],
  ): Promise<Contact[]> {
    try {
      const contacts = await this.contactsRepository.find({
        where: [{ phone }, { email }],
      });
      return contacts;
    } catch (err) {
      console.error(err);
    }
  }

  async updateContact(
    phone: Contact['phone'],
    data: Omit<Contact, 'phone' | 'student' | 'teacher'>,
  ): Promise<UpdateResult> {
    try {
      const updateResult = await this.contactsRepository.update(phone, data);
      if (!updateResult.affected) {
        throw new BadRequestException('Ошибка обновления контакта!');
      }
      return updateResult;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }
}
