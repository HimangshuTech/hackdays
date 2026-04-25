import { prisma } from "../db/client"
export const Authservice = {
  async signup(name, password, email) {
    const emailexist = await prisma.user.findFirst({
      where: {
        email: email
      }
    }
    )
    if (emailexist) {
      return
    }
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password
      }, select: {
        name: true,
        email: true
      }
    })
    return user;
  }
}
