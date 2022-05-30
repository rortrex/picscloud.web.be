import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SignupValidator from 'App/Validators/SignupValidator'

export default class AuthController {

    async registerAccount({ request, response }: HttpContextContract){
        await request.validate(SignupValidator)
        return response.json({
            success:`Hello ${request.input('username')}`
        })
    }
}
