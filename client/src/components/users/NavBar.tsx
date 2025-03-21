import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const navSections = [
    {name: "Mujeres"},
    {name: "Hombres"},
    {name: "Deportivo"}

]


const NavBar = () => {
  return (
    <div className="bg-black text-white flex p-3 font-bold justify-between text-xl">
        <div className="flex">
            <h2 className="mx-5">Logo</h2>
            <div className="flex gap-6">
                {
                    navSections.map(({name}, index)=>(
                        <div key={index} className="flex items-center gap-2"> 
                        <h4>{name}</h4>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="flex gap-4 items-center ">
            <FaCartShopping/>
            <FaHeart/>
            <FaUser/>

        </div>
    </div>
  )
}

export default NavBar