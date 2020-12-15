import React from 'react'
import { useSlate } from 'slate-react'
import { Editor } from 'slate'

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  
  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }
  
  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
  
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  }
  
  return (
    <button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
      style={{
        width: '50px',
        height: '30px',
        borderRadius: '5px',
        margin: '10px',
        border: '#265476 1px solid',
        backgroundColor: '#FFF',
        backgroundImage: `url(${icon})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '20px',
        backgroundPosition: 'center'
        }}
    />
  )
}

export default MarkButton
