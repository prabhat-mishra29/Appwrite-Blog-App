// "forwardRef" is used to forward refs through a component to its child. It is often used when you need to access the underlying DOM element of a child component.
import React,{ useId } from "react"; 

// Function inside Function => callback
// Wrapp-up with "forwardRef"
const Input = React.forwardRef( function Input( {
    label,
    type = "text",
    className = "",
    ...props
}, ref) { //Input component koo joo v usse karega ekk reference/'ref' v pass karega.Takii inputfiled uss 'ref' ko pass hoga.

    //Parent se 'ref' pass hoga , ussi ref ko use karke child apna 'state' ka access parent ko dega.
    
    const id = useId();

    return (
        <div className='w-full'>
            {/* label pass hai toh show karo */}
            {
                label && <label className='inline-block mb-1 pl-1' htmlFor={id}> {label} </label>
            }

            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
             />
        </div>
    )
}
)

export default Input;