import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import AlbumValidator from 'App/Validators/AlbumValidator'
import { string } from '@ioc:Adonis/Core/Helpers'


export default class AlbumsController {

    private getSlugId(request:HttpContextContract['request']):number{
        const slug:string = request.param('slug').split('-')
        return parseInt(slug[slug.length - 1])
    }

    public async store({request, response, auth, session }:HttpContextContract){

        const album = new Album()
        
        await album
            .merge(await request.validate(AlbumValidator))
            .merge({user_id:auth.user?.user_id})
            .merge({slug:''})
            .save()

        const shoot = await Album.findByOrFail('album_title',album.album_title)

        await shoot
            .merge({slug:`${string.dashCase(shoot.album_title)}-${shoot.id}`})
            .save()

        session.flash('info', `Votre album: "${album.album_title}" a bien été créé.`)
        return response.redirect().toRoute('dashboard')
    }

    public async show({request, view }:HttpContextContract){
        const album = await Album.findByOrFail('id',this.getSlugId(request))
        return view.render('auth/album',{album:album})
    }
}
