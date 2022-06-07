import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import AlbumValidator from 'App/Validators/AlbumValidator'
import { string } from '@ioc:Adonis/Core/Helpers'
import { Response } from '@adonisjs/core/build/standalone'

export default class AlbumsController {

    async store({request, response, auth, session }:HttpContextContract){
        
        const album = new Album()

        await album
            .merge(await request.validate(AlbumValidator))
            .merge({user_id:auth.user?.user_id})
            .merge({slug:string.dashCase(album.album_title)})
            .save()

        session.flash('success', `Votre album ${album.album_title} à bien été créé`)
        return response.redirect().toRoute('dashboard')
    }

    async show({request,response}:HttpContextContract){
        try {
            const album = await Album.findByOrFail('id',request.param('id'))
            return album
        } catch {
            return response.redirect().toRoute('dashboard')
        }
    }
}
