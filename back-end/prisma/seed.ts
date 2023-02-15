import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Creates the default records on the DB
async function main() {
  await prisma.todoColumn.create({
    data: {
      columnName: "To-do",
    },
  });

  await prisma.todoColumn.create({
    data: {
      columnName: "In progress",
    },
  });

  await prisma.todoColumn.create({
    data: {
      columnName: "Done",
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
