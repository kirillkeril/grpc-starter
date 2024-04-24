// Примерно так вижу схему для grpc
export default {
    name: 'Greeter',
    version: '0.0.1',
    rpc: {
        "unary:SayHi": (ctx: any) => {
            ctx.res = {greeting: 'name'}
        },
        "duplex:SayHello": (ctx: any) => {
            ctx.req.on('data', d => {
                ctx.res.write({greeting: 'test'});
            })
            ctx.req.on('end', d => {
                ctx.res.end();
            })
        }
    }
}