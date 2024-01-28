const logDestination = {
  type: 'log',
  config: {},
  push: (events) => {
    console.dir({ date: Date.now(), events }, { depth: 4, color: true });
  },
};

module.exports = {
    logDestination
}