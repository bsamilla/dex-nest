import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = this.extractTokenFromHeader(ctx);
    if (!token) {
      throw new UnauthorizedException();
    }
    // try {
    console.log(token);
    const payload = await this.jwtService.verifyAsync(token, {
      secret: 'Random%Key&To%Test&JWT%In&My%New&Dex%App',
    });
    console.log(payload);
    ctx['user'] = payload;
    // } catch {
    //   throw new UnauthorizedException();
    // }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(request.headers.authorization, 'request.headers.authorization');
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
