import React, { memo, useState } from 'react'
import { codeIcon } from '../constants'

const ExampleView = ({ frame, demo, code }) => {
  const { width } = frame
  const [showCode, setShowCode] = useState(false)

  return (
    <>
      {showCode ? code : demo}
      <button
        frame={$rect(width - 50, width - 40, 40, 35)}
        image={codeIcon}
        bgcolor={$color('clear')}
        events={{
          tapped() {
            setShowCode(x => !x)
            $device.taptic()
          }
        }}
      />
    </>
  )
}

export default memo(ExampleView)
