import React, { memo } from 'react'

const Page3 = memo((props) => {
  return (
    <div className="page3">
      <div className="p1">
        <img src="./img/part3icons_03.png" alt="" />
      </div>
      <div className="hcb" onClick={()=>props.setCurpage(4)}>
        <img src="./img/part3icons_07.png" alt=""/>
      </div>
    </div>
  )
})

export default Page3