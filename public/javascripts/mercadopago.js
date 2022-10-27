// SDK do Mercado Pago

/*

Cartões de teste
Cartão	Número	Código de segurança	Data de vencimento
Mastercard	5031 4332 1540 6351	123	11/25
Visa	4235 6477 2802 5682	123	11/25
American Express	3753 651535 56885	1234	11/25
Para testar diferentes resultados de pagamento com o Checkout Pro, preencha o status desejado no nome do titular do cartão:

Status de pagamento	Descrição
APRO	Pagamento aprovado
CONT	Pagamento pendente
OTHE	Recusado por erro geral
CALL	Recusado com validação para autorizar
FUND	Recusado por quantia insuficiente
SECU	Recusado por código de segurança inválido
EXPI	Recusado por problema com a data de vencimento
FORM	Recusado por erro no formulário

https://www.mercadopago.com.br/developers/pt/guides/online-payments/checkout-pro/integration

MEUS DADOS PARA TESTE

Mercado Pago - Chaves para Teste

aplicacao:
aws-ecomm

public key:
TEST-853f0438-8152-4af1-8b02-9e8d09835c13

access token

TEST-3415615696062864-022314-293b2e6e3dd45d66bf3ec4b8d23431f0-6500124



*/



const mercadopago = require ('mercadopago');
// Adicione as credenciais

mercadopago.configure({
  access_token: 'TEST-3415615696062864-022314-293b2e6e3dd45d66bf3ec4b8d23431f0-6500124'
});

          
// Cria um objeto de preferência
let preference = {
  items: [
    {
      title: 'Meu produto',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
// Este valor substituirá a string "<%= global.id %>" no seu HTML
  global.id = response.body.id;
}).catch(function(error){
  console.log(error);
});

/*
{
    "items": [
        {
            "id": "item-ID-1234",
            "title": "Meu produto",
            "currency_id": "BRL",
            "picture_url": "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
            "description": "Descrição do Item",
            "category_id": "art",
            "quantity": 1,
            "unit_price": 75.76
        }
    ],
    "payer": {
        "name": "João",
        "surname": "Silva",
        "email": "user@email.com",
        "phone": {
            "area_code": "11",
            "number": "4444-4444"
        },
        "identification": {
            "type": "CPF",
            "number": "19119119100"
        },
        "address": {
            "street_name": "Street",
            "street_number": 123,
            "zip_code": "06233200"
        }
    },
    "back_urls": {
        "success": "https://www.success.com",
        "failure": "http://www.failure.com",
        "pending": "http://www.pending.com"
    },
    "auto_return": "approved",
    "payment_methods": {
        "excluded_payment_methods": [
            {
                "id": "master"
            }
        ],
        "excluded_payment_types": [
            {
                "id": "ticket"
            }
        ],
        "installments": 12
    },
    "notification_url": "https://www.your-site.com/ipn",
    "statement_descriptor": "MEUNEGOCIO",
    "external_reference": "Reference_1234",
    "expires": true,
    "expiration_date_from": "2016-02-01T12:00:00.000-04:00",
    "expiration_date_to": "2016-02-28T12:00:00.000-04:00"
}
*/