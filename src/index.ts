import Mali from "mali-fork";
import {main} from "../client.ts";
import path from "node:path";
// WAGNING - ТЕСТОВАЯ ВЕРСИЯ ТОЛЬКО ДЛЯ ДЕМОНСТРАЦИИ
export const startGRPCFromSchema = async (proto: string, grpcEndpoint: string) => {
    let mod: any;
    try {
        mod = await import('../server.ts')
        // Validations
        if (!mod.default) {
            process.exit(1);
        }
        if (!mod.default.rpc || !mod.default.rpc) {
            process.exit(1);
        }
        const serviceName = mod.default.name;

        // load proto file and create app
        const app = new Mali(path.resolve(proto), serviceName);

        for (const [rpc, handler] of Object.entries(mod.default.rpc)) {
            const [type, name] = rpc.split(':');
            console.log(`registered ${name} (${type}) rpc in ${serviceName} service`);
            app.use(serviceName, name, handler);
        }
        app.start(grpcEndpoint).then(() => {
            console.log(`gRPC server started on ${grpcEndpoint}`);
        })
    } catch (e) {
        console.log(e)
        throw e
    }
}

startGRPCFromSchema('proto/test.proto', '127.0.0.1:50051').then(() => {
    main();
}).catch(e => {
    console.log(e)
    process.exit(1)
});
