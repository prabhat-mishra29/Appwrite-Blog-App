//'Container' accepts properties as a children.
//'Container' is used as defining the styling properties.
//Suppose agar hmme sare element main width 80% chahiye toh hmm container shift karr denge.

function Container({children}) {
    return ( 
        <div className='w-full max-w-7xl mx-auto px-4'>{children}
        </div>
    );

    /*
        //Another way:--[Agar ekk hi line main present hai toh]
        return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div> ;
    */

}

export default Container;