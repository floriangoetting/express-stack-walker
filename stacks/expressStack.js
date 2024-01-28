const { createNodeClient } = require('@elbwalker/client-node')
const {validateEvent} = require('@elbwalker/utils')

function expressStack(config){
    const { elb, instance } = createNodeClient(config)

    const push = async (req) => {
        let event = validateEvent(JSON.parse(req.body), config.contracts);
        const result = await instance.push(event);
        return result;
    };

    const stack = {
        config,
        instance,
        elb,
        push,
    };
    
    return stack;
}

module.exports = {
    expressStack
}