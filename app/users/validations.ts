import { z } from "zod"

export const FrontendUser = z.object({
  id: z.number(),
  name: z.string().nullable(),
  email: z.string().email(),
  role: z.string(),
})

export const CreateUser = z.object({
  name: z.string().optional(),
  email: z.string().email(),
})

export const ConnectUser = z.object({
  id: z.number(),
})

export const CreateOrConnectUser = CreateUser.extend({
  id: z.number(),
})

export const PrismaCreateUser = z.object({
  create: CreateUser,
})

export const PrismaConnectUser = z.object({
  connect: ConnectUser,
})

export const PrismaCreateOrConnectUser = z.object({
  createOrConnect: CreateOrConnectUser,
})

export const PrismaUserForeignReference = z.union([
  PrismaCreateUser,
  PrismaConnectUser,
  PrismaCreateOrConnectUser,
])
