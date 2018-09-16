const axios = require('axios')
const debug = require('debug')('backend:routes:user')
const express = require('express')
const wrapper = require(`express-debug-async-wrap`)(debug)
const sef = require('sequelize-express-findbyid')

const {Client, CreditCard, Movement, Redemption} = require(`../db`)
const findById = sef(Client, 'document')

const router = express.Router()

const leTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
<div class="header">
    <h1>
        {{firstName}}, este es tu catálogo de puntos
    </h1>
    <p>
        "Una sonrisa es el mejor maquillaje que puedas usar"
    </p>
    <p>
        ― Anónimo
    </p>
</div>
<div class="cart-container">
    <div class="empty" style="display:none">
        No more twinkies !
    </div>
    <div class="cart">
        <div class="product" data-price="45000" data-quantity="1">
            <div class="product-preview">
                <div class="thumbnail">
                    <img class="image" src="https://s2.r29static.com//bin/entry/612/0,0,2000,2400/x/1911700/image.gif"/>
                </div>
                <div class="product-paper">
                    <div class="product-name">
                        Camiseta
                    </div>
                    <div class="product-price">
                        $ 45.000
                    </div>
                </div>
            </div>
            <div class="product-quantity">
                x1
            </div>
            <div class="product-interactions">
                <div class="button plus">
                    +
                </div>
                <div class="button minus">
                    -
                </div>
                <div class="button del"></div>
            </div>
        </div>
        <div class="product" data-price="100000" data-quantity="1">
            <div class="product-preview">
                <div class="thumbnail">
                    <img class="image" src="http://www.soniastyling.com/wp-content/uploads/2013/12/Top5MakeupFeature.jpg"/>
                </div>
                <div class="product-paper">
                    <div class="product-name">
                        Maquillaje profesional
                    </div>
                    <div class="product-price">
                        $ 100.000
                    </div>
                </div>
            </div>
            <div class="product-quantity">
                x1
            </div>
            <div class="product-interactions">
                <div class="button plus">
                    +
                </div>
                <div class="button minus">
                    -
                </div>
                <div class="button del"></div>
            </div>
        </div>
        <div class="product" data-price="250000" data-quantity="1">
            <div class="product-preview">
                <div class="thumbnail">
                    <img class="image" src="https://i.pinimg.com/originals/81/33/ae/8133ae8688b799ae3c657c7044e5fb11.jpg"/>
                </div>
                <div class="product-paper">
                    <div class="product-name">
                        Channel 5
                    </div>
                    <div class="product-price">
                        $ 250.000
                    </div>
                </div>
            </div>
            <div class="product-quantity">
                x1
            </div>
            <div class="product-interactions">
                <div class="button plus">
                    +
                </div>
                <div class="button minus">
                    -
                </div>
                <div class="button del"></div>
            </div>
        </div>
        <div class="product" data-price="30000" data-quantity="1">
            <div class="product-preview">
                <div class="thumbnail">
                    <img class="image" src="https://i.pinimg.com/236x/9a/2d/cc/9a2dcc24690e0dd8dd23e5e87cef282d--onyx-jewelry-onyx-necklace.jpg"/>
                </div>
                <div class="product-paper">
                    <div class="product-name">
                        Collar
                    </div>
                    <div class="product-price">
                        $ 30.000
                    </div>
                </div>
            </div>
            <div class="product-quantity">
                x1
            </div>
            <div class="product-interactions">
                <div class="button plus">
                    +
                </div>
                <div class="button minus">
                    -
                </div>
                <div class="button del"></div>
            </div>
        </div>
        <div class="product" data-price="20000" data-quantity="1">
            <div class="product-preview">
                <div class="thumbnail">
                    <img class="image" src="http://picture-cdn.wheretoget.it/1bv683-l-610x610-nail+polish-nails-nude-matte-pinterest-grey.jpg"/>
                </div>
                <div class="product-paper">
                    <div class="product-name">
                        Esmalte Victoria Secret
                    </div>
                    <div class="product-price">
                        $ 20.000 c/u
                    </div>
                </div>
            </div>
            <div class="product-quantity">
                x1
            </div>
            <div class="product-interactions">
                <div class="button plus">
                    +
                </div>
                <div class="button minus">
                    -
                </div>
                <div class="button del"></div>
            </div>
        </div>
        <div class="product" data-price="30000" data-quantity="1">
            <div class="product-preview">
                <div class="thumbnail">
                    <img class="image" src="https://i.ebayimg.com/images/g/3SUAAOSwiYFXKgdh/s-l300.jpg"/>
                </div>
                <div class="product-paper">
                    <div class="product-name">
                        Gafas de gato
                    </div>
                    <div class="product-price">
                        $ 30.000
                    </div>
                </div>
            </div>
            <div class="product-quantity">
                x1
            </div>
            <div class="product-interactions">
                <div class="button plus">
                    +
                </div>
                <div class="button minus">
                    -
                </div>
                <div class="button del"></div>
            </div>
        </div>
        <div class="product" data-price="40000" data-quantity="1">
            <div class="product-preview">
                <div class="thumbnail">
                    <img class="image" src="https://www.djconnections.co.uk/wp-content/uploads/2018/01/hairstyles-for-hats-lovely-the-25-best-hat-hairstyles-ideas-on-pinterest-of-hairstyles-for-hats.jpg"/>
                </div>
                <div class="product-paper">
                    <div class="product-name">
                        Sombrero French
                    </div>
                    <div class="product-price">
                        $ 40.000
                    </div>
                </div>
            </div>
            <div class="product-quantity">
                x1
            </div>
            <div class="product-interactions">
                <div class="button plus">
                    +
                </div>
                <div class="button minus">
                    -
                </div>
                <div class="button del"></div>
            </div>
        </div>
        <div class="product" data-price="120000" data-quantity="1">
            <div class="product-preview">
                <div class="thumbnail">
                    <img class="image" src="https://i.pinimg.com/736x/a1/46/ce/a146cecedb9311802779bc3e10beb0ef--grey-heels-outfit-strappy-heels-outfit.jpg"/>
                </div>
                <div class="product-paper">
                    <div class="product-name">
                        Sandalia valenciana
                    </div>
                    <div class="product-price">
                        $ 120.000
                    </div>
                </div>
            </div>
            <div class="product-quantity">
                x1
            </div>
            <div class="product-interactions">
                <div class="button plus">
                    +
                </div>
                <div class="button minus">
                    -
                </div>
                <div class="button del"></div>
            </div>
        </div>
        <div class="product" data-price="60000" data-quantity="1">
            <div class="product-preview">
                <div class="thumbnail">
                    <img class="image" src="http://pantolo.com/wp-content/uploads/2017/08/1000-ideas-about-High-Waisted-Palazzo-Pants-on-Pinterest-.jpg"/>
                </div>
                <div class="product-paper">
                    <div class="product-name">
                        Pantalón campana
                    </div>
                    <div class="product-price">
                        $ 60.000
                    </div>
                </div>
            </div>
            <div class="product-quantity">
                x1
            </div>
            <div class="product-interactions">
                <div class="button plus">
                    +
                </div>
                <div class="button minus">
                    -
                </div>
                <div class="button del"></div>
            </div>
        </div>
    </div>
</div>
<table class="bill">
    <tr class="subtotal">
        <td class="label">
            Subtotal :
        </td>
        <td class="value">
            $ 695000
        </td>
    </tr>
    <tr class="salestax">
        <td class="label">
            Impuestos :
        </td>
        <td class="value">
            $ 132050
        </td>
    </tr>
    <tr>
        <td class="label">
            Shipping :
        </td>
        <td class="value">
            $ 500
        </td>
    </tr>
    <tr class="total">
        <td class="label">
            Total :
        </td>
        <td class="value">
            $ 827055
        </td>
    </tr>
</table>
<div class="actions">
    <div class="big-button go">
        Pagar!
    </div>
</div>
<style>
    @import url(https://fonts.googleapis.com/css?family=Roboto:500);

    * {
        box-sizing: border-box;
    }

    html, body {
        font: 16px "Roboto";
        background: #f1eded;
        color: #523118;
        width: 100%;
        height: 100%;
    }

    .header {
        text-align: center;
        padding: 1em 0 2em;
        background-color: #f92A85;
        color: #fff;
        box-shadow: 0 0 0 0.5em rgba(255, 255, 255, 0.25) inset;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .header h1 {
        font-size: 4em;
    }

    .header p {
        font-size: 1.2em;
    }

    .cart-container {
        width: 100%;
        display: inline-block;
        margin-left: 5%;
        margin-right: 5%;
        margin-bottom: 7%;
    }

    .cart-container .empty {
        font-size: 3em;
        width: 100%;
        text-align: center;
        display: table-cell;
        vertical-align: middle;
    }

    .cart {
        list-style: none;
        height: 280px;
        width: 100%;
        cursor: grab;
        position: relative;
        left: 0;
        transform: translate3d(0, 0, 0);
    }

    .cart .product {
        position: relative;
        width: 350px;
        float: left;
        margin-bottom: 2%;
    }

    .cart .product:hover {
        z-index: 1;
    }

    .cart .product:nth-child(3n+1) .product-preview, .cart .product:nth-child(3n+1) .product-interactions {
        background: #E8B0AF;
    }

    .cart .product:nth-child(3n+2) .product-preview, .cart .product:nth-child(3n+2) .product-interactions {
        background: #FDDAC4;
    }

    .cart .product:nth-child(3n) .product-preview, .cart .product:nth-child(3n) .product-interactions {
        background: #F1D5A5;
    }

    .cart .product .product-preview {
        padding: 1em;
        height: 380px;
        position: relative;
    }

    .cart .product .product-preview .thumbnail {
        width: 100%;
        min-height: 120px;
        max-height: 200px;
    }

    .cart .product .product-preview .thumbnail .image {
        width: 100%;
        margin-top: 1em;
    }

    .cart .product .product-preview .product-paper {
        position: absolute;
        height: 75px;
        bottom: 0;
        background: rgba(255, 255, 255, 0.65);
        padding: 1em;
        display: block;
        width: 100%;
        margin-left: -1em;
    }

    .cart .product .product-preview .product-name {
        font-size: 1.6em;
        text-align: center;
    }

    .cart .product .product-preview .product-price {
        text-align: center;
        font-size: 1.2em;
    }

    .cart .product .product-quantity {
        font-size: 2em;
        width: 2em;
        height: 2em;
        text-align: center;
        padding: 0.35em 0;
        border-radius: 1em;
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        background: #fff;
        transform: rotateZ(10deg);
        backface-visibility: hidden;
    }

    .cart .product:hover .product-interactions, .cart .product .visible {
        opacity: 1 !important;
        transform: perspective(600px) rotateX(0deg) !important;
    }

    .cart .product .product-interactions {
        position: absolute;
        bottom: 75px;
        width: 100%;
        height: 60px;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.4);
        transform-origin: 50% 100% 0;
        transform: perspective(600px) rotateX(90deg);
        opacity: 0;
        transition: 0.4s all ease-in-out;
        display: table;
    }

    .cart .product .product-interactions .button {
        width: 32%;
        height: 60px;
        float: left;
        text-align: center;
        font-size: 5em;
        line-height: 0.75em;
        color: #999;
        background: rgba(255, 255, 255, 0.65);
        cursor: pointer;
        user-select: none;
        transition: 0.1s all ease-in-out;
        transform-origin: 50% 0 0;
        transform: perspective(600px);
        z-index: 0;
        position: relative;
        display: table-cell;
        vertical-align: middle;
    }

    .cart .product .product-interactions .button.plus {
        color: #7fb034;
    }

    .cart .product .product-interactions .button.minus {
        color: #a0ce5a;
    }

    .cart .product .product-interactions .button.del:after {
        content: "+";
        position: absolute;
        color: red;
        left: 50%;
        margin-left: -0.15em;
        transform: rotateZ(45deg);
    }

    .cart .product .product-interactions .button:nth-child(1), .cart .product .product-interactions .button:nth-child(2) {
        border-right: 1px dashed rgba(0, 0, 0, 0.1);
    }

    .cart .product .product-interactions .button:nth-child(2) {
        width: 36%;
    }

    .cart .product .product-interactions .button:active {
        font-size: 7em;
        background: #fff !important;
        box-shadow: 0 0 0 10px #fff !important;
        z-index: 10;
        line-height: 0.45em;
    }

    .cart .product .product-interactions .button:hover {
        background: rgba(255, 255, 255, 0.5);
    }

    .bill {
        padding: 1em;
        font-size: 1.4em;
        line-height: 1.6em;
        background: #fff;
        color: #48320b;
        width: 100%;
        margin-top: 2%
    }

    .bill .total {
        font-weight: bold;
        font-size: 1.6em;
    }

    .bill tr td {
        width: 50%;
        padding: 0.25em 20px;
    }

    .bill tr .label {
        text-align: right;
    }

    .actions {
        text-align: center;
        position: relative;
        margin-left: 40%;
        margin-right: 40%;
        width: 300px;
        display: inline-block;
        height: 6em;
    }

    .actions .big-button {
        position: absolute;
        cursor: pointer;
        user-select: none;
        padding: 1em;
        width: 100%;
        font-size: 1.5em;
        transition: 0.1s all ease-in-out;
        box-shadow: 0 0 0 0 #6c411f;
    }

    .actions .big-button:active {
        z-index: 10;
        font-size: 2em;
    }

    .actions .big-button.return {
        background: #ad6932;
        color: #f0dccd;
    }

    .actions .big-button.return:hover {
        background: #6c411f;
    }

    .actions .big-button.return:before {
        content: "←";
    }

    .actions .big-button.go {
        background: #e44249;
        color: #fff;
        font-size: 2em;
    }

    .actions .big-button.go:hover {
        background: #7fb034;
    }

    .actions .big-button.go:active {
        font-size: 2.5em;
        background: #bede8e;
        box-shadow: 0 0 0 10px #bede8e;
    }
</style>
<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/js/bootstrap.min.js'></script>
<script type="text/javascript">$('.plus').click(function () {
  var product = $(this).closest('.product')
  var q = product.data('quantity') + 1
  product.data('quantity', q)
  updateProduct(product)
})
$('.minus').click(function () {
  var product = $(this).closest('.product')
  var q = Math.max(0, product.data('quantity') - 1)
  product.data('quantity', q)
  updateProduct(product)
})
$('.del').click(function () {
  var product = $(this).closest('.product')
  product.hide('blind', {direction: 'left'}, 500, function () {
    product.remove()
    updateProduct(product)
    if ($('.product').length == 0) {
      $('.cart-container .cart').hide()
      $('.cart-container .empty').show()
    }
  })
})

function updateProduct (product) {
  var quantity = product.data('quantity')
  var price = product.data('price')
  $('.product-quantity', product).text('x' + quantity)
  $('.product-price', product).text('$ ' + (price * quantity).toFixed(0))
  updateBill()
}

function updateBill () {
  var subtotal = 0
  var salestax = 0
  var shipping = 5
  var total = 0
  $('.product').each(function () { subtotal += $(this).data('quantity') * $(this).data('price') })
  salestax = subtotal * 0.19
  total = subtotal + salestax + shipping
  $('.subtotal .value').text('$ ' + subtotal.toFixed(0))
  $('.salestax .value').text('$ ' + salestax.toFixed(0))
  $('.total .value').text('$ ' + total.toFixed(0))
}</script>
</body>
</html>`

router.get('/:documentId', wrapper(async (req, res) => {
  let client = await findById(req.params.documentId, {
    include: [Movement, Redemption, CreditCard, {model: Client, as: 'Friends'}, {model: Client, as: 'Friends2'}]
  })
  client.setDataValue('Friends', client.Friends.concat(client.Friends2))
  client = client.toJSON()
  delete client.Friends2
  res.send(client)
}))

router.post('/:documentId/addTx', wrapper(async (req, res) => {
  const client = await findById(req.params.documentId)
  await Movement.create({amount: req.body.amount, ClientId: client.id})
  await client.update({
    points: client.points + req.body.amount
  })

  const url = (await axios.post(`https://flow-apis.inal.co/mix/renderTemplate|uploadFile|shortenUrl`, {
    content: leTemplate,
    viewport: {
      'width': 800,
      'height': 600
    },
    token: 'SU5OT1ZBQ0lPTmRyYjp0YWpFMnc=',
    extension: 'html',
    contentType: 'text/html',
    firstName: client.firstName
  }, {
    headers: {
      'content-type': 'application/json'
    }
  })).data.shortUrl

  await axios.post('https://nplat.inal.co/messages/text', {
    allChannels: true,
    fbMessenger: true,
    telephones: [client.telephone],
    text: `Genial, has acumulado ${req.body.amount} puntos con tu última compra, revisa tu progreso acá ${url}`,
    fbMessengerTag: 'NON_PROMOTIONAL_SUBSCRIPTION',
    priority: 1
  })
  res.sendStatus(200)
}))

router.post('/:documentId/acceptTerms', wrapper(async (req, res) => {
  const client = await findById(req.params.documentId)
  await client.update({acceptedTerms: true})
  res.sendStatus(200)
}))

module.exports = router
