import React from 'react'
import { useState,useCallback,useEffect,useRef } from 'react'

const App = () => {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) {
      str+= "0123456789";
    }

    if(charAllowed){
      str+="!@#$%^&*()_+=/[]{}~`"
    }

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,50)
    window.navigator.clipboard.writeText(password)
  },[password])
 
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
    <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-20 text-orange-500 bg-zinc-500">
    <h1 className='text-3xl text-center m-6 font-bold text-[#fff] '>PassWord Generator</h1>
      <div className='flex justify-center items-start shadow-emerald-200  overflow-hidden '>
        <input type= "text" value={password} className='outline-none w-full max-w-md py-2 px-3 mb-16 rounded-l-lg' placeholder='password' readOnly ref={passwordRef}/>
        <button className='outline-none bg-blue-600 text-white px-3 py-2 shrink-0 rounded-r-lg hover:bg-blue-800' onClick={copyPassword}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 mb-5'>
          <input
            type='range'
            min={8}
            max={40}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1 mb-5'>
          <input
            type='checkbox'
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }}
          />
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1 mb-5'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='charInput'
              onChange={()=>{
                setCharAllowed((prev)=>!prev)
              }}
            />
            <label>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
