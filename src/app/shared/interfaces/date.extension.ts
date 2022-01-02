export {}

declare global{
    interface Date {
        addHours(hours : number) : Date;
        addMinutes(minutes : number) : Date;
    }
}

Date.prototype.addHours = function (hours : number) : Date{
    if(!hours) return this;
    let date = this;
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    return date;
}

Date.prototype.addMinutes = function (minutes : number) : Date{
    if(!minutes) return this;
    let date = this;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    return date;
}