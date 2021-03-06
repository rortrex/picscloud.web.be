
export default class StatsController {

    public convertBytesToGigabytes( bytes: number ) : number {
        return bytes < 1000000000 
            ? Math.round(bytes / 1e9 * 100 ) / 100 // convert whit 2 decimal
            : Math.round(bytes / 1e9 * 10 ) / 10 // convert whit 1 decimal
    }

    public percentagesOf( a:number, b:number ) : number {
        return Math.round(((a / b ) * 100) * 100) / 100 // convert whit 2 decimal
    }

    public sum( t:number[] ): number {
        return t.reduce((a, b) => a + b)
    }
}
