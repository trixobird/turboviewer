FROM public.ecr.aws/lambda/nodejs:20-arm64 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
ARG lambda
# Set working directory
WORKDIR /app
RUN pnpm install turbo --global
COPY . .
RUN turbo prune --scope=$lambda --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
ARG lambda
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Generate prisma client
COPY ./packages/database/prisma/schema.prisma ./packages/database/prisma/schema.prisma
RUN pnpm --filter=database prebuild

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=$lambda

# Remove node_module and src folders
RUN rm -rf node_modules && pnpm recursive exec -- rm -rf ./node_modules ./src

FROM base AS stripper
WORKDIR /app

COPY --from=installer /app .
RUN pnpm install --prod --ignore-scripts --=-meta-insights
RUN pnpm install --prod --workspace-root extensionless

FROM base AS runner
ARG lambda
ENV NODE_OPTIONS="--conditions=javascript --import=extensionless/register $NODE_OPTIONS"

COPY --from=stripper /app ${LAMBDA_TASK_ROOT}

CMD [ "apps/channel-meta-insights/dist/index.handler" ]
