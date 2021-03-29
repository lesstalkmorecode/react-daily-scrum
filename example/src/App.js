import React from 'react'

import { DailyScrum } from '@lesstalkmorecode/react-daily-scrum'
import '@lesstalkmorecode/react-daily-scrum/dist/index.css'

const App = () => {
  return (
    <DailyScrum
      seconds={15*60} 
      header="Welcome to Daily Scrum"
      userList = {['Yuki', 'Park', 'Edward', 'Austin', 'Marcel', 'Eda', 'Paolo', 'LTMC']}     
    />
  )
}

export default App
