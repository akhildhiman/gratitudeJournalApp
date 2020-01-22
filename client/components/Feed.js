import React from "react"

const Feed = () => {
    return (
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    Gratitude by User, date, and time
                </p>
            </header>
            <div class="card-content">
                <div class="content">
                    The text of the Gratitude written by the user.
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
            </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item">Edit</a>
                    <a href="#" class="card-footer-item">Delete</a>
                </footer>
        </div>
    )
}



export default Feed