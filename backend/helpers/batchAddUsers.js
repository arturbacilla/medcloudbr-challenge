// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');
const { setResponse } = require('./setResponse');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  let response;

  const params = {
    RequestItems: {
      medcloudbr: [
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'chrystal_moore@undefined.tp',
              name: 'Chrystal Moore',
              birthdate: '02/06/1988',
              address: '88 Dobbin Street, Bascom, Oregon',
              admin: false,
              password: '',
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'francis_gregory@undefined.loan',
              name: 'Francis Gregory',
              birthdate: '28/01/1992',
              address: '37 Brightwater Avenue, Glendale, Utah',
              admin: false,
              password: 'abc123',
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'noelle_reed@undefined.band',
              name: 'Noelle Reed',
              birthdate: '27/02/2001',
              address: '34 Belvidere Street, Beason, Nebraska',
              admin: false,
              password: 'abc123',
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'christy_roberson@undefined.tr',
              name: 'Christy Roberson',
              birthdate: '23/08/2002',
              address: '87 Madeline Court, Venice, Idaho',
              admin: false,
              password: 'abc123',
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'cox_mcmillan@undefined.support',
              name: 'Cox Mcmillan',
              birthdate: '27/10/2002',
              address: '31 Bokee Court, Fairfield, Maine',
              admin: false,
              password: 'abc123',
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'margery_landry@undefined.rio',
              name: 'Margery Landry',
              birthdate: '18/11/2007',
              address: '42 Louisa Street, Tivoli, Vermont',
              admin: false,
              password: 'abc123',
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'lisa_white@undefined.cleaning',
              name: 'Lisa White',
              birthdate: '07/02/1990',
              address: '13 Village Road, Dunbar, North Carolin',
              admin: false,
              password: 'abc123',
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'mindy_stanton@undefined.gq',
              name: 'Mindy Stanton',
              birthdate: '08/01/1990',
              address: '67 Amber Street, Nutrioso, Indiana',
              admin: false,
              password: 'abc123',
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'collins_fry@undefined.maison',
              name: 'Collins Fry',
              birthdate: '27/07/2009',
              address: '93 Banner Avenue, Henrietta, Georgia',
              admin: false,
              password: 'abc123',
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'fern_mcclure@undefined.auto',
              name: 'Fern Mcclure',
              birthdate: '18/08/2003',
              address: '8 Bainbridge Street, Dante, Virgin Island',
              admin: false,
              password: 'abc123',
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'mckay_hobbs@undefined.yandex',
              name: 'Mckay Hobbs',
              birthdate: '10/10/1990',
              address: '5 Crown Street, Riviera, Iowa',
              admin: false,
              password: 'abc123',
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'helen_wallace@undefined.site',
              name: 'Helen Wallace',
              birthdate: '20/06/2000',
              address: '78 Arion Place, Derwood, Virginia',
              admin: false,
              password: 'abc123',
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: AWS.util.uuid.v4(),
              email: 'byers_richard@undefined.boo',
              name: 'Byers Richard',
              birthdate: '03/08/2009',
              address: '53 Pleasant Place, Tuttle, Alabama',
              admin: false,
              password: 'abc123',
            },
          },
        },
      ],
    },
  };

  await dynamodb.batchWrite(params).promise().then(() => {
    response = setResponse(200, `Patient ${event.name} created successfully!`);
  }).catch((err) => {
    response = setResponse(500, `${err}`);
  });

  return response;
};
