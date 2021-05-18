# @lesstalkmorecode/react-daily-scrum

> Daily Scrum React Component

[![NPM](https://img.shields.io/npm/v/@lesstalkmorecode/react-daily-scrum.svg)](https://www.npmjs.com/package/@lesstalkmorecode/react-daily-scrum) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @lesstalkmorecode/react-daily-scrum
```

## Usage

```jsx
import React from 'react'

import { DailyScrum } from '@lesstalkmorecode/react-daily-scrum'
import '@lesstalkmorecode/react-daily-scrum/dist/index.css'

class Example extends Component {
  render() {
    return (
      <DailyScrum
        seconds={15*60} 
        header="Welcome to Daily Scrum"
        userList = {['Yuki', 'Park', 'Edward', 'Austin', 'Marcel', 'Eda', 'Paolo', 'LTMC']}     
      />
    )
  }
}
```

## License

