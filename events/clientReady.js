module.exports = {
    name: 'clientReady',
    async execute() {
        console.log(`${new Date().toLocaleString()} - Discord ready`);
    }
}
