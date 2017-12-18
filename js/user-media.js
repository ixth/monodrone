export class UserMediaNode {
    constructor(context) {
        this.context = context;
    }

    async init() {
        this._source = await this.context.createMediaStreamSource(await UserMediaNode.getStream());
    }

    connect(destination) {
        return this._source.connect(destination);
    }

    disconnect(destination) {
        return this._source.disconnect(destination);
    }

    static async getStream() {
        return navigator.mediaDevices.getUserMedia({audio: true});
    }

}
