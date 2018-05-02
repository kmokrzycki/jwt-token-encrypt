export default {
  encryption: {
    key: '40EC7247AB11FF90928EA4B3D3763B12',
    algorithm: 'aes-256-cbc',
  },
  jwtDetails: {
    algorithm: 'HS256',
    key: 'NKInVWhB1rVLCwxltMNuiUC6h9UudAbi',
    secret: 'x6Ujx3ZmF7tWz1cLJNbsSmwbh748AP2X',
  },
  jwtDetailsOverwrite: {
    key: 'NKInVWhB1rVLCwxltMNuiUC6h9UudAbi',
    secret: 'x6Ujx3ZmF7tWz1cLJNbsSmwbh748AP2X',
    expiresIn: '100s',
  },
  public: {
    data1: 1,
    data2: 2,
    data3: 3,
  },
  confidential: {
    pin: '1234',
  },
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJOS0luVldoQjFyVkxDd3hsdE1OdWlVQzZoOVV1ZEFiaSIsImRhdGEiOnsicHVibGljIjp7ImRhdGExIjoxLCJkYXRhMiI6MiwiZGF0YTMiOjN9LCJlbmNEYXRhIjoiYjliM2QyNDdkNTk4ZTlkODczOTM2NTI4MWVmN2ExZTkifSwiaWF0IjoxNTExMTk5MDg0LCJleHAiOjE1MTEyNDIyODR9.KzfcIY95RR7aPYKn5EcXZYvETDCGZIJ91p7IfXCiClw',
  jwtDecoded: {
    iss: 'NKInVWhB1rVLCwxltMNuiUC6h9UudAbi',
    data: {
      public: { data1: 1, data2: 2, data3: 3 },
      encData: '5fb8ed70a3864cbd97b25cc8ca2c0bc7',
    },
  },
  jwtDecodedCustomEncField: {
    iss: 'NKInVWhB1rVLCwxltMNuiUC6h9UudAbi',
    data: {
      public: { data1: 1, data2: 2, data3: 3 },
      customField: '5fb8ed70a3864cbd97b25cc8ca2c0bc7',
    },
  },
  jwtDecrypted: {
    data: {
      pin: '1234',
      data1: 1,
      data2: 2,
      data3: 3,
    },
    iss: 'NKInVWhB1rVLCwxltMNuiUC6h9UudAbi',
  },
};
