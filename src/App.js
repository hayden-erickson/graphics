import { useState } from 'react'

import logo from './logo.svg';
import './App.css';

import Consciousness from './components/Consciousness'
import DNA from './components/DNA'

import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";
import "./index.css";

const tabs = ['Consciousness', 'DNA']

const Tab = ({component, handleTabClick}) => (
  <div style={{backgroundColor: 'white', padding: 8, margin: 4, cursor: 'pointer'}}
    onClick={handleTabClick}>
    {component.props.tabName}
  </div>
)

function App() {
  return (
    <div className="App" style={{backgroundColor: 'black', height: '100vh'}}>
      <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'black'}}>
        <div style={{display: 'flex', borderBottom: '1px solid white'}}>
          {
            ['dna', 'consciousness'].map(t => (
              <Link to={t}>
                <div style={{backgroundColor: 'white', padding: 8, cursor: 'pointer', border: '1px solid black'}}>
                  {t}
                </div>
              </Link>
              )
            )
          }
        </div>

        <Outlet />
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/graphics",
    element: <App />,
    children: [
      {
        path: 'dna',
        element: <DNA />
      },
      {
        path: 'consciousness',
        element: <Consciousness />
      },
    ]
  },
]);

const RoutedApp = () => <RouterProvider router={router} />


export default RoutedApp;
