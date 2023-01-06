import React from 'react'
import Img from '../img/image.svg'
import Attach from '../img/paperclip.svg'
const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Escreva algo...'/>
      <div className='send'>
        <img src={Img} alt="" />
        <input type="file" style={{display: 'none'}} id='file' />
        <label htmlFor="file">
          <img src={Attach} alt="" />
        </label>
        <button>Enviar</button>
      </div>
    </div>
  )
}

export default Input