import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create user in the database using prisma
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "EMAIL",
    },
  });
  console.log(user);

  // Get all users from prisma
  const users = await prisma.user.findMany();
  console.log(users);

  // Create Article and associate it with user
  const article = await prisma.article.create({
    data: {
      title: "John Doe First Article",
      body: "John Doe Made It",
      authur: {
        connect: { id: 1 }
      }
    }
  })
  console.log(article);

  // Get all articles from prisma
  const allArticles = await prisma.article.findMany();
  

  // Create articles and users and associate them 
  const user = await prisma.user.create({
    data: {
      name: "John Second",
      email: "EMAILSecond",
      articles: {
        create: {
          title: "John Doe Second Article",
          body: "John Doe Second It",
        }
      }
    }
  })

  console.log(user);

  // using findMany to get user with their associate fields
    const userIncludesArticle = await prisma.user.findMany({
      include: {
        articles: true
      }
    });

  console.log(userIncludesArticle);

 // Create another article
 const article = await prisma.article.create({
  data: {
    title: "Sample Article",
    body: "This is another article",
    authur: {
      connect: { id: 2 }
    }
  }
 })

 console.log(article);

  // Loops over certain user's article
  userIncludesArticle.forEach((user) => {
    console.log(`User: ${user.name}, Email: ${user.email}`);
    console.log('Article: ');
    user.articles.forEach((article) => {
      console.log(`- Title: ${article.title}, - Body: ${article.body}`);
    })
    console.log("\n")
  });

  // Update data
  const user = await prisma.user.update({
    where: {
      id: 1
    },
    data:{
      name: 'New John Jr.'
    }
  })

  console.log(user)

  // Remove data
  const article = await prisma.article.delete({
    where:{
      id:2
    }
  })

  console.log(article)

  console.log(userIncludesArticle)

}

main()
  .then(async () =>{
    await prisma.$disconnect();
  })
  .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
  });