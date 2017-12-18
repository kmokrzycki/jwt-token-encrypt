export default {
  encryption: {
    key: '40EC7247AB11FF90928EA4B3D3763B12',
    iv: '1234567890123456',
    algorithm: 'aes-256-cbc',
  },
  text: {
    string: 'This is the string.',
    encrypted: '9891587ceb9e27c09e8e43ca65a591cfdf98d174a690a7b1064e1a0d15d7326d',
  },
  object: {
    input: { user: 'consultant:91858', consultant: '91858', agency: '18462' },
    encrypted: 'fa36a3ecf0aaad2445be4a49fe1c7df3baaedf84e1c23c6651f068b859bc85b9aab80b3ee0e633948ddf8598afbd532bc8c71885a1052ed0b8596500f65db135e5150a6ae8998a9bdc6688727820c1a8',
  },
};
