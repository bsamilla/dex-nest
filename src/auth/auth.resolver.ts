import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  signUp(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const trainer = this.authService.signUp(username, password);
    return trainer;
  }

  @Mutation(() => String)
  logIn(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.logIn(username, password);
  }
}
