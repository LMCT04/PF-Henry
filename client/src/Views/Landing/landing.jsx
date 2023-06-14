import style from './landing.module.css';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Formik } from 'formik'

const Landing = () => {

    const [message, setMessage] = useState('')

    const users = [
        {
            "username" : "pepito",
            "password" : "pepito1234"
        },
        {
            "username" : "pablito",
            "password" : "pablito1234"
        },
        {
            "username" : "carmen",
            "password" : "carmen1234"        
        },
        {
            "username" : "juana",
            "password" : "juana1234"
        },
        {
            "username" : "miguel",
            "password" : "miguel1234"
        }
    ]

    return(
        <div className={style.landing} >
            <div className={style.contentContainer} >
                <p className={style.p1} >
                Welcome to our cafeteria for celiacs! Enjoy the irresistible 
                flavors from the comfort of your home. Enter and discover the 
                pleasure of each sip and bite with just one click. Your perfect 
                cup of coffee awaits you in our online store!
                </p>
            </div>
            <div className={style.formContainer} >
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validate={(valores) => {
                    let errores = {}

                    //Validacion Username
                    if(!valores.username){
                        errores.username = 'Por favor ingrese su usuario'
                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)){
                        errores.username = 'Solo debe ingresar letras y espacios'
                    }

                    //Validacion Password
                    if(!valores.password){
                        errores.password = 'Por favor ingresar su contraseña'
                    }

                    return errores
                }}
                onSubmit={(valores, {resetForm}) => {
                    resetForm()
                    console.log('comprobar usuario')
                    console.log(valores)

                    const foundUser = users.find((user) => 
                        user.username === valores.username && user.password === valores.password
                    )
                    if(foundUser) {
                        setMessage('El usuario ya exsite')
                    } else {
                        users.push({
                            username: valores.username,
                            password: valores.password
                        })
                        setMessage('Su usuario ah sido creado exitosamente')
                    }

                }}
            >
                {( {handleSubmit, values, handleChange, handleBlur, errors, touched} ) => (
                    <form className={style.form} onSubmit={handleSubmit} >
                        <div className={style.content} >
                            
                            <input 
                                type='text' 
                                id='username' 
                                name='username' 
                                placeholder='Username...' 
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={style.input}
                            />
                            {touched.username &&  errors.username && <div>{errors.username}</div>}
                        </div>
                        <div className={style.content} >
                            
                            <input 
                                type='text' 
                                id='password' 
                                name='password' 
                                placeholder='Password...' 
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={style.input}
                            />
                            {touched.password &&  errors.password && <div>{errors.password}</div>}
                        </div>
                        <div className={style.buttonContainer} >
                            <button 
                                type='submit'
                                className={style.button}
                            >
                                CREATE ACCOUNT
                            </button>
                            <p>©2023 CeliacTeam. All rights reserved</p>
                            <Link to='/login' >
                                Are you already registered?
                            </Link>
                        </div>
                    </form>
                )}
            </Formik>
            {message && <p>{message}</p>}
            </div>
        </div>
    )
}

export default Landing;