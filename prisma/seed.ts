import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { permissions, roles, users } from './seeds/data';


const prisma = new PrismaClient()

async function main() {
  
  await prisma.permissionRole.deleteMany()
  await prisma.roleUser.deleteMany()
  await prisma.permission.deleteMany()
  await prisma.role.deleteMany()
  await prisma.user.deleteMany()
  

  const execut = true
  if (execut) {
      //cria as permissoes
    for (let permission of permissions) {
      await prisma.permission.create({
        data: {
          description: permission.description,
          name: permission.name,
          id: uuid()
        }
      })
    }

    //cria as roles
    for (let role of roles) {
      await prisma.role.create({
        data: {
          id: uuid(),
          description: role.description,
          name: role.name,
        }
      })
    }
    
    const getRoleAdmin = await prisma.role.findFirst({
      where: {
        name: 'admin'
      }
    })

    

    if (getRoleAdmin) {

      const getPermission = await prisma.permission.findMany()
      if (getPermission.length >= 1) {
        for (let permission of getPermission) {
          await prisma.permissionRole.create({
            data: {
              permissionId: permission.id,
              roleId: getRoleAdmin.id
            }
          })
        }
      }

      //cria os usuarios
      for (let user of users) {
        const hashPassword = await bcrypt.hash(user.password, 8)
        const id = uuid()
        await prisma.user.create({
          data: {
            id: id,
            username: user.username,
            email: user.email,
            password: hashPassword,
            roles: {
              create: {
                roleId: getRoleAdmin.id
              }              
            }
          }
        })
      }
    }
  }

}

main().catch(e => {
  console.log(e)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})
