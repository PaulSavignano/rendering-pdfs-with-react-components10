const buildByteArray = (string, stringLength) => {
  const buffer = new ArrayBuffer(stringLength)
  const array = new Uint8Array(buffer)
  for (let i = 0; i < stringLength; i++) {
    array[i] = string.charCode(i)
  }
  return array
}

const createBlob = (array) => {
  new Blob([array], 'application/pdf')
}


export const base64ToBlob = (base64String) => {
  const decodedString = atob(base64String)
  const decodedStringLength = decodedString.length
  const byteArray = buildByteArray(decodedString, decodedStringLength)
  return byteArray ? createBlob(byteArray) : null
}
