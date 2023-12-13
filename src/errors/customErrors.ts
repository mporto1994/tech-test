export class CustomError extends Error {
    constructor(name: string, message: string = 'Custom error') {
        super(message);
        this.name = name;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export class UserNotFoundError extends CustomError {
    constructor(message: string = 'User not found') {
        super('UserNotFoundError', message);
    }
}

export class InvalidInputError extends CustomError {
    constructor(message: string = 'Invalid input') {
        super('InvalidInputError', message);
    }
}

export class DuplicateUserError extends CustomError {
    constructor(message: string = 'Duplicate user') {
        super('DuplicateUserError', message);
    }
}

export class InternalServerError extends CustomError {
    constructor(message: string = 'Internal server error') {
        super('InternalServerError', message);
    }
}

export class AddressNotFoundError extends CustomError {
    constructor(message: string = 'Address not found') {
        super('AddressNotFoundError', message);
    }
}

export class RegionNotFoundError extends CustomError {
    constructor(message: string = 'Region not found') {
        super('RegionNotFoundError', message);
    }
}

export class InvalidRegionInputError extends CustomError {
    constructor(message: string = 'Invalid region input') {
        super('InvalidRegionInputError', message);
    }
}

export class DuplicateRegionError extends CustomError {
    constructor(message: string = 'Duplicate region') {
        super('DuplicateRegionError', message);
    }
}

export class RegionServerError extends CustomError {
    constructor(message: string = 'Region server error') {
        super('RegionServerError', message);
    }
}