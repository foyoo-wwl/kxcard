/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo,useState,useEffect } from 'react';
import {message} from 'antd'
const Page1 = memo((props) => {
    const [isCard, setIsCard] = useState(false)
    const [cardno, setCardno] = useState('')
    const getCard = (_day2) => {
        if (_day2 >= 12 && _day2 <= 17) {
            const _no = _day2 - 12
            fetch("http://tp5.scimall.org/portal/Kxnewyear/getCard")
                .then((res) => {
                return res.json()
                }).then((data) => {
                    if (parseInt(data.status) === 1) {
                        const cardno = './img/card/c' + (_no+1) + '.png'
                        setCardno(cardno)
                    } else {
                        const cardno = './img/card/b' + (_no+1) + '.png'
                        setCardno(cardno)
                    }
                    setIsCard(true)
                    message.info(data.msg)
            })
        } else {
            message.info('活动还未开始')
        }
    }
    const getDay = () => {
        fetch("http://tp5.scimall.org/portal/Kxnewyear/getDay")
        .then((res) => {
            return res.json()
        }).then((data) => {
            const myDate = new Date(data.timestamp*1000)
            const _day2 = myDate.getDate()
            getCard(_day2)
        })
    }
    useEffect(() => {
        fetch('http://tp5.scimall.org/portal/Kxnewyear/isGet')
            .then((res) =>res.json())
            .then((data) => {
                if (parseInt(data.status) > 0) {
                    props.setCurpage(2)
                }
            })
    },[])
    return (
        <div className='page1'>
            <div className="p1">
                <img src="./img/indexBg_03.png" alt="" />
            </div>
            <div className="card">
                {
                    isCard ? <img src={cardno} alt="" />
                    :
                        <div className='ckb' onClick={getDay}>
                            <img src='./img/cjbtn.png' alt="" />
                        </div>
                }
            </div>
            <div className="b" onClick={()=>props.setCurpage(2)}>
                <img src="./img/indexBg_11.png" alt=""/>
            </div>
            <div className="b2" >
                点击“我的卡片”可查看收集的卡片
            </div>
        </div>
    )
})

export default Page1