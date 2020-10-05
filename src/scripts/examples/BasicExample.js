import React, { Component } from 'react'

export default class BasicExample extends Component {
  state = {
    count: 0
  }
  render() {
    const { width } = this.props.frame
    const styles = {
      text: $rect(0, 64, width, 30),
      list: $rect(0, width * 0.5 - 15, width, 132)
    }
    return (
      <view {...this.props}>
        <label
          frame={styles.text}
          align={$align.center}
          font={$font(26)}
          text={String(this.state.count)}
          autoFontSize
        />
        <list
          frame={styles.list}
          scrollEnabled={false}
          radius={10}
          data={['INCREASE', 'DECREASE', 'RESET']}
          events={{
            didSelect: (sender, { row }) =>
              this.setState({
                count: this.state.count + [1, -1, -this.state.count][row]
              })
          }}
        />
      </view>
    )
  }
}
