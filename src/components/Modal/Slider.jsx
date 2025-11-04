import React from 'react'

function Slider({image,text}) {
  return (
    <div>
        <div className="flex h-full flex-col items-center justify-center px-4">
            <div className="mb-6">
                <img className="w-20 h-20 object-contain" src={image} alt="Text" />
            </div>
            <p style={{ color: '#002f34' }} className="text-center text-sm font-semibold leading-snug max-w-xs">
               {text}
            </p>
        </div>
    </div>
  )
}

export default Slider