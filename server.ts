// Примерно так вижу схему для grpc
export default {
    name: 'test',
    version: '0.0.1',
    rpc: {
        proto: './proto/test.proto',
        services: {
            Greeter: {
                SayHi: (ctx: any) => {
                    ctx.res = {greeting: 'name'}
                },
                SayHello: (ctx: any) => {
                }
            },
            Worker: {
                DoWork: (ctx: any) => {
                }
            }
        }
    }
}