export class OscillatorTypeParam {
    constructor(private _oscillatorNode: OscillatorNode) {}

    get value(): OscillatorType {
        return this._oscillatorNode.type;
    }

    set value(value: OscillatorType) {
        this._oscillatorNode.type = value;
    }
}
