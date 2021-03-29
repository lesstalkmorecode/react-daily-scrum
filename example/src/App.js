import React from 'react'

import { DailyScrum } from '@lesstalkmorecode/react-daily-scrum'
import '@lesstalkmorecode/react-daily-scrum/dist/index.css'

const App = () => {
  return (
    <DailyScrum
      seconds={15*60} 
      header="Welcome to Daily Scrum"
      userList = {['Yuki Yuki2 Yuki3 Yuki4 Yuki5 Yuki6 Yuki7 Yuki 8', 'Park', 'Edward', 'Austin', 'Marcel', 'Eda', 'Paolo', 'LTMC']}     
    />
  )
}

export default App
