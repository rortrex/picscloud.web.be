
export default class ConvertorController {

    convertBytesToGigabytes( bytes: number ) : number {
        
        let gigabytes: number

        if( bytes < 1000000000){
            gigabytes = Math.round(bytes / 1e9 * 100 ) / 100
        } else {
            gigabytes = Math.round(bytes / 1e9 * 10 ) / 10
        }

        return gigabytes
    }
}