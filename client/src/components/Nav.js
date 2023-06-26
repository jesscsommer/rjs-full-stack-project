function Nav(){
    return (
        <div className="nav-bar">
            <Link to={`/home`}>Home</Link>
            <Link to={`/profile`}>Profile</Link>
            <Link to={`/post`}>Post</Link>
            <Link to={`/login`}>Login</Link>
            <Link to={`/signup`}>Main Menu</Link>
        </div>
    )
}

export default Nav