import { useState } from 'react'
import './App.css'

function App() {
  const [ clickedPoints, setClickedPoints ] = useState([])
  const [ undoPoints, setUndoPoints] = useState([])

  function getCordenates(e) {
    const { clientX, clientY } = e

    setClickedPoints([...clickedPoints, {clientX, clientY }])
  }

  function handleUndo() {
    const newClickedPoint = [...clickedPoints]
    const undoPoint = newClickedPoint.pop()
    setClickedPoints(newClickedPoint)
    if (!undoPoint) return
    setUndoPoints([...undoPoints, undoPoint])
  }

  function handleRedo() {
    const newUndoPoints = [...undoPoints]
    const redoPoint = newUndoPoints.pop()
    if (!redoPoint) return
    setUndoPoints(newUndoPoints)
    setClickedPoints([...clickedPoints, redoPoint])
  }

  return (
    <>
      <button disabled={clickedPoints.length === 0} onClick={handleUndo}>Undo</button>
      <button disabled={undoPoints.length === 0} onClick={handleRedo}>Redo</button>
      <div className='App' onClick={getCordenates}>
        {clickedPoints.map((clickedPoint, index) => {
          return ( 
            <div
              key={index}
              style={{
                left: clickedPoint.clientX -25,
                top: clickedPoint.clientY -25,
                position: 'absolute',
              }}
              className='Circle'
            >
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
