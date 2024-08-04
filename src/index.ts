import { Elysia } from 'elysia';
import router from './Routes/route';

const app = new Elysia();
app.group('/api', (app) => app.use(router)).listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
