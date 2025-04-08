import { Outlet } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'


const AuthLayout = () => {

  useEffect(()=>{
    const initAOS = async()=>{
      await import('aos');
      AOS.init({
        duration:1000,
        easing: 'ease',
        once: true,
        anchorPlacement: 'top-bottom'
      })
    };
    initAOS();
  }, [])

  return (
    <div>
        
        <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout