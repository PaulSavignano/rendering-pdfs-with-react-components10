import React from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import { Bert } from 'meteor/themeteorchef:bert'
import { insertDocument } from '../../api/documents/methods'

const handleInsertDocument = (event) => {
  event.preventDefault()
  const title = document.querySelector('[name="title"]')
  const body = document.querySelector('[name="body"]')
  if (title.value.trim() !== '' && body.value.trim() !== '') {
    insertDocument.call({
      title: title.value,
      body: body.value,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger')
      } else {
        title.value = ''
        body.value = ''
        Bert.alert('Document added!', 'success')
      }
    })
  } else {
    Bert.alert('Both and title and body are required.', 'danger')
  }
}

export const AddDocument = () => (
  <form onSubmit={ handleInsertDocument } className="AddDocument">
    <FormGroup>
      <FormControl
        name="title"
        type="text"
        placeholder="Type a title."
      />
    </FormGroup>
    <FormGroup>
      <FormControl
        name="body"
        componentClass="textarea"
        placeholder="Type a body."
      />
    </FormGroup>
    <Button type="submit" bsStyle="success">Add Document</Button>
  </form>
)
