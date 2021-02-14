import React, { memo } from 'react'
import { Form, Input,message} from 'antd';
const Page4 = memo((props) => {
  const {setCurpage} =  props
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    const { name, phone, introduction } = values
    const _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    if (!name) {
      message.info('请输入姓名！')
      return
    }
    if (!phone) {
      message.info('请输入手机号！')
      return
    }
    if (!_reg.test(phone)) {
      message.info('请输入正确手机号！')
      return
    }
    if (!introduction) {
      message.info('请输入邮寄地址！')
      return
    }
    const _url = 'http://tp5.scimall.org/portal/Kxnewyear/storeMsg?username=' + name + '&phone=' +
      phone + '&address=' + introduction
      submitArr(_url)
  };
  const submitArr = async(_url) => {
    const response = await fetch(_url)
    const data = await response.json()
    if (data.status === 1) {
      message.info(data.msg)
      setCurpage(5)
    } else {
      message.info(data.msg)
      setCurpage(1)
    }
  }
  return (
    <div className="page4">
      <div className="form">
        <Form {...layout} name="nest-messages" onFinish={onFinish} className='form_wrap'>
          <Form.Item name='name'>
            <Input placeholder='姓名：'/>
          </Form.Item>
          <Form.Item name='phone'>
            <Input placeholder='联系方式：'/>
          </Form.Item>
          <Form.Item name='introduction'>
            <Input.TextArea placeholder='邮寄地址'/>
          </Form.Item>
          <Form.Item className='subbtn'>
            <button>
              <img src="./img/part4icons_07.png" alt=""/>
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
})

export default Page4