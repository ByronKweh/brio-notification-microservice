import { Injectable } from '@nestjs/common';

export interface SendEmailDTO {
  email: string;
  subject: string;
  content: string;
}
@Injectable()
export class EmailChannelService {
  async sendEmail(data: SendEmailDTO) {
    console.log(`email_sent: ${JSON.stringify(data)}`);
  }
}
