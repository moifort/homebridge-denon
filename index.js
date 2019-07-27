const AVReceiver = require('marantz-avr-fix')
let Service, Characteristic


module.exports = function (homebridge) {
    Service = homebridge.hap.Service
    Characteristic = homebridge.hap.Characteristic

    homebridge.registerAccessory("homebridge-denon-switch", "denon-switch", Denon)
}

class Denon {

    constructor(log, config) {
        // Setup configuration
        this.log = log
        this.name = config['name'] || 'Scenario'
        if (!config['ip']) {
            this.log.error('No ip define for', this.name)
            return
        }
        this.ip = config['ip']
        this.defaultVolume = config['defaultVolume'] || 35
        this.defaultInput = config['defaultInput'] || 'DVD'
        this.receiver = new AVReceiver(this.ip)

        // Setup services
        this.switchService = new Service.Switch(this.name)
        this.switchService.getCharacteristic(Characteristic.On)
            .on('get', this.getState.bind(this))
            .on('set', this.setState.bind(this))
    }

    async getState(callback) {
        this.log('Getting current state..')
        try {
            const state = await this.receiver.getState()
            const isScenarioActive = state.power === true && state.volumeLevel === this.defaultVolume && state.input === this.defaultInput
            this.log(`Scenario is ${isScenarioActive}`)
            callback(null, isScenarioActive)
        } catch (e) {
            this.log.error(e)
            callback(e)
        }
    }

    async setState(state, callback) {
        this.log(`Set state to ${state}`)
        try {
            if (state) {
                await this.receiver.setPowerState(true)
                await this.receiver.setVolumeLevel(this.defaultVolume)
                await this.receiver.setInputSource(this.defaultInput)
            } else {
                await this.receiver.setPowerState(false)
            }
            callback(null)
        } catch (e) {
            this.log.error(e)
            callback(e)
        }
    }

    getServices() {
        return [this.switchService]
    }
}