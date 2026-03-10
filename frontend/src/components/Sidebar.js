import { useState } from "react"
import { Link } from "react-router-dom"

export default function Sidebar(){

const [open,setOpen] = useState(false)

return(

<>
<button
onClick={()=>setOpen(!open)}
className="absolute top-5 left-5 bg-green-700 text-white px-4 py-2 rounded"
>
☰ Menu
</button>

<div className={`fixed top-0 left-0 h-full w-64 bg-green-800 text-white p-6 transform ${open ? "translate-x-0":"-translate-x-full"} transition-transform`}>

<h2 className="text-lg mb-8">MI GRANJA</h2>

<ul className="space-y-4">

<li><Link to="/">🏠 Inicio</Link></li>
<li><Link to="/inventario">🐄 Inventario</Link></li>
<li><Link to="/ventas">💰 Ventas</Link></li>
<li><Link to="/gastos">📦 Gastos</Link></li>
<li><Link to="/reportes">📊 Reportes</Link></li>
<li><Link to="/usuarios">👤 Usuarios</Link></li>

</ul>

</div>

</>

)

}