
export default class ConvertorController {

    convertBytesToGigabytes( bytes: number ) : number {

        return bytes < 1000000000 ? Math.round(bytes / 1e9 * 100 ) / 100 : Math.round(bytes / 1e9 * 10 ) / 10
    }
}