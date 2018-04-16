export function toPrettyFloat(n: number, fractionDigits: number = 2): string {
    return n.toLocaleString('en', {maximumFractionDigits: fractionDigits});
}
