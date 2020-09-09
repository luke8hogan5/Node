class championModel{
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
    }
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

}

module.exports = championModel;