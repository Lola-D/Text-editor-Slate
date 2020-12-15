import React, { useCallback, useMemo, useState } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor } from 'slate'

import Leaf from './Leaf'
import Elements from './Elements'
import MarkButton from './MarkButton'
import BlockButton from './BlockButton'

import {
  bold,
  bulletedList,
  code,
  italic,
  numberedList,
  underline,
  header1,
  header2,
  header3,
  quote
} from '../Icon'

const HomeworkEditor = () => {
  const initialValue = [
    {
      type: '',
      children: [
        { text: '' },
      ],
    },
  ]
  const [value, setValue] = useState(initialValue)
  const renderElement = useCallback(props => <Elements {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <div>
        <MarkButton format="bold" icon={bold} />
        <MarkButton format="italic" icon={italic} />
        <MarkButton format="underline" icon={underline} />
        <MarkButton format="code" icon={code} />
        <BlockButton format="heading-one" icon={header1} />
        <BlockButton format="heading-two" icon={header2} />
        <BlockButton format="heading-three" icon={header3} />
        <BlockButton format="block-quote" icon={quote} />
        <BlockButton format="numbered-list" icon={numberedList} />
        <BlockButton format="list-item" icon={bulletedList} />
      </div>
      <hr/>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
      />
    </Slate>
  )
}

export default HomeworkEditor
