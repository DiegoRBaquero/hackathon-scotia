const axios = require('axios')
const debug = require('debug')('backend:routes:user')
const express = require('express')
const wrapper = require(`express-debug-async-wrap`)(debug)
const sef = require('sequelize-express-findbyid')

const {Client, CreditCard, Movement, Redemption, Reward} = require(`../db`)
const findById = sef(Client, 'document')

const router = express.Router()

const leTemplate = `<!DOCTYPE html>
   <html>
      <head>
      <meta charset="UTF-8">
         <title>
            Your invoice for HealthPlanG purchase
         </title>         <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1">         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
         <style type="text/css">
            /* CLIENT-SPECIFIC STYLES */    body,    table,    td,    a {      -webkit-text-size-adjust: 100%;      -ms-text-size-adjust: 100%;    }    table,    td {      mso-table-lspace: 0pt;      mso-table-rspace: 0pt;    }    img {      -ms-interpolation-mode: bicubic;    }    /* RESET STYLES */    img {      border: 0;      height: auto;      line-height: 100%;      outline: none;      text-decoration: none;    }    table {      border-collapse: collapse !important;    }    body {      height: 100% !important;      margin: 0 !important;      padding: 0 !important;      width: 100% !important;    }    /* iOS BLUE LINKS */    a[x-apple-data-detectors] {      color: inherit !important;      text-decoration: none !important;      font-size: inherit !important;      font-family: inherit !important;      font-weight: inherit !important;      line-height: inherit !important;    }    /* MEDIA QUERIES */    @media screen and (max-width: 480px) {      .mobile-hide {        display: none !important;      }      .mobile-center {        text-align: center !important;      }      .align-center {        max-width: initial !important;      }      h1 {        display: inline-block;        margin-right: auto !important;        margin-left: auto !important;      }    }    @media screen and (min-width: 480px) {      .mw-50 {        max-width: 50%;      }    }    /* ANDROID CENTER FIX */    div[style*="margin: 16px 0;"] {      margin: 0 !important;    }    :root {      --purple: #5a3aa5;      --pink: #b91bab;      --blue: #2cbaef;      --green: #23c467;    }  
         </style>
</head>
      <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
         <!-- HIDDEN PREHEADER TEXT -->
         <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus dolor aliquid omnis consequatur est deserunt, odio neque blanditiis aspernatur, mollitia ipsa distinctio, culpa fuga obcaecati!    
         </div>
         <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
               <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                     <tr>
                        <td align="center" valign="top" width="600">
                           <![endif]-->
                              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                                 <tr>
                                    <td align="center" height="100" style=" background-color: #DF0E20;" bgcolor="#b91bAb"></td>
</tr>
</table>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:800px;">
               <tr>
                  <td align="center" valign="top" style="background-color: #ffffff; font-size:0; padding: 35px 35px 0;" bgcolor="#ffffff">
                     <!--[if (gte mso 9)|(IE)]>
                     <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                           <td align="left" valign="top" width="300">
                              <![endif]-->
                                 <div class="align-center" style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                    <table class="align-center" align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:800px;">
                                       <tr>
                                          <td align="left" height="48" valign="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size:48px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                             <h1 style="font-size: 0; line-height: 0; font-weight: 600;  margin: 0; color: #ffffff;">
                                                <img src="https://scotiabankfiles.azureedge.net/scotiabank-colombia/Attachments/NewItems/logo-scotiabankcolpatria-2_20180622202846_0.jpg" width="500" height="27" style="display: block; border: 0px;" alt="HealthPlanG" /><span>HealthPlan G</span>
                                             </h1>
</td>
</tr>
</table>
</div>
                  <!--[if (gte mso 9)|(IE)]>
            </td>
               <td align="right" width="300">
                  <![endif]-->
                     <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                        <table align="right" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                           <tr>
                              <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                 <table cellspacing="0" cellpadding="0" border="0" align="right">
                                    <tr>
                                       <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                          <p style="font-size: 18px; font-weight: 400; margin: 0; color: #23C467;">
                                             <a target="_blank" style="color: #DF0E20; text-decoration-skip: ink;" title="nolink">Recompensa TC</a>
                                          </p>
</td>
                                 <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding-left: 10px;">
                                    <a  target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://png.icons8.com/windows/50/c0392b/wallet.png" width="30" height="30" style="display: block; border: 0px;" alt="" /></a>
                                 </td>
</tr>
</table>
</td>
</tr>
</table>
</div>
                     <!--[if (gte mso 9)|(IE)]>
               </td>
</tr>
</table>
                  <![endif]--></td>
</tr>
                     <tr>
                        <td align="center" style="padding: 0 15px 20px 15px; background-color: #ffffff;" bgcolor="#ffffff">
                           <!--[if (gte mso 9)|(IE)]>
                           <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                              <tr>
                                 <td align="center" valign="top" width="600">
                                    <![endif]-->
                                       <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                          <tr>
                                             <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 40px;padding-bottom:30px;">
                                                <img src="http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/Check-3-icon.png" width="110" height="110" style="display: block; border: 0px;margin-bottom : 30px;" /><br>
                                                <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; ;color: #333333; margin: 0;">
                                                   ¡Gracias por redimir tus puntos Scotiabank!                            
                                                </h2>
</td>
</tr>
                              <tr>
                                 <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 5px;">
                                    <p style="font-size: 20px; font-weight: 400; line-height: 24px; color: #777777; padding: 0 30px;">
                                       Esta es tu factura de compra de la redención de tus puntos Scotiabank presentala para reclamar tus productos.                      
                                    </p>
</td>
</tr>
                              <tr>
                                 <td align="left" style="padding-top: 20px;">
                                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                       <tr>
                                          <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                             Factura #                          
                                          </td>
                                       <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                          {{numfactura}}                          
                                       </td>
</tr>
                                 <tr>
                                    <td width="45%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                       Fecha de compra                          
                                    </td>
                                    <td width="55%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 24px; padding: 15px 10px 5px 10px;">
                                       {{fechacompra}}                          
                                    </td>
</tr>
                                 <tr>
                                    <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                       Cliente                          
                                    </td>
                                    <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 24px; padding: 5px 10px;">
                                       {{name}}                          
                                    </td>
</tr>
                                 <tr>
                                    <td width="75%" align="left" style="border-bottom: 2px solid #eeeeee; font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px 20px 10px;">
                                       Medio de pago                          
                                    </td>
                                    <td width="25%" align="left" style="border-bottom: 2px solid #eeeeee; font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 24px; padding: 5px 10px 20px 10px;">
                                       {{mediodepago}}                          
                                    </td>
</tr>
                                 <tr>
                                    <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; line-height: 24px; padding: 20px 10px 5px 10px;">
                                       <span style="font-style: italic;">Productos comprados</span> ( {{cantidad}} )                          
                                    </td>
                                    <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 24px; padding: 20px 10px 5px 10px;">
                                       {{precio}}                          
                                    </td>
</tr>
                                 <tr>
                                    <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                       Costo de envio                          
                                    </td>
                                    <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 24px; padding: 5px 10px;">
                                       {{valorenvio}}                          
                                    </td>
</tr>
                                 <tr>
                                    <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                       IVA                          
                                    </td>
                                    <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 24px; padding: 5px 10px;">
                                       {{impuestos}}                          
                                    </td>
</tr>
</table>
</td>
</tr>
                        <tr>
                           <td align="left" style="padding-top: 20px;">
                              <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                 <tr>
                                    <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 2px solid #eeeeee; border-bottom: 2px solid #eeeeee;">
                                       TOTAL                          
                                    </td>
                                 <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 2px solid #eeeeee; border-bottom: 2px solid #eeeeee;">
                                    {{preciototal}}                          
                                 </td>
</tr>
</table>
</td>
</tr>
</table>
                        <!--[if (gte mso 9)|(IE)]>
                     </td>
</tr>
</table>
                        <![endif]--></td>
</tr>
                           <tr>
                              <td align="center" height="100%" valign="top" width="100%" style="padding: 0 15px 5px 15px; background-color: #ffffff;" bgcolor="#ffffff">
                                 <!--[if (gte mso 9)|(IE)]>
                                 <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                    <tr>
                                       <td align="center" valign="top" width="600">
                                          <![endif]-->
                                             <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                                <tr>
                                                   <td align="center" valign="top" style="font-size:0;">
                                                      <!--[if (gte mso 9)|(IE)]>
                                                      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                                         <tr>
                                                            <td align="left" valign="top" width="300">
                                                               <![endif]-->
                                                                  <div class="mw-50" style="display:inline-block; padding-bottom: 15px; vertical-align:top; width:100%;">
                                                                     <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                                                        <tr>
                                                                           <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 0 10px;">
                                                                              <p style="font-weight: 800;">
                                                                                 Dirección del cliente
                                                                              </p>
                                                                              <p>
                                                                                 {{direccioncliente}}<br>{{city}}<br>{{telephone}}
                                                                              </p>
</td>
</tr>
</table>
</div>
                                    <!--[if (gte mso 9)|(IE)]>
                              </td>
                                 <td align="left" valign="top" width="300">
                                    <![endif]-->
                                       <div class="mw-50" style="display:inline-block; padding-bottom: 15px; vertical-align:top; width:100%;">
                                          <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                             <tr>
                                                <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 0 10px;">
                                                   <p style="font-weight: 800;">
                                                      Fecha de entrega estimada
                                                   </p>
                                                   <p>
                                                      {{fechaentrega}}
                                                   </p>
</td>
</tr>
</table>
</div>
                                       <!--[if (gte mso 9)|(IE)]>
                                 </td>
</tr>
</table>
                                    <![endif]--></td>
</tr>
</table>
                                       <!--[if (gte mso 9)|(IE)]>
                                    </td>
</tr>
</table>
                                       <![endif]--></td>
</tr>
                                          <tr>
                                             <td align="center" height="100%" valign="top" width="100%" style="padding: 0 15px 55px 15px; background-color: #ffffff;" bgcolor="#ffffff">
                                                <!--[if (gte mso 9)|(IE)]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                                   <tr>
                                                      <td align="center" valign="top" width="600">
                                                         <![endif]-->
                                                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                                               <tr>
                                                                  <td align="center" valign="top" style="font-size:0;">
                                                                     <!--[if (gte mso 9)|(IE)]>
                                                                     <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                                                        <tr>
                                                                           <td align="left" valign="top" width="300">
                                                                              <![endif]-->
                                                                                 <div class="mw-50" style="display:inline-block; padding-bottom: 15px; vertical-align:top; width:100%;">
                                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                                                                       <tr>
                                                                                          <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 0 10px;">
                                                                                             <p style="font-weight: 800;">
                                                                                                Dirección proveedor
                                                                                             </p>
                                                                                             <p>
                                                                                                {{nombreprovedor}}<br>{{direccionprovedor}}<br>{{ciudadprovedor}}<br>{{telephonepovedor}}
                                                                                             </p>
</td>
</tr>
</table>
</div>
                                                   <!--[if (gte mso 9)|(IE)]>
                                             </td>
                                                <td align="left" valign="top" width="300">
                                                   <![endif]-->
                                                      <div class="mw-50" style="display:inline-block; vertical-align:top; width:100%;">
                                                         <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                                            <tr>
                                                               <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 0 10px;">
                                                                  <p style="font-weight: 800;">
                                                                     Observaciones
                                                                  </p>
                                                                  <p>
                                                                     {{observacionesfactu}}
                                                                  </p>
</td>
</tr>
</table>
</div>
                                                      <!--[if (gte mso 9)|(IE)]>
                                                </td>
</tr>
</table>
                                                   <![endif]--></td>
</tr>
</table>
                                                      <!--[if (gte mso 9)|(IE)]>
                                                   </td>
</tr>
</table>
                                                      <![endif]--></td>
</tr>
                                                         <tr>
                                                            <td align="center" style=" padding: 10px; background-color: ##DF0E20;" bgcolor="#DF0E20">
                                                               <!--[if (gte mso 9)|(IE)]>
                                                               <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                                                  <tr>
                                                                     <td align="center" valign="top" width="600">
                                                                        <![endif]-->
                                                                           <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:1000px;">
                                                                              <tr>
                                                                                 <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                                                                    <h2 style="font-size: 28px; font-weight: 800; line-height: 30px; color: #ffffff; margin-bottom 15px;">
                                                                                       Tienes {{puntos}} puntos disponibles. <br>  Mira tu catálogo y redime ahora!                            
                                                                                    </h2>
</td>
</tr>
                                                                  <tr>
                                                                     <td align="center" style="padding: 8px 0 8px 0;">
                                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                                           <img src="https://inal.co/hpdvMLD-" width="60" height="60" style="display: block; border: 0px;margin-bottom: 15px; margin-top: 10px;" /><br>
                                                                        </table>
</td>
</tr>
</table>
                                                            <!--[if (gte mso 9)|(IE)]>
                                                         </td>
</tr>
</table>
                                                            <![endif]--></td>
</tr>
                                                               <tr>
                                                                  <td align="center" style="padding: 35px 35px 15px; background-color: #ffffff;" bgcolor="#ffffff">
                                                                     <!--[if (gte mso 9)|(IE)]>
                                                                     <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                                                        <tr>
                                                                           <td align="center" valign="top" width="600">
                                                                              <![endif]-->
                                                                                 <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                                                                    <tr>
                                                                                       <td align="center" style="line-height: 0;">
                                                                                          <img src="https://scotiabankfiles.azureedge.net/scotiabank-colombia/Attachments/NewItems/logo-scotiabankcolpatria-2_20180622202846_0.jpg" width="400" height="100" style="display: block; border: 0px;" />
                                                                                       </td>
</tr>
                                                                        <tr>
                                                                           <td align="center" style="color: #ffffff; font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                                                              <p style="color: #666666; font-size: 14px; font-weight: 600; line-height: 18px; margin-bottom: 0;">
                                                                                 Cra. 7 No. 24-89 <br> Edificio Colpatria                      
                                                                              </p>
</td>
</tr>
                                                                        <tr>
                                                                           <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                                                              <p style="font-size: 12px; font-weight: 400; line-height: 20px; color: #666666; padding: 0 25px; max-width: 400px;">
                                                                                 Si usted desea dejar de recibir este tipo de comunicación,  ignore este link o envie un correo a prueba1232@gmail.com                        <span style="color: #888888; display: block; font-size: 90%; font-weight: 500; padding-top: 15px;">&copy; © 2018  - ® Marca registrada de The Bank of Nova Scotia, utilizada bajo licencia..</span>
                                                                              </p>
</td>
</tr>
</table>
                                                                        <!--[if (gte mso 9)|(IE)]>
                                                               </td>
</tr>
</table>
                                                                  <![endif]--></td>
</tr>
</table>
                                                                     <!--[if (gte mso 9)|(IE)]>
                                                                  </td>
</tr>
</table>
                                                                     <![endif]--></td>
</tr>
</table>
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

  const url = (await axios.post(`https://whatisthis.com/shortenUrl`, {
    url: `https://belligerent-baseball.surge.sh/?cedula=${client.document}`
  }, {
    headers: {
      'content-type': 'application/json'
    }
  })).data.shortUrl

  await axios.post('https://whatisthis.com/messages/text', {
    allChannels: true,
    fbMessenger: true,
    telephones: [client.telephone],
    text: `Scotiabank Colpatria informa que usted acabo de hacer una compra en ALKOSTO y su nuevo total de puntos es ${client.points} y puede redimirlos en ${url}`,
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

router.get('/:documentId/redeem/:rewardId', wrapper(async (req, res) => {
  const client = await findById(req.params.documentId)
  debug(client)
  const reward = await Reward.findById(req.params.rewardId)
  debug(reward)
  await client.update({
    points: Math.max(client.points - reward.pointsCost, 0)
  })

  const urlFact = (await axios.post(`https://whatisthis.com/mix/renderTemplate|uploadFile|shortenUrl`, {
    content: leTemplate,
    viewport: {
      'width': 800,
      'height': 600
    },
    token: 'AAAAAAAAAAAAAAAAA',
    extension: 'html',
    contentType: 'text/html',
    'numfactura': 876543,
    'fechacompra': (new Date()).toLocaleDateString(),
    'name': client.firstName,
    'mediodepago': 'Puntos',
    'cantidad': 1,
    'precio': reward.pointsCost,
    'valorenvio': 0,
    'impuesto': 0,
    'preciototal': reward.pointsCost,
    'direcioncliente': 'Carrera 9 # 72 - 81',
    'city': 'Bogota',
    'telephone': client.telephone,
    'fechadenetrega': '3 dias habiles',
    'nombreprovedor': 'Falabella',
    'direccionprovedor': 'Calle 127 # 7 - 11',
    'ciudadprovedor': 'Bogota',
    'telephoneprovedor': '73846234',
    'observacionesfactu': 'Redencion puntos',
    'puntos': 0
  }, {
    headers: {
      'content-type': 'application/json'
    }
  })).data.shortUrl

  const url = (await axios.post(`https://whatisthis.com/shortenUrl`, {
    url: `https://belligerent-baseball.surge.sh/?cedula=${client.document}`
  }, {
    headers: {
      'content-type': 'application/json'
    }
  })).data.shortUrl

  await axios.post('https://whatisthis.com/messages/text', {
    allChannels: true,
    fbMessenger: true,
    telephones: [client.telephone],
    text: `Scotiabank Colpatria compra exitosa puedes ver tu factura aqui ${urlFact}, sigue redimiendo en ${url}`,
    fbMessengerTag: 'NON_PROMOTIONAL_SUBSCRIPTION',
    priority: 1
  })

  res.sendStatus(200)
}))

module.exports = router
