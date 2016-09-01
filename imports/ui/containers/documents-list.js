import { composeWithTracker } from 'react-komposer'
import { Documents } from '../../api/documents/documents'
import { DocumentsList } from '../../components'
import { Loading } from '../components/loading'
import { Meteor } from 'meteor/meteor'

const composer = (paras, onData) => {
  const subscription = Meteor.subscribe('documents')
  if (subscription) {
    const documents = Documents.find().fetch()
    onData(null, { documents })
  }
}

export default composeWithTracker(composer, Loading)(DocumentsList)
