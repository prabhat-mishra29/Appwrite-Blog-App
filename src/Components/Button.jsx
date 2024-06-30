//Create a basic button so that we can use as our requirements:-

function Button({
    text,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return ( 
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {/* {...props} means agar kuch additional properties hai woh v dedo. */}
            {/* {``}-> javascript syntax for implementation of string */}
            {text}
        </button>
     );
}

export default Button;