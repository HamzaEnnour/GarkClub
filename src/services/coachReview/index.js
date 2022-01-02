const { addReview } = require('./addReview')
const { getReviewsByCoach } = require('./getReviewsByCoach')
const { checkIfReviewed } = require('./checkIfReviewed')
const { getMeanReviewForCoach } = require('./getMeanReviewForCoach')
exports.checkIfReviewed = checkIfReviewed
exports.getMeanReviewForCoach = getMeanReviewForCoach
exports.addReview = addReview
exports.getReviewsByCoach = getReviewsByCoach
