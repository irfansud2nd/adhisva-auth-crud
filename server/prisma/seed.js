import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const initialBlogs = [];
const initialUsers = [];

const main = async () => {
  console.log("Start seeding...");

  for (let i = 1; i <= 3; i++) {
    initialUsers.push({
      name: `User ${i}`,
      email: `user${i}@gmail.com`,
      password: bcrypt.hashSync("1234", 10),
    });
  }

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  for (let i = 1; i <= 10; i++) {
    initialBlogs.push({
      title: `Title ${i}`,
      slug: `title-${i}`,
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam assumenda debitis in, explicabo ipsum, aliquam impedit, tempora est repellendus non a praesentium. Velit, voluptatum amet distinctio, voluptatibus placeat officiis odio rem qui voluptas exercitationem magni laudantium, eligendi non adipisci dolore? Blanditiis, odio exercitationem hic dolorem veritatis iste quisquam? Dolorum, nesciunt.`,
      published: i < 7,
      authorEmail: `user${getRandomNumber(1, 3)}@gmail.com`,
    });
  }

  for (const user of initialUsers) {
    const newUser = await prisma.user.create({
      data: user,
    });
    console.log(`Created user Email=>${newUser.email}`);
  }

  for (const blog of initialBlogs) {
    const newBlog = await prisma.blog.create({
      data: blog,
    });
    console.log(
      `Created blog ID=>${newBlog.id}|authorEmail=>${newBlog.authorEmail}`
    );
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
