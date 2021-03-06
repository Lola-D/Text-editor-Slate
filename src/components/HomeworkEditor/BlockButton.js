  
import React from 'react'
import { useSlate } from 'slate-react'
import {
  Editor,
  Transforms,
  Element as SlateElement
} from 'slate'

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  const LIST_TYPES = ['numbered-list', 'bulleted-list']
  
  const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)
  
    Transforms.unwrapNodes(editor, {
      match: n =>
        LIST_TYPES.includes(
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
        ),
      split: true,
    })
    const newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
    
    Transforms.setNodes(editor, newProperties)
    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }
  
  const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
    return !!match
  }

  return (
    <button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
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

export default BlockButton
