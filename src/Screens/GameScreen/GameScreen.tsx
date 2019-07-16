import React from 'react'

export class GameScreen extends React.Component {
  public render(): JSX.Element {
    return (
      <div
        style={{
          height: `100%`,
          width: `100%`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Spinner />
      </div>
    )
  }
}

export class Spinner extends React.Component<{}, { columns: any[] }> {
  public state = {
    rowPosition: -1,
    columns: [{ position: -33 }, { position: 11 }, { position: 24 }]
  }

  componentDidMount() {
    this.startRotation()
  }

  private startRotation = () => {
    console.log(this.state.columns)
    let positions = this.state.columns.map(x => x.position)

    positions = positions.map(pos => {
      let out = pos + 5
      if (out >= 100) {
        out = -100
      }

      return out
    })

    const columns = this.state.columns.map((x, index) => {
      x.position = positions[index]
      return x
    })

    console.log('MARK', columns)

    this.setState({ columns })

    setTimeout(() => this.startRotation(), 20)
  }

  public render(): JSX.Element {
    return (
      <div
        style={{
          height: 400,
          width: 500,
          border: '2px solid black',
          flexDirection: 'row',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {this.state.columns.map((column, index) => {
          return (
            <>
              <div
                style={{
                  width: 100.0 / this.state.columns.length + '%',
                  height: `100%`,
                  left: (100.0 / this.state.columns.length) * index + '%',
                  border: '1px solid blue',
                  position: 'absolute',
                  top: `${column.position - 100}%`
                }}
              />
              <div
                style={{
                  width: 100.0 / this.state.columns.length + '%',
                  height: `100%`,
                  left: (100.0 / this.state.columns.length) * index + '%',
                  border: '1px solid blue',
                  position: 'absolute',
                  top: `${column.position}%`
                }}
              />
              <div
                style={{
                  width: 100.0 / this.state.columns.length + '%',
                  height: `100%`,
                  left: (100.0 / this.state.columns.length) * index + '%',
                  border: '1px solid blue',
                  position: 'absolute',
                  top: `${column.position + 100}%`
                }}
              />
            </>
          )
        })}
      </div>
    )
  }
}
