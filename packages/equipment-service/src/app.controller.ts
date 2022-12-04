import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('default')
export class AppController {
  @Get('health')
  getHealth(): string {
    console.log('sdasdf');
    return 'All ok';
  }

  @Get('test')
  getTest(): string {
    console.log('sdasdf');
    return 'waaa';
  }
}
