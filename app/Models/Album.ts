import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Album extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public album_title:string

  @column()
  public user_id:number

  @column()
  public slug:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User)
  public user: HasOne<typeof User>

}
