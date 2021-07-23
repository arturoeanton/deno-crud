import { Application , Router } from 'https://deno.land/x/oak/mod.ts';
import { database } from './db.ts';


const app = new Application();
const router = new Router();
const port =  8080;


router.get('/cats',  ctx => {
    ctx.response.status = 200;
    ctx.response.body = {success: true, data: database}
})
  
router.get('/api2',  ctx => {
    ctx.response.body = 'Hello deno2';
})


//Logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get('X-Response-Time');
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}ms`);
});

// Timing
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set('X-Response-Time', `${ms}`);
});
app.use(router.routes());
app.use(router.allowedMethods())


app.listen({ port })
console.log(`Server is running on port ${port}`);
