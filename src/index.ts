import Mali from "mali-fork";
import {main} from "../client.ts";
// WAGNING - ТЕСТОВАЯ ВЕРСИЯ ТОЛЬКО ДЛЯ ДЕМОНСТРАЦИИ
export const startGRPCFromSchema = async () => {
    let mod: any;
    try {
        mod = await import('../server.ts')
        // Validations
        if (!mod.default) {
            process.exit(1);
        }
        if (!mod.default.rpc || !mod.default.rpc.proto) {
            process.exit(1);
        }
        if (!mod.default.rpc.services) {
            process.exit(1);
        }

        // load proto file and create app
        const protoPath = mod.default.rpc.proto
        const app = new Mali(protoPath);

        let service: string;
        for (const [serviceName, RPCs] of Object.entries(mod.default.rpc.services)) {
            service = serviceName;
            for (const [rpc, handler] of Object.entries(RPCs)) {
                app.use(service, rpc, handler);
            }
        }
        app.start('127.0.0.1:50051').then(() => {
            console.log('gRPC server started');
        })
    } catch (e) {
        console.log(e)
    }
}

startGRPCFromSchema().then(() => {
    main();
});
