import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret', // Replace with your actual secret key
      signOptions: { expiresIn: '1d' }, // Replace with your preferred expiration time
    }),
  ],
  exports: [JwtModule],
})
export class JwtSharedModule {}