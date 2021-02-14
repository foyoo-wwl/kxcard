import './index.scss'
import React,{memo,useState} from 'react'
import Page1 from './pages/page1'
import Page2 from './pages/page2'
import Page3 from './pages/page3'
import Page4 from './pages/page4'
import Page5 from './pages/page5'
const App = memo(()=>{
	const [curPage,setCurpage] = useState(4)
	return(
		<div className="App">
			{
				curPage === 1 && <Page1 setCurpage={setCurpage }/>
			}
			{
				curPage === 2 && <Page2 setCurpage={setCurpage }/>
			}	
			{
				curPage === 3 && <Page3 setCurpage={setCurpage }/>
			}	
			{
				curPage === 4 && <Page4 setCurpage={setCurpage }/>
			}	
			{
				curPage === 5 && <Page5 setCurpage={setCurpage }/>
			}	
		</div>
	)
})
export default App;
