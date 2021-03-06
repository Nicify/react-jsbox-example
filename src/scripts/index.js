import React from 'react'
import { render } from 'react-jsbox'
import CodeView from './components/CodeView'
import CustomProfiler from './components/CustomProfiler'
import ExampleComps from './examples'
import ExampleView from './components/ExampleView'
import { printRenderTimings } from './helper'
import { settingsStore } from './store'

const { width } = $ui.vc.view.frame

function Cell({ frame, name, Comp }) {
  const settings = settingsStore.useStore()

  return (
    <ExampleView
      frame={frame}
      demo={
        <CustomProfiler
          enable={settings.enableReactProfiler}
          id={name}
          onRender={printRenderTimings}
        >
          <Comp frame={frame} />
        </CustomProfiler>
      }
      code={<CodeView frame={frame} content={$file.read(`scripts/examples/${name}.js`).string} />}
    />
  )
}

function makeCellData(components) {
  return Object.keys(components).map(name => ({
    title: name,
    rows: [
      {
        type: 'view',
        props: {
          id: name
        },
        layout: $layout.fill,
        events: {
          layoutSubviews(view) {
            const Comp = components[name]
            render(<Cell frame={view.frame} name={name} Comp={Comp} />, view)
          }
        }
      }
    ]
  }))
}

$app.keyboardToolbarEnabled = true
$ui.render({
  props: {
    title: 'ReactJSBox Example'
  },
  views: [
    {
      type: 'list',
      props: {
        rowHeight: width,
        data: makeCellData(ExampleComps)
      },
      layout(make, view) {
        make.edges.equalTo(view.super.safeArea)
      }
    }
  ]
})
