import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {

    async index({view}: HttpContextContract){
        return view.render('welcome')
    }

    async login({view}: HttpContextContract){
        return view.render('login')
    }

    async signup({view}: HttpContextContract){
        return view.render('signup')
    }
}