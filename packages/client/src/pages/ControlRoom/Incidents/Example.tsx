import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import Cards from 'react-credit-cards'

// import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core'
import { Switch, FormControlLabel, Typography, Card } from '@mui/material'

function UserCard(props) {
  const { name, cardNumber, cvc, expiry } = props

  return (
    <Cards number={cardNumber} name={name} expiry={expiry} cvc={cvc} preview />
  )
}

const cards = [
  {
    name: 'Tom Tallis',
    cardNumber: '5500005555555559',
    cvc: '582',
    expiry: '02/24',
  },
  {
    name: 'Rich Harris',
    cardNumber: '4444444444444448',
    cvc: '172',
    expiry: '03/22',
  },
  {
    name: 'Moby Dixon',
    cardNumber: '3566003566003566',
    cvc: '230',
    expiry: '12/25',
  },
]

function customRowRender({ data }) {
  console.log('data = ', data)
  const [name, cardNumber, cvc, expiry] = data
  return (
    <tr key={cardNumber}>
      <td colSpan={4} style={{ paddingTop: '10px' }}>
        <UserCard {...{ name, cardNumber, cvc, expiry }} />
      </td>
    </tr>
  )
}

function Example() {
  // const isNarrow = useMediaQuery('(max-width:600px)')
  const [enableStacked, setEnableStacked] = React.useState(false)

  return (
    <div className="App">
      <MUIDataTable
        key={'' + '' + enableStacked}
        title={
          <>
            <Typography>Cards</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={enableStacked}
                  onChange={v => setEnableStacked(v.target.checked)}
                />
              }
              label="use 'stacked' mode"
            />
          </>
        }
        data={cards}
        columns={[
          {
            name: 'name',
            label: 'Name',
          },
          {
            name: 'cardNumber',
            label: 'Card Number',
          },
          {
            name: 'cvc',
            label: 'CVC',
          },
          {
            name: 'expiry',
            label: 'Expiry',
          },
        ]}
        options={{
          selectableRows: 'none',
          responsive: enableStacked ? 'stacked' : 'standard',
          customRowRender: data => customRowRender(data),
        }}
      />
    </div>
  )
}

export default Example
