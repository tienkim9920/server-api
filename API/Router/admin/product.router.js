var express = require('express')

var router = express.Router()

const Products = require('../../Controller/admin/product.controller')

router.get('/', Products.index)
router.post('/create', Products.create)


module.exports = router