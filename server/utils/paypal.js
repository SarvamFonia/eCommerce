const paypal = require('paypal-rest-sdk')

paypal.configure({
    mode: 'sandbox',
    client_id: 'ATQhinkiV-BcPNmnLOCS3asGf8xvSx9pJn_O9B97muWVVfrDGG7GDSzsgygyzEQyKT9Xd3rMQhtflmTX',
    client_secret: 'EK6ZugVLkXDvctS0OqFyrDvP53cgo8X_ZgTMDBkJcEqZ4zxN3q70aH59t9cT8s_MjEobS_XffF0KCahR'
})

module.exports = paypal