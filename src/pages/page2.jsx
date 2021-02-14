/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState,useEffect } from 'react'
import {message} from 'antd'
const Page2 = memo((props) => {
  const [list, setList] = useState([
    0, 0, 0, 0, 0,0
  ])
  const [cango, setCanGo] = useState(0)
  const names = ['爱国牛', '创新牛', '求实牛', '奉献牛', '协同牛', '育人牛']
  const [tabIndex, setTabIndex] = useState(0)
  const getDay = () => {
    fetch("http://tp5.scimall.org/portal/Kxnewyear/getDay")
    .then((res) => {
        return res.json()
    }).then((data) => {
        const myDate = new Date(data.timestamp*1000)
        const _day2 = myDate.getDate()
        setTabIndex(_day2-12)
    })
  }
  const getCard = async () => {
    const res = await fetch("http://tp5.scimall.org/portal/Kxnewyear/cards")
    const data = await res.json()
    if (data) {
      if (!data.status) {
        if (data.isStore > 0) {
          props.setCurpage(5)
        } else {
          const _list = [...list]
          setCanGo(data.lists.length)
          data.lists.map((item) => {
            if (parseInt(item.card) <= 6) {
              _list[parseInt(item.card,10)-1] = 1
            } else {
              props.setCurpage(3)
            }
          })
          setList(_list) 
        }
      } else {
        message.info(data.msg)
      }
    }
  }
  useEffect(() => {
    getCard()
    getDay()
  },[])

  const imgUrl = () => {
    if (tabIndex <= 0) {
      if (list[0] > 0) {
        return "./img/card/c1.png"
      } else {
        return "./img/card/a1.png"
      }
    } else {
      if (list[tabIndex] > 0) {
        return "./img/card/c"+(tabIndex+1)+".png"
      } else {
        return "./img/card/a"+(tabIndex+1)+".png"
      }
    }
  }
  const hcCard = async () => {
    const res = await fetch("http://tp5.scimall.org/portal/Kxnewyear/dealCard")
    const data = await res.json()
    if (data) {
      if (cango >= 6) {
        if (data.status === 1){ 
          props.setCurpage(3)
        } else {
          message.info(data.msg)
        }
      }
    }
  }
  return (
    <div className="page2">
      <div className="p1">
        <img src="./img/indexBg_03.png" alt="" />
      </div>
      <div className="card">
        <img src={imgUrl()} alt="" />
      </div>
      <div className="tabs">
        {
          list.map((item,index) => {
            return (
              <div className="tab" key={index} onClick={()=>setTabIndex(index)}>
                <img
                  src={item > 0 ? './img/card/c'+(index+1)+'.png' : './img/card/a'+(index+1)+'.png'}
                  alt=''
                  className={tabIndex === index ?'active':""}
                />
                {item > 0 &&
                  <div className="name">
                    {names[index]}
                  </div>
                }
              </div>
            )
          })
        }
      </div>
      <div className={cango >=6?"hcb":'hcb op' } onClick={hcCard}>
        <img src="./img/part2icons_07.png" alt=""/>
      </div>
    </div>
  )
})

export default Page2