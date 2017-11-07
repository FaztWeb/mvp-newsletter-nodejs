module.exports = {
  mongodb: {
    url: process.env.NODE_ENV === 'production' ? '' : 'mongodb://localhost/mailchimptest'
  }
}
