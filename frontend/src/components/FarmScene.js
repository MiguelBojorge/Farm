import house from "../assets/house.png"
import cow from "../assets/cow.png"
import pig from "../assets/pig.png"

export default function FarmScene(){

return(

<div>

<div className="sky"></div>

<div className="grass flex justify-center items-center relative">

<img
src={house}
alt="farm"
className="w-64"
/>

<img
src={cow}
alt="cow"
className="absolute left-40 bottom-10 w-24"
/>

<img
src={pig}
alt="pig"
className="absolute right-40 bottom-10 w-24"
/>

</div>

</div>

)

}