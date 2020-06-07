'use strict';

const { Contract } = require('fabric-contract-api');

class Counter extends Contract {
    
    async readCounter(ctx, namew) {
        const counterAsBytes = await ctx.stub.getState(name); // get the counter from chaincode state
        if (!counterAsBytes || counterAsBytes.length === 0) {
            throw new Error(`${name} does not exist`);
        }
        const counter = JSON.parse(counterAsBytes.toString());
        return counter;
    }

    async createCounter(ctx, name, type, number) {
        const counter = {
            "name": name,
            "type": type,
            "number": number,
        };

        await ctx.stub.putState(name, Buffer.from(JSON.stringify(counter)));
    }

    async updateCounter(ctx, name) {
        const counterAsBytes = await ctx.stub.getState(name); // get the counter from chaincode state
        if (!counterAsBytes || counterAsBytes.length === 0) {
            throw new Error(`${name} does not exist`);
        }
        const counter = JSON.parse(counterAsBytes.toString());
        counter.number = counter.number + (counter.type == "up" ? 1 : -1);

        await ctx.stub.putState(name, Buffer.from(JSON.stringify(counter)));
    }
}

module.exports = Counter;