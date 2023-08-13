import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const ctxgql = GqlExecutionContext.create(ctx);
    return ctxgql.getContext().req.user;
  },
);
