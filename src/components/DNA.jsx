import { useState } from 'react'

const range = (n) => [...Array(n).keys()]

const maxZ = 1000
const twoPI = 2*Math.PI

const Helix = ({time, numCircles}) => {

//  const zScale = ((time/1000 - offset) % lt)/lt
//  const yOffset = 


const circles = range(numCircles)
// f : frequency
const f = 1/6
// hh : helix height
const hh = 125
const r = 10

const theta = f * twoPI * time / 1000

const yOffset = r => (hh/2) * Math.cos(theta + twoPI * r)  
const z = r => 3 + 2 * Math.sin(theta + twoPI * r)
const z2 = r => 3 - 2 * Math.sin(theta + twoPI * r)


const cFloor = 100
const c1 = `rgb(${cFloor}, ${cFloor}, 255)`
const c2 = `rgb(${cFloor}, 255, ${cFloor})`
  
return <g>
  {circles.map( (_, i) => (
    <circle 
      key={`helix-${i}`}
      cx={4 * r * (i + 1)} 
      cy={hh + yOffset(i/numCircles)} 
      r={r/z(i/numCircles)} 
      fill={c1} 
      />
  ))}
  
  {circles.map( (_, i) => (
    <circle 
      key={`helix-${i}-2`}
      cx={4 * r * (i + 1)} 
      cy={hh - yOffset(i/numCircles)} 
      r={r/z2(i/numCircles)} 
      fill={c2} 
      />
  ))}
  
  {circles.map( (_, i) => (
    <line
      key={`helix-line-${i}`}
      x1={4 * r * (i + 1)}
      y1={hh + yOffset(i/numCircles)}
      x2={4 * r * (i + 1)}
      y2={hh - yOffset(i/numCircles)}
      stroke="gray" 
      opacity={0.5} />
  ))}
  
  
  {circles.map( (_, i) => (
    <line
      key={`helix-line-${i}`}
      x1={4 * r * (i + 1)}
      y1={hh + yOffset(i/numCircles)}
      x2={4 * r * (i + 2)}
      y2={hh + yOffset((i+1)/numCircles)}
      stroke={c1}
      opacity={1/z(i/numCircles)} />
  ))}
  
  {circles.map( (_, i) => (
    <line
      key={`helix-line-${i}`}
      x1={4 * r * (i + 1)}
      y1={hh - yOffset(i/numCircles)}
      x2={4 * r * (i + 2)}
      y2={hh - yOffset((i+1)/numCircles)}
      stroke={c2} 
      opacity={1/z2(i/numCircles)} />
  ))}
</g>
  
}




const DNA = () => {
  const [ time, setTime ] = useState(0)

  function render(t) {
    setTime(t)
    window.requestAnimationFrame(render)
  }

  window.requestAnimationFrame(render)

  return <div style={{backgroundColor: 'black', height: '100vh'}}>
    <svg width={500} height={500}>
      <Helix time={time} numCircles={10}/>
    </svg>
  </div>
}

export default DNA
