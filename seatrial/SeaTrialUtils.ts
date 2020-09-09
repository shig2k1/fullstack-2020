import randomstring from 'randomstring'

function generateUniqueLabel () : string {
  return randomstring.generate({
    length: 16,
    charset: 'abcdefghijklmnopqrstuvwxyz0123456899'
  })
}

export default { generateUniqueLabel }
