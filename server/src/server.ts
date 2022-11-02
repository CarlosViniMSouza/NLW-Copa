import Fastify from "fastify";
import cors from "@fastify/cors";
import ShortUniqueId from "short-unique-id";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true,
    });

    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count();

        return { count };
    });

    fastify.post('/pools', async (request, reply) => {
        const createPoolBody = z.object({
            title: z.string(),
        });

        const { title } = createPoolBody.parse(request.body);

        const generateId = new ShortUniqueId({ length: 8 });
        const code = String(generateId()).toUpperCase();

        await prisma.pool.create({
            data: {
                title,
                code
            }
        });

        return reply.status(201).send({ code });
    });

    await fastify.listen({ port: 3030, /*host: '0.0.0.0'*/ });
}

bootstrap();
