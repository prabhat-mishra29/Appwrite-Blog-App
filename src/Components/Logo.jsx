import blog from  "./blog-logo.png"

function Logo({width}) {
    return ( 
        <div><img src={blog} alt="" className="h-16 w-18 rounded-full" /></div>
    );
}

export default Logo;