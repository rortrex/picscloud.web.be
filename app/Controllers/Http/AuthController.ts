import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import SignupValidator from 'App/Validators/SignupValidator'

export default class AuthController {

    private redirect(response:HttpContextContract['response'], auth:HttpContextContract['auth'], session:HttpContextContract['session']){
        if(auth.user)
            session.flash('info',`Connecté en tant ${auth.user.is_admin ? "qu'administrateur":`que ${auth.user.username}`}`)
            return response.status(301).redirect().toRoute('dashboard')
    }

    async registerAccount({ request, response, auth, session }: HttpContextContract){
        try {
            const user = new User()
            await user.merge(await request.validate(SignupValidator)).save()
            await auth.use('web').attempt(request.input('email'), request.input('password'))
            this.redirect(response,auth,session)
        } catch (error) {
            return response.json(error)
        }
    }

    async login({request, response, auth, session}:HttpContextContract){
        const data = await request.validate(LoginValidator)
        try {
            await auth.use('web').attempt(data.email,data.password)
            this.redirect(response, auth, session)
        } catch {
            return response.badRequest('invalid auth credential')
        }
    }

    async logout({auth, session, response}:HttpContextContract){
        await auth.use('web').logout()
        session.flash('info','Vous êtes déconnecté.')
        return response.redirect().toRoute('login_page')
    }
}
