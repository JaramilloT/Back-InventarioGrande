import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('protected')
@UseGuards(JwtAuthGuard)
export class ProtectedController {
  @Get()
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}
