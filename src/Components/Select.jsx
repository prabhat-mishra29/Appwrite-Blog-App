import React, {useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {

    //'ref' id used for forward referring
    
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}  {/* Agar label hai toh label kuch rakho */}

        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {/* Here 'options' is an array and agar options main value hai toh loop karke value nikalo ,nahi toh matt nikalo */}
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

//Another way to export forward ref:-
export default React.forwardRef(Select)