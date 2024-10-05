import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-<>?:;~|=+"

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const copToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 50) // Just for memorization
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className=' w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-3 my-8 text-black bg-gray-600'>
        <h1 className=' text-center text-white font-semibold text-2xl mb-4'>Password Generator</h1>
        <div className=" flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className=' outline-none w-full py-1 px-3 rounded-lg font-mono '
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copToClipboard}
            className=' px-3 py-2 bg-white ml-2 hover:bg-transparent hover:text-black transition-all duration-500 rounded-lg font-medium'>Copy</button>
        </div>

        <div className=' flex text-sm gap-x-2'>
          <div className=" flex item-center gap-x-1">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className=' cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>

          <div className=' flex item-center  gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numInput"
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numInput">Numbers</label>
          </div>

          <div className=' flex item-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
