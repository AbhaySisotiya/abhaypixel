import React from 'react'

function Input({type,name,id,placeholder,value,onchange}) {
  return (
    <input 
      type={type} 
      name={name} 
      id={id} 
      placeholder={placeholder}
      value={value}
      onChange={onchange}
      className='form-input' />
  )
}

export default Input
