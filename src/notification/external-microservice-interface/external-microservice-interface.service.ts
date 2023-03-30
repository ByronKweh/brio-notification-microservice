import { Injectable } from '@nestjs/common';

export interface UserResponseDTO {
  first_name: string;
  is_subscribed: boolean;
  email: string;
}

export interface CompanyResponseDTO {
  company_name: string;
  is_subscribed: boolean;
}

@Injectable()
export class ExternalMicroserviceInterfaceService {
  async getUserById(user_id: number): Promise<UserResponseDTO> {
    //pretend an GRPC / HTTP call was made here
    const result = {
      first_name: 'Nabil',
      is_subscribed: true,
      email: 'Nabil@briohr.com',
    };
    return result;
  }

  async getCompanyById(company_id: number): Promise<CompanyResponseDTO> {
    return {
      company_name: 'BrioHR',
      is_subscribed: true,
    };
  }
}
