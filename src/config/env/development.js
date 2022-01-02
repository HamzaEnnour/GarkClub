/**
 * Expose
 */

module.exports = {
  db:
    process.env.MONGODB_URL ||
    'mongodb+srv://gark:RJaJlxAapLeawG2r@cluster0.gkna4.mongodb.net/staging?retryWrites=true',
  backApiHost: process.env.backApiHost || 'http://localhost:3000',
  frontHost: process.env.frontHost || 'http://localhost:3001',
  firebase: {
    apiKey: 'AIzaSyCuV_exr2cUt_Lh-oWfuNQI0EhLVTowG8E',
    authDomain: 'gark-3f58e.firebaseapp.com',
    projectId: 'gark-3f58e',
    storageBucket: 'gark-3f58e.appspot.com',
    messagingSenderId: '206447721130',
    appId: '1:206447721130:web:e815efea0b6deda9906ed3',
    measurementId: 'G-12H4GM7T4T',
    token:
      'AAAAMBE-Oqo:APA91bHIzAzm_epVJWrL0C05jKiI6DZ4kdm-fxmTJUP4oSBoWJeEpyOFp2XyuMLKeMXjuigid76WwYKQTlrzhWZZbu8NLUPXa-g20eI24UwuOE_JTAmYo4qJxHMIlf_LidhK7QrBNQws'
  }
}
