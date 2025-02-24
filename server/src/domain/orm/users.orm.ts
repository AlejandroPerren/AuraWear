import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export const listOfUsersORM = async () => {
  try {
    const users = await prisma.user.findMany();
    return users.length > 0 ? users : null;
  } catch (error) {
    throw new Error("Error en ORM: " + error);
  }
};

// Buscar usuario por email
export const searchUserORM = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user || null;
  } catch (error) {
    throw new Error("Error en ORM: " + error);
  }
};
