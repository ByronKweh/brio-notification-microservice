import { Injectable } from '@nestjs/common';

interface UserResponseDTO {
  first_name: string;
  is_subscribed: boolean;
}

interface CompanyResponseDTO {
  company_name: string;
  is_subscribed: boolean;
}

@Injectable()
export class ExternalMicroserviceInterfaceService {
  async getUserById(user_id: number): Promise<UserResponseDTO> {
    //pretend an GRPC / TCP call was made here
    const result = {
      first_name: 'Nabil',
      is_subscribed: true,
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
