import { useState } from 'react'

import logo from './logo.svg';
import './App.css';

import Consciousness from './components/Consciousness'
import DNA from './components/DNA'


const tabs = ['Consciousness', 'DNA']

const Tab = ({component, handleTabClick}) => (
  <div style={{backgroundColor: 'white', padding: 8, margin: 4, cursor: 'pointer'}}
    onClick={handleTabClick}>
    {component.props.tabName}
  </div>
)

const Tabs = ({children}) => {
  const [tab, setTab] = useState(children[0])

  console.log(children)

  if( !children || children.length === 0 ) {
    return (<h1>No Tabs</h1>)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'black'}}>
      <div style={{display: 'flex', borderBottom: '1px solid white'}}>
        {
          !Array.isArray(children)
            ? <Tab component={children} handleTabClick={() => setTab(children)} />
            : children.map(c => <Tab component={c} handleTabClick={() => setTab(c)} />)
        }
      </div>

      <div>
        {tab}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Tabs>
        <DNA tabName="DNA"/>
        <Consciousness tabName="Consciousness" />
      </Tabs>
    </div>
  );
}

export default App;
