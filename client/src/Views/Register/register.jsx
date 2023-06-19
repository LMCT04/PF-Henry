import style from './register.module.css';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Formik } from 'formik'

const Register = () => {

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
                Welcome to our coffee shop for celiacs! Enjoy the irresistible 
                flavors from the comfort of your home. Enter and discover the 
                pleasure of each sip and bite with just one click. Your perfect 
                cup of coffee awaits you in our online store!
                </p>
                <div className={style.imgContainer} >
                    
                </div>
            </div>
            <div className={style.formContainer} >
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        email: '',
                        address:'',
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
                            errores.password = 'Por favor ingresar una contraseña'
                        }

                        //Validaciones Email
                        if(!valores.email){
                            errores.email = 'Por favor ingrese un correo'
                        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){
                            valores.email = 'Ingrese un correo valido'
                        }

                        //Validaciones Address
                        if(!valores.address){
                            errores.address = 'Por favor ingrese una direccion'
                        }                    

                        return errores
                    }}
                    onSubmit={(valores, {resetForm}) => {
                        resetForm()
                        console.log('comprobar usuario')
                        console.log(valores)

                        const foundUser = users.find((user) => 
                            user.username === valores.username && user.password === valores.password &&
                            user.email === valores.email && user.address === valores.address
                        )
                        if(foundUser) {
                            setMessage('El usuario ya exsite')
                        } else {
                            users.push({
                                username: valores.username,
                                password: valores.password,
                                email: valores.email,
                                address: valores.address,
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
                                    type='password' 
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
                            <div className={style.content} >
                                <input 
                                    type='email' 
                                    id='email' 
                                    name='email' 
                                    placeholder='Email...' 
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={style.input}
                                />
                                {touched.email &&  errors.email && <div>{errors.email}</div>}
                            </div>
                            <div className={style.content} >
                                <input 
                                    type='text' 
                                    id='address' 
                                    name='address' 
                                    placeholder='Address...' 
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={style.input}
                                />
                                {touched.address &&  errors.address && <div>{errors.address}</div>}
                            </div>
                            <div className={style.buttonContainer} >
                                <button 
                                    type='submit'
                                    className={style.button}
                                >
                                    CREATE ACCOUNT
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            {message && <p>{message}</p>}
                <p>©2023 CeliacTeam. All rights reserved</p>
                <Link to='/login' className={style.link} >
                    Are you already registered?
                </Link>
            </div>
        </div>
    )
}

export default Register;