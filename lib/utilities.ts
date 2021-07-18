// ! Library
import { db } from "../config/firebase.client";

// ! Types
type timestamp = {
    seconds: number,
    nanoseconds: number
}

const joinClasses = (...classes : any) => {
    const classesArray = classes.map((x : any) => {
        if (typeof x == "string" || x instanceof String) {
            return x
        } else if (x instanceof Array) {
            return joinClasses(...x);
        } else if (x instanceof Object) {
            return Object.entries(x).map(x => x[1] ? x[0] : null).filter(x => x).join(" ");
        } else {
            throw "Invalid Class Type Provided, Expected: String, Array Or Object";
        }
    })
    return classesArray.join(" ");
}

const newFirebaseId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let autoId = '';
    for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
}

const convertTimestamp = (dateObject: timestamp) =>
    new db.Timestamp(dateObject.seconds, dateObject.nanoseconds).toDate();

const monthAndYear = (date: Date, truncateMonth = false) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const month = monthNames[date.getMonth()];
    const formattedMonth = truncateMonth ? month.slice(0, 3) : month

    return `${formattedMonth} ${date.getFullYear()}`;
}


export { joinClasses, newFirebaseId, convertTimestamp, monthAndYear };
