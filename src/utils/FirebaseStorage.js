const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
  projectId: 'gark',
  keyFilename: 'firebase.json'
})

let bucketName = 'gark.appspot.com'
/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadFile = async (filename, newFileName) => {
  const bucket = storage.bucket(bucketName)
  const blob = bucket.file(newFileName)
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: filename.mimetype
    }
  })

  blobWriter.on('error', () => {})
  await blobWriter.on('finish', () => {})
  // When there is no more data to be consumed from the stream
  blobWriter.end(filename.buffer)
}

exports.uploadFile = uploadFile
