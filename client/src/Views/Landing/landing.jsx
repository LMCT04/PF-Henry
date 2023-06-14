import style from './landing.module.css';
import { Link } from 'react-router-dom'

const Landing = () => {
    return(
        <div className={style.landing}>
            <div className={style.contentContainer} >
                <p className={style.p1} >
                Welcome to our cafeteria for celiacs! Enjoy the irresistible 
                flavors from the comfort of your home. Enter and discover the 
                pleasure of each sip and bite with just one click. Your perfect 
                cup of coffee awaits you in our online store!
                </p>
            </div>
            <div className={style.formContainer} >
                <form className={style.form} >
                    <h1> REGISTER NOW </h1>
                    <div className={style.content} >
                        <input className={style.input} placeholder='Name...' />
                    </div>
                    <div className={style.content} >
                        <input className={style.input} placeholder='Username...' />
                    </div>
                    <div className={style.content} >
                        <input className={style.input} placeholder='Mail...' />
                    </div>
                    <div className={style.content} >
                        <input className={style.input} placeholder='Password...' />
                    </div>
                    <div className={style.content} >
                        <input className={style.input} placeholder='Age...' />
                    </div>
                    <div className={style.content} >
                        <input className={style.input} placeholder='Address...' />
                    </div>
                    <div className={style.buttonContainer} >
                        <Link to='/home' >
                            <button className={style.button} >
                                CREATE ACCOUNT
                            </button>
                        </Link>
                        <p>©2023 CeliacTeam. All rights reserved</p>
                        <Link to='/login' >
                            Are you already registered?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Landing;