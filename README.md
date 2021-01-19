# react-rrule-ts

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-rrule-ts.svg)](https://www.npmjs.com/package/react-rrule-ts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-rrule-ts
```

## Usage

```tsx
import React, { Component } from 'react'

import ReactRRuleTS, { translations } from 'react-rrule-ts'
import 'react-rrule-ts/dist/index.css'

class Example extends Component {
  render() {
    return <ReactRRuleTS 
    onChange={(rrule) => console.log(rule)}
    config={{
      hideStart: false,
    }}
    translations={translations.english}
    />
  }
}
```

## License

MIT © [pollylnd](https://github.com/pollylnd)
