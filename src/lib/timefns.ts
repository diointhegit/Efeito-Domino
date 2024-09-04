

export function toBRStringDate(date: Date){
    return `${date.toISOString().slice(8,10)}/${date.toISOString().slice(5,7)}/${date.toISOString().slice(0,4)}`
}