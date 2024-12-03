import React, { useEffect, useState } from 'react'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Success = () => {
  const [countDown,setCountDown] = useState(10)
  const navigate = useNavigate()
  useEffect(()=>{
    const timeOutId = setInterval(()=>{
      setCountDown(preCount=>{
        if(preCount === 1){
          clearInterval(timeOutId)
          navigate("/")
        }
        return preCount -1
      })
    },1000)
    return() => clearInterval(timeOutId)
  },[navigate])
  return (
    <>
    <section className="notFound">
      <div className="container">
        <img src="/sandwich.png" alt="success" />
        <h1>Redirecting to Home in {countDown} seconds...</h1>
        <Link to={'/'}>Back to Home <HiOutlineArrowNarrowRight></HiOutlineArrowNarrowRight></Link>
      </div>
    </section>
    </>
  )
}

export default Success