import { StackContext, Api, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: {
          DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL!,
        },
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.handler",
      "POST /todo": "packages/functions/src/todo.handler",
      "PUT /todo/{id}": "packages/functions/src/todo.handler",
      "GET /profile": "packages/functions/src/profile.handler",
    },
  });

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteUrl: web.url,
  });
}
