import {credentials, loadPackageDefinition} from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
const PROTO_PATH = './proto/test.proto';

// Демонстрационный клиент
export function main() {
    const def = protoLoader.loadSync(PROTO_PATH);
    const proto = loadPackageDefinition(def);
    const greeterServiceClient = new proto.Greeter('127.0.0.1:50051', credentials.createInsecure());
    const call = greeterServiceClient.SayHello();
    call.on('status', s => {
        console.log(s)
    })
    call.on('data', d => {
        console.log(d)
    })
    call.on('error', e => {
        console.error(e)
    })
    call.write({name: 'test'});
    call.end();
}

