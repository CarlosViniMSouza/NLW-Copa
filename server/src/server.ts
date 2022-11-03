import Fastify from "fastify";
import cors from "@fastify/cors";

import { poolRoutes } from "./routes/pool";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { userRoutes } from "./routes/user";

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true,
    });

    fastify.get("/", async () => {
        return { message: "Server is Up!" }
    });

    fastify.register(authRoutes);
    fastify.register(gameRoutes);
    fastify.register(guessRoutes);
    fastify.register(userRoutes);
    fastify.register(poolRoutes);

    await fastify.listen({ port: 3030, /*host: '0.0.0.0'*/ });
}

bootstrap();
