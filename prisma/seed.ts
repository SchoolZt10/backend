import { $Enums, PrismaClient } from '@prisma/client'
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient()

const categories = [
  { name: "Для батків" },
  { name: "Для учнів" },
  { name: "Новини" },
]

async function main() {
  // await prisma.$transaction(async (tx) => {
  //   categories.forEach(async (category) => {
  //     await tx.category.create({
  //       data: category
  //     })
  //   })
  // })

  await prisma.category.createMany({
    data: categories
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

