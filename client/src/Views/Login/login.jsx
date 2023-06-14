import style from './login.module.css'
import { Link } from 'react-router-dom'

const Login = () => {
    return(
        <div>
            <div className={style.formContainer} >
                <form className={style.form} >
                    <h1> LOGIN NOW </h1>
                    <div className={style.content} >
                        <input className={style.input} placeholder='Username...' />
                    </div>
                    <div className={style.content} >
                        <input className={style.input} placeholder='Password...' />
                    </div>
                    <div className={style.buttonContainer} >
                        <Link to='/home' >
                            <button className={style.button} >
                                JOIN
                            </button>
                        </Link>
                        <p>©2023 CeliacTeam. All rights reserved</p>
                        <Link to='/' >
                            Are you not registered yet?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login