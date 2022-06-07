/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/','PagesController.index').as('welcome')

Route.get('/auth/login','PagesController.login').as('login_page')
Route.get('/auth/new','PagesController.signup').as('signup_page')

Route.post('/auth/new', 'AuthController.registerAccount')
Route.post('/auth/login','AuthController.login')

Route.group(() => {

    Route.get('/dashboard','PagesController.dashboard').as('dashboard')

    Route.group(() => {
        Route.get('/','PagesController.albums').as('albums')
        Route.get('/:id/:slug','AlbumsController.show')
        Route.post('/create','AlbumsController.store')
    }).prefix('/albums')

    Route.get('/logout','AuthController.logout').as('logout')

}).middleware('auth')
