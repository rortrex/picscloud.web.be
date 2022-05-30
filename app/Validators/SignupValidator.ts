import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignupValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    username:schema.string({trim:true}, [
      rules.maxLength(20),
      rules.minLength(4)
    ]),
    email:schema.string({trim:true},[
      rules.email()
    ]),
    password:schema.string([
      rules.confirmed('password_confirmed'),
      rules.maxLength(200)
    ]),
    password_confirmed:schema.string()

  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'required':'Ce champ est obligatoire.',
    'username.minLength':"Votre nom d'utilisateur doit contenir au moins {{options.minLength}} caractères.",
    'username.maxLength':"Votre nom d'utilisateur ne peut pas dépasser {{options.maxLength}} caractères.",
    'password_confirmed.confirmed':"Vos mots de passes ne correspondent pas."
  }
}
