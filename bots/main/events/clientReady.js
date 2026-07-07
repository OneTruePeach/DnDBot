module.exports = {
    name: 'clientReady',
    async execute() {
        console.log(`${new Date().toLocaleString()} - Main     | Bot ready`);
    }
}