import { HttpException, HttpStatus } from '@nestjs/common';

export class MicroserviceException extends HttpException {
  constructor() {
    super('MicroserviceException', HttpStatus.FAILED_DEPENDENCY);
  }
}
