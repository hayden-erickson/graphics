import { useState } from 'react'

const X = 10
const Y = 10
const R = 40
const P = 5000

const D_MAX = Math.sqrt(Math.pow(X/2, 2) + Math.pow(Y/2, 2))

let circles = new Array(X * Y).fill(0)

const rr = rad => (rad + 1) / 2

const theta = (d, t) => Math.PI * d / 0.6 // phase offset
      - 2 * Math.PI * (t % P) / P // current angle

const rainbow = theta =>
	`rgb(${
  		Math.floor(255 * rr(Math.sin(theta)))
    }, ${
    	Math.floor(255 * rr(Math.cos(theta)))
    }, ${
    	Math.floor(255 * rr(Math.sin(theta + Math.PI)))
    })`
 

circles = circles
.map((c, i) => ({
	x: Math.floor(i/Y),
  y: i % Y,
}))
.map(({x, y}) => ({
	x: x - Math.floor(X/2),
  y: y - Math.floor(Y/2),
}))
.map(({x, y}) => ({
	// scale to hexagonal and flip y axis
	x: x + y * Math.cos(Math.PI/3),
  y: -y * Math.sin(Math.PI/3),
}))
.map(({x, y}) => ({
	x, y,
  d: Math.sqrt(x*x + y*y) / D_MAX,
}))
.map(({x, y, d}) => ({
	x: x * R,
  y: y * R,
  d,
}))
.map(({x, y, d}) => ({
	x: x + 400,
  y: y + 400,
  d,
}))

const waveOp = (d, t) => d > 0.6 ? 0 : (
		rr(Math.cos(theta(d, t)))
	)

const Consciousness = () => {

  const [ t, setTime ] = useState(0)

  function render(t) {
    setTime(t)
    window.requestAnimationFrame(render)
  }

  window.requestAnimationFrame(render)

  return (
      <svg viewBox='0 0 800 800' style={{backgroundColor: 'black', width: 'auto', height: 'auto'}}>
        {
          circles
          .map(p => ({
            ...p,
            wo: waveOp(p.d, t),
            color: rainbow(theta(p.d, t)),
          }))
          .map(({x, y, d, t, wo, color}, i) => <circle
            key={`cirlce-${i}`}
            cx={x}
            cy={y}
            r={R * wo + R/6}
            style={{
              stroke: color,
              opacity: wo,
              fill: 'none',
            }}

          />)
        }
      </svg>
    )
}


export default Consciousness
