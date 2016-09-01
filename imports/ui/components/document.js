import React from 'react'
import InlineCss from 'react-inline-css'
import { Button, ListGroupItem } from 'react-bootstrap'
import { Meteor } from 'meteor/meteor'
import { Bert } from 'meteor/themeteorchef:bert'
import { removeDocument } from '../../api/documents/methods'

const handleDownloadPDF = (event) => {
  event.preventDefault()
  const { target } = event
  const documentId = target.getAttribute('data-id')
  target.innerHTML = '<em>Downloading...</em>'
  target.classList.add('downloading')
  Meteor.call('documents.download', { documentId }, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger')
    } else {
      const blob = base64ToBlob(response.base64)
      fileSaver.saveAs(blob, response.fileName)
      target.innerHTML = 'Download'
      target.classList.remove('downloading')
    }
  })
}

const handleRemoveDocument = (event) => {
  event.preventDefault()
  const documentId = event.target.getAttribute('data-id')
  removeDocument.call({
    _id: documentId
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger')
    } else {
      Bert.alert('Document removed.', 'success')
    }
  })
}

export const Document = ({ document }) => (
  <InlineCss stylesheet={`
    .Document {
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    }
    @media print {
    .Document {
    display: block;
    border: 1px solid red;
    padding: 20px;
    }
    .btn { display: none }
    .hr { display: none }
    h3 {
    font-size: 28px;
    margin-top: 0px;
    margin-bottom: 0px;
    }
    p {
    margin-top: 10px;
    margin-bottom: 0px;
    font-size: 18px;
    }
    }
  `}>
    <ListGroupItem className="Document">
      <Button onClick={ handleDownloadPDF } data-id={ document._id } bsStyle="success">Add</Button>
      <Button onClick={ handleRemoveDocument } data-id={ document._id } bsStyle="danger">Remove</Button>
      <hr/>
      <h3>{ document.title }</h3>
      <p>{ document.body }</p>
    </ListGroupItem>
  </InlineCss>
)

Document.propTypes = {
  document: React.PropTypes.object.isRequired,
}
