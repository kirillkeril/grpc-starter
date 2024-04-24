import {credentials, loadPackageDefinition} from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
var PROTO_PATH = './proto/test.proto';

// Демонстрационный клиент
export function main() {
    const def = protoLoader.loadSync(PROTO_PATH);
    const proto = loadPackageDefinition(def);
    const greeterServiceClient = new proto.Greeter('127.0.0.1:50051', credentials.createInsecure());
    greeterServiceClient.SayHi({name: 'test'}, (err, res) => {
        console.log(err, res);
    });
}

