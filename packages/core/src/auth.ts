import { createMiddleware } from "hono/factory";
import { LambdaEvent } from "hono/aws-lambda";

type EnhancedLambdaEvent = LambdaEvent & {
  requestContext?: {
    authorizer?: {
      jwt?: {
        claims: {
          sub: string;
        };
      };
    };
  };
};

type AuthEnv = {
  Variables: {
    userId: string;
  };
  Bindings: {
    event: EnhancedLambdaEvent;
    context: LambdaEvent;
  };
};

export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
  const userId = c.env.event.requestContext?.authorizer?.jwt?.claims.sub;
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  c.set("userId", userId);
  await next();
});
