"use client"

import { useState } from "react"


export default  function SantiPage() {
    const [input, setInput] = useState("")

    function    pingpong() {
        if (input == "ping"){
            alert("pong")
        }else {
            alert("ping")
        }
    }
    return (
        <div>
            <div 
            style={
                {
                    backgroundColor: input,
                }
            }
            className="bg-red-600 text-black p-12"/>
            <input 
            onChange={(e)=> {
                setInput(e.target.value)
            }}

            className="border-2 text-white border-black bg-black p-4 rounded"
            placeholder="HOLAAAA"/>

            <button onClick={pingpong}>
                <span className="text-black">Enviar</span>
            </button>

            <p> Hola soy Santi de 42 Madrid !</p>
            <Fractol/>
            <Image/>
        </div>
    )
}

function    Fractol()
{
    return <p>FRACTOOOOOL</p>
}

function    Image()
{
    return <img
        onClick={() => alert("hola")}
        src="https://cdn.intra.42.fr/users/0543d11e128cc09756ffa68d3bd508da/smagniny.JPG"/>
}