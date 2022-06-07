import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'

export default class PagesController {

    private page_title:string = 'Picscloud'

    private getTitle():string {
        return this.page_title
    }
    private setTitle( title:string ){
        this.page_title = `${title} | ${this.page_title}`
    }

    // ----------------------------------------------------
    // HOME PAGES
    public async index({view}:HttpContextContract){
        return view.render('welcome', {page_title:this.getTitle()})
    }

    public async login({view}:HttpContextContract){
        this.setTitle('Se connecter')
        return view.render('login', {page_title:this.getTitle()})
    }

    public async signup({view}:HttpContextContract){
        this.setTitle('Créer un compte')
        return view.render('signup', {page_title:this.getTitle()})
    }
    
    // ----------------------------------------------------
    // AUTH PAGES
    public async albums({auth, view }:HttpContextContract){

        this.setTitle("Albums")

        const albums = await Album
            .query()
            .where('user_id', `${auth.user?.user_id}`)
            .orderBy('created_at','desc')
        
        return view.render('auth/albums', {
            page_title:this.getTitle(),
            albums:albums.length === 0 ? false : albums
        })
    }

    public async dashboard({auth, view}:HttpContextContract){
        await auth.use('web').authenticate()
        if(auth.user){
            this.setTitle(auth.user?.username)
        
            const albums = await Album
                .query()
                .where('user_id', `${auth.user?.user_id}`)
                .orderBy('created_at','desc')
                .limit(4)
                
            return view.render('auth/dashboard', {
                page_title:this.getTitle(),
                user:auth.user,
                albums:albums.length === 0 ? false : albums
            })
        }        
    }
}
