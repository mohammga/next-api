const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const names = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Brown',
];

async function main() {
    for (let i = 0; i < names.length; i++) {
        const nameParts = names[i].split(' ');
        const firstName = nameParts[0].toLowerCase();
        const lastName = nameParts[1].toLowerCase();

        // Create a hashed password (you can customize the actual password)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(`passwordFor${firstName}`, salt);

        await prisma.user.create({
            data: {
                name: names[i],
                email: `${firstName}.${lastName}@example.com`,
                password: hashedPassword
            },
        });
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
