import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <NavLink to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    </NavLink>
                    <span className="text-muted">© 2023 GoFood_2.0, Inc</span>
                </div>


            </footer>
        </div>
    )
}

export default Footer