import React from "react"
import { Link } from "react-router-dom"


const Hero = () => {
    return (
        <section className="hero is-info is-large">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        Gratitude Journal App
                    </h1>
                    <h2 className="subtitle">
                        Studies have shown that individuals who took time to express gratitude feel more positive and motivated.<br></br>
                        Never had the time to write in your own journal? No worries! This app is just for you.
                    </h2>

                    <div className="buttons">
                        <Link to="/register" className="button is-success">
                            <strong>Get started</strong>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}




export default Hero