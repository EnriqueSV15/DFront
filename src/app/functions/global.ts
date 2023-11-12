
function leftPad(car: any, str: any, max: any): any {
    str = str.toString();
    return str.length < max ? leftPad(car, car + str, max) : str;
}

export function formatISODate(date: Date, short: boolean = false) {
    const year = date.getFullYear();
    const month = leftPad('0', (date.getMonth() + 1).toString(), 2);
    const day = leftPad('0', date.getDate().toString(), 2);

    let hours = '00';
    let minutes = '00';
    let seconds = '00';
    let miliseconds = '000';

    if (!short) {
        hours = leftPad('0', date.getHours(), 2);
        minutes = leftPad('0', date.getMinutes(), 2);
        seconds = leftPad('0', date.getSeconds(), 2);
        miliseconds = leftPad('0', date.getMilliseconds(), 3);
    }

    const isoDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${miliseconds}Z`;

    return isoDate;
}