'use strict';

const { Contract } = require('fabric-contract-api');

class Counter extends Contract {

    async createCounter(ctx, name, type, number) {
        const counter = {
            "name": name,
            "type": type,
            "value": Number(number),
        };

        await ctx.stub.putState(name, Buffer.from(JSON.stringify(counter)));
    }

    async updateCounter(ctx, name) {
        const counterAsBytes = await ctx.stub.getState(name); // get the counter from chaincode state
        if (!counterAsBytes || counterAsBytes.length === 0) {
            throw new Error(`${name} does not exist`);
        }
        const counter = JSON.parse(counterAsBytes.toString());
        counter.value = counter.value + (counter.type == "up" ? 1 : -1);

        await ctx.stub.putState(name, Buffer.from(JSON.stringify(counter)));
    }

    async readCounter(ctx, namew) {
        const counterAsBytes = await ctx.stub.getState(name); // get the counter from chaincode state
        if (!counterAsBytes || counterAsBytes.length === 0) {
            throw new Error(`${name} does not exist`);
        }
        const counter = JSON.parse(counterAsBytes.toString());
        const ret = {
            "name": counter.name,
            "value": counter.value,
        }
        return ret;
    }
}

module.exports = Counter;