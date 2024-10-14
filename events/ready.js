module.exports = {
    name: 'ready',
    async execute() {
        console.log(`${new Date().toLocaleString()} - Bot ready`);
    }
}
