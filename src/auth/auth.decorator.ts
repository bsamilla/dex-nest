import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// This decorator allows to use the current user in resolvers
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlctx = GqlExecutionContext.create(ctx);
    return gqlctx.getContext().req.user;
  },
);
