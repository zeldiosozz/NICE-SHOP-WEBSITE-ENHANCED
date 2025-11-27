// import slugify from 'slugify';
// import {db} from "../lib/db"
// // const prisma = new PrismaClient();

// async function main() {
//   const products = await db.products.findMany();

//   for (const product of products) {
//     if (!product.slug || product.slug.trim() === "") {
//       const generatedSlug = slugify(product.title, {
//         lower: true,
//         strict: true,
//         trim: true
//       });

//       // slug لازم يكون unique — لو لقيت duplicate أضيف رقم
//       let finalSlug = generatedSlug;
//       let counter = 1;

//       while (await db.products.findUnique({ where: { slug: finalSlug } })) {
//         finalSlug = `${generatedSlug}-${counter++}`;
//       }

//       await db.products.update({
//         where: { id: product.id },
//         data: { slug: finalSlug },
//       });

//       console.log(`Added slug for product ${product.title}: ${finalSlug}`);
//     }
//   }

//   console.log("Slug population complete.");
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(() => db.$disconnect());
