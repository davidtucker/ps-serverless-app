/*

  MOCK DATA

  This simulates all of the service calls for the application until the
  real calls can be added in.

*/

/**
 * This function simulates a service call in this mock environment.
 *
 * @param {object} data The data to return after the specified timeout
 * @param {number} timeout Number of milliseconds to wait until data is returned
 * @returns {object} The data returned from the mock call
 */
export const mockCall = (data, timeout) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (data) {
      resolve(data);
    } else {
      reject(new Error('No data for return'));
    }
  }, timeout);
});

// Documents -------------------------------------------------------------

export const allDocuments = [
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rIBytIBHHSuH2PkAoTNeYMwLoj-thumb.png',
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    FileSize: 52615,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:09:31.658Z',
    PK: '1rIBytIBHHSuH2PkAoTNeYMwLoj',
    Name: 'Branding Overview',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rIC2B5RWsRAXqjLhUK83cOhyU0-thumb.png',
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    FileSize: 2383972,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:09:56.057Z',
    PK: '1rIC2B5RWsRAXqjLhUK83cOhyU0',
    Name: 'Quarterly Report',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rIC5ZKYTKRpYq8eNVPlq916tp7-thumb.png',
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    FileSize: 2755501,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:10:22.237Z',
    PK: '1rIC5ZKYTKRpYq8eNVPlq916tp7',
    Name: 'Market Analysis Q2 2021',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rIC9K1QuKedADmBXFhKdGUbhgV-thumb.png',
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    FileSize: 88395,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:10:49.497Z',
    PK: '1rIC9K1QuKedADmBXFhKdGUbhgV',
    Name: 'Client Event Promo',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICEDFoRqkq4htElNOvlXvk5cX-thumb.png',
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    FileSize: 1149843,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:11:29.578Z',
    PK: '1rICEDFoRqkq4htElNOvlXvk5cX',
    Name: 'Rebrand Goals and Objectives',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICM50SzcfWtFPIN6cOG7BaxJR-thumb.png',
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    FileSize: 3345966,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:12:32.706Z',
    PK: '1rICM50SzcfWtFPIN6cOG7BaxJR',
    Name: 'Marketing Org Chart - H1 2021',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICP1k59Xl4jazJcSObBnrxVQz-thumb.png',
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    FileSize: 2056211,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:12:55.058Z',
    PK: '1rICP1k59Xl4jazJcSObBnrxVQz',
    Name: 'Updated Website Copy Feedback',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICSi6kfRPEXKmfkwxa2HPPRst-thumb.png',
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    FileSize: 1794186,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:13:24.898Z',
    PK: '1rICSi6kfRPEXKmfkwxa2HPPRst',
    Name: 'Director of Marketing - Job Description',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICYSIwx6SBVVwY42PQWdx18Sr-thumb.png',
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    FileSize: 88493,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:14:08.642Z',
    PK: '1rICYSIwx6SBVVwY42PQWdx18Sr',
    Name: 'Partner Network Marketing Proposal',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICd5Y9dlPEQlVcxCgBSs1v0Zz-thumb.png',
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    FileSize: 1753479,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:14:46.811Z',
    PK: '1rICd5Y9dlPEQlVcxCgBSs1v0Zz',
    Name: 'Strategic Quarterly Goals - Q4 2021',
  },
];

export const documents = [
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rIBytIBHHSuH2PkAoTNeYMwLoj-thumb.png',
    FileDetails: {
      encoding: '7bit',
      contentType: 'application/pdf',
      fileName: 'SampleDocument1.pdf',
    },
    Document: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rIBytIBHHSuH2PkAoTNeYMwLoj.pdf',
    DetectedText: 'Sample Document 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus libero vel leo accumsan, sed fringilla odio scelerisque. Nulla quis leo commodo, blandit eros vel, elementum magna. Sed tristique eu lorem nec ullamcorper. Donec eu vehicula ligula, quis blandit nisl. Sed et rhoncus purus. Nam sed augue ut nibh ultrices tempor sed quis diam. Donec elementum nisi quis turpis congue rhoncus ac sit amet elit. Suspendisse pretium consequat dapibus. Etiam tincidunt justo in bibendum malesuada. Donec consequat pulvinar ipsum non feugiat. Quisque felis quam, auctor tristique nibh consectetur, pellentesque ultrices enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean feugiat, risus non accumsan commodo, leo urna fermentum nisi, in pulvinar ligula mauris id diam. Maecenas convallis porttitor tempor. Integer a ullamcorper ex. In venenatis urna quam, id semper mauris volutpat vitae. Integer ultrices sem nisl, a faucibus ipsum malesuada nec. Nunc consequat euismod orci, sit amet vehicula mauris efficitur nec. Aliquam a tincidunt ligula. Cras sit amet erat pretium, porttitor risus id, pharetra elit. Suspendisse molestie dolor in lorem dapibus, id dignissim sem tincidunt. Vestibulum urna lacus, venenatis volutpat vulputate in, fringilla feugiat diam. Vestibulum id tincidunt diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis lacus et diam tincidunt varius et in nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. Etiam placerat ex at magna volutpat, vitae ullamcorper tellus placerat. Integer gravida lacus nec tincidunt rhoncus. Maecenas egestas eros ac metus consequat tempor. Pellentesque sed nisl iaculis, pellentesque sapien at, dictum nunc. Sed cursus risus quis euismod suscipit. Nulla facilisi. Suspendisse egestas vel sapien vel finibus. Donec tempus ante hendrerit, posuere tellus dapibus, pharetra ipsum. Etiam euismod, dui vitae mattis suscipit, justo elit auctor mauris, quis efficitur mauris ligula eu mauris. Pellentesque ut porta lectus. Integer dictum sodales leo, in molestie ex ullamcorper nec. 1 Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. 2',
    Tags: [
      'marketing',
      'branding',
    ],
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    DateProcessed: '2021-04-17T10:09:31.658Z',
    FileSize: 52615,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:09:31.658Z',
    Metadata: {
      modifiedDate: '2021-04-17T09:41:31.000Z',
      pageCount: 2,
      createdDate: '2021-04-17T09:41:31.000Z',
      title: 'Document2',
      author: 'David Tucker',
    },
    PK: '1rIBytIBHHSuH2PkAoTNeYMwLoj',
    Name: 'Branding Overview',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rIC2B5RWsRAXqjLhUK83cOhyU0-thumb.png',
    FileDetails: {
      encoding: '7bit',
      contentType: 'application/pdf',
      fileName: 'SampleDocument2.pdf',
    },
    Document: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rIC2B5RWsRAXqjLhUK83cOhyU0.pdf',
    DetectedText: 'Sample Document 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus libero vel leo accumsan, sed fringilla odio scelerisque. Nulla quis leo commodo, blandit eros vel, elementum magna. Sed tristique eu lorem nec ullamcorper. Donec eu vehicula ligula, quis blandit nisl. Sed et rhoncus purus. Nam sed augue ut nibh ultrices tempor sed quis diam. Donec elementum nisi quis turpis congue rhoncus ac sit amet elit. Suspendisse pretium consequat dapibus. Etiam tincidunt justo in bibendum malesuada. Donec consequat pulvinar ipsum non feugiat. Quisque felis quam, auctor tristique nibh consectetur, pellentesque ultrices enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean feugiat, risus non accumsan commodo, leo urna fermentum nisi, in pulvinar ligula mauris id diam. Maecenas convallis porttitor tempor. Integer a ullamcorper ex. In venenatis urna quam, id semper mauris volutpat vitae. Integer ultrices sem nisl, a faucibus ipsum malesuada nec. Nunc consequat euismod orci, sit amet vehicula mauris efficitur nec. Aliquam a tincidunt ligula. Cras sit amet erat pretium, porttitor risus id, pharetra elit. Suspendisse molestie dolor in lorem dapibus, id dignissim sem tincidunt. Vestibulum urna lacus, venenatis volutpat vulputate in, fringilla feugiat diam. Vestibulum id tincidunt diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis lacus et diam tincidunt varius et in nibh. Habitant Senectus Turpis Egestas 1,004 502 110 403 Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. 1 Etiam placerat ex at magna volutpat, vitae ullamcorper tellus placerat. Integer gravida lacus nec tincidunt rhoncus. Maecenas egestas eros ac metus consequat tempor. Pellentesque sed nisl iaculis, pellentesque sapien at, dictum nunc. Sed cursus risus quis euismod suscipit. Nulla facilisi. Suspendisse egestas vel sapien vel finibus. Donec tempus ante hendrerit, posuere tellus dapibus, pharetra ipsum. Etiam euismod, dui vitae mattis suscipit, justo elit auctor mauris, quis efficitur mauris ligula eu mauris. Pellentesque ut porta lectus. Integer dictum sodales leo, in molestie ex ullamcorper nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. 2',
    Tags: [
      'communications',
      'quarterly report',
    ],
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    DateProcessed: '2021-04-17T10:09:56.057Z',
    FileSize: 2383972,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:09:56.057Z',
    Metadata: {
      modifiedDate: '2021-04-17T09:47:07.000Z',
      pageCount: 2,
      createdDate: '2021-04-17T09:47:07.000Z',
      title: 'Document2',
      author: 'David Tucker',
    },
    PK: '1rIC2B5RWsRAXqjLhUK83cOhyU0',
    Name: 'Quarterly Report',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rIC5ZKYTKRpYq8eNVPlq916tp7-thumb.png',
    FileDetails: {
      encoding: '7bit',
      contentType: 'application/pdf',
      fileName: 'SampleDocument3.pdf',
    },
    Document: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rIC5ZKYTKRpYq8eNVPlq916tp7.pdf',
    DetectedText: 'G LOBOMANTICS G Q Search LOBOMANTICS MANIACALLY TAKING TECH TO THE GLOBE Our story Brands Robotics Media Support Sign-in THE FUTURE FUTURE CONFERENCE WAS FIVE MINUTES AGO. SIGN UP TODAY We were there and itis going to be epic Tickets are selling get yours today there n the future DARK ENERGY ROBOTICS STRANGERS RISE BRIGHTENS THE WORLD THEY ARE HERE AND THEY PLAY ASCENSION GOES TECHNICAL Learn More Aenean feugiat, risus non accumsan commodo, leo urna fermentum nisi, in pulvinar ligula mauris id diam. Maecenas convallis porttitor tempor. Integer a ullamcorper ex. In venenatis urna quam, id semper mauris volutpat vitae. Integer ultrices sem nisl, a faucibus ipsum malesuada nec. Nunc consequat euismod orci, sit amet vehicula mauris efficitur nec. Aliquam a tincidunt ligula. Cras sit amet erat pretium, porttitor risus id, pharetra elit. Suspendisse molestie dolor in lorem dapibus, id dignissim sem tincidunt. Vestibulum urna lacus, venenatis volutpat vulputate in, fringilla feugiat diam. Vestibulum id tincidunt diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis lacus et diam tincidunt varius et in nibh. 1 Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. Etiam placerat ex at magna volutpat, vitae ullamcorper tellus placerat. Integer gravida lacus nec tincidunt rhoncus. Maecenas egestas eros ac metus consequat tempor. Pellentesque sed nisl iaculis, pellentesque sapien at, dictum nunc. Sed cursus risus quis euismod suscipit. Nulla facilisi. Suspendisse egestas vel sapien vel finibus. Donec tempus ante hendrerit, posuere tellus dapibus, pharetra ipsum. Etiam euismod, dui vitae mattis suscipit, justo elit auctor mauris, quis efficitur mauris ligula eu mauris. Pellentesque ut porta lectus. Integer dictum sodales leo, in molestie ex ullamcorper nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. 2',
    Tags: [
      'strategy',
    ],
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    DateProcessed: '2021-04-17T10:10:22.237Z',
    FileSize: 2755501,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:10:22.237Z',
    Metadata: {
      modifiedDate: '2021-04-17T09:50:01.000Z',
      pageCount: 2,
      createdDate: '2021-04-17T09:50:01.000Z',
      title: 'Document2',
      author: 'David Tucker',
    },
    PK: '1rIC5ZKYTKRpYq8eNVPlq916tp7',
    Name: 'Market Analysis Q2 2021',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rIC9K1QuKedADmBXFhKdGUbhgV-thumb.png',
    FileDetails: {
      encoding: '7bit',
      contentType: 'application/pdf',
      fileName: 'SampleDocument4.pdf',
    },
    Document: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rIC9K1QuKedADmBXFhKdGUbhgV.pdf',
    DetectedText: 'LOBOMANTICS Sample Document 4 Aenean feugiat, risus non accumsan commodo, leo urna fermentum nisi, in pulvinar ligula mauris id diam. Maecenas convallis porttitor tempor. Integer a ullamcorper ex. In venenatis urna quam, id semper mauris volutpat vitae. Integer ultrices sem nisl, a faucibus ipsum malesuada nec. Nunc consequat euismod orci, sit amet vehicula mauris efficitur nec. Aliquam a tincidunt ligula. Cras sit amet erat pretium, porttitor risus id, pharetra elit. Suspendisse molestie dolor in lorem dapibus, id dignissim sem tincidunt. Vestibulum urna lacus, venenatis volutpat vulputate in, fringilla feugiat diam. Vestibulum id tincidunt diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis lacus et diam tincidunt varius et in nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. Etiam placerat ex at magna volutpat, vitae ullamcorper tellus placerat. Integer gravida lacus nec tincidunt rhoncus. Maecenas egestas eros ac metus consequat tempor. Pellentesque sed nisl iaculis, pellentesque sapien at, dictum nunc. Sed cursus risus quis euismod suscipit. Nulla facilisi. Suspendisse egestas vel sapien vel finibus. Donec tempus ante hendrerit, posuere tellus dapibus, pharetra ipsum. Etiam euismod, dui vitae mattis suscipit, justo elit auctor mauris, quis efficitur mauris ligula eu mauris. Pellentesque ut porta lectus. Integer dictum sodales leo, in molestie ex ullamcorper nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula 1 mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. 2',
    Tags: [
      'marketing',
      'events',
    ],
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    DateProcessed: '2021-04-17T10:10:49.497Z',
    FileSize: 88395,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:10:49.497Z',
    Metadata: {
      modifiedDate: '2021-04-17T09:53:24.000Z',
      pageCount: 2,
      createdDate: '2021-04-17T09:53:24.000Z',
      title: 'Document2',
      author: 'David Tucker',
    },
    PK: '1rIC9K1QuKedADmBXFhKdGUbhgV',
    Name: 'Client Event Promo',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICEDFoRqkq4htElNOvlXvk5cX-thumb.png',
    FileDetails: {
      encoding: '7bit',
      contentType: 'application/pdf',
      fileName: 'SampleDocument5.pdf',
    },
    Document: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICEDFoRqkq4htElNOvlXvk5cX.pdf',
    DetectedText: 'LOBOMANTICS Sample Document 5 Aenean feugiat, risus non accumsan commodo, leo urna fermentum nisi, in pulvinar ligula mauris id diam. Maecenas convallis porttitor tempor. Integer a ullamcorper ex. In venenatis urna quam, id semper mauris volutpat vitae. Integer ultrices sem nisl, a faucibus ipsum malesuada nec. Nunc consequat euismod orci, sit amet vehicula mauris efficitur nec. Aliquam a tincidunt ligula. Cras sit amet erat pretium, porttitor risus id, pharetra elit. Suspendisse molestie dolor in lorem dapibus, id dignissim sem tincidunt. Vestibulum urna lacus, venenatis volutpat vulputate in, fringilla feugiat diam. Vestibulum id tincidunt diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis lacus et diam tincidunt varius et in nibh. 1 Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. Etiam placerat ex at magna volutpat, vitae ullamcorper tellus placerat. Integer gravida lacus nec tincidunt rhoncus. Maecenas egestas eros ac metus consequat tempor. Pellentesque sed nisl iaculis, pellentesque sapien at, dictum nunc. Sed cursus risus quis euismod suscipit. Nulla facilisi. Suspendisse egestas vel sapien vel finibus. Donec tempus ante hendrerit, posuere tellus dapibus, pharetra ipsum. Etiam euismod, dui vitae mattis suscipit, justo elit auctor mauris, quis efficitur mauris ligula eu mauris. Pellentesque ut porta lectus. Integer dictum sodales leo, in molestie ex ullamcorper nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. 2',
    Tags: [
      'marketing',
      'branding',
    ],
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    DateProcessed: '2021-04-17T10:11:29.578Z',
    FileSize: 1149843,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:11:29.578Z',
    Metadata: {
      modifiedDate: '2021-04-17T09:54:56.000Z',
      pageCount: 2,
      createdDate: '2021-04-17T09:54:56.000Z',
      title: 'Document2',
      author: 'David Tucker',
    },
    PK: '1rICEDFoRqkq4htElNOvlXvk5cX',
    Name: 'Rebrand Goals and Objectives',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICM50SzcfWtFPIN6cOG7BaxJR-thumb.png',
    FileDetails: {
      encoding: '7bit',
      contentType: 'application/pdf',
      fileName: 'SampleDocument6.pdf',
    },
    Document: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICM50SzcfWtFPIN6cOG7BaxJR.pdf',
    DetectedText: 'LOBOMANTICS Sample Document 6 Aenean feugiat, risus non accumsan commodo, leo urna fermentum nisi, in pulvinar ligula mauris id diam. Maecenas convallis porttitor tempor. Integer a ullamcorper ex. In venenatis urna quam, id semper mauris volutpat vitae. Integer ultrices sem nisl, a faucibus ipsum malesuada nec. Nunc consequat euismod orci, sit amet vehicula mauris efficitur nec. Aliquam a tincidunt ligula. Cras sit amet erat pretium, porttitor risus id, pharetra elit. Suspendisse molestie dolor in lorem dapibus, id dignissim sem tincidunt. Vestibulum urna lacus, venenatis volutpat vulputate in, fringilla feugiat diam. Vestibulum id tincidunt diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis lacus et diam tincidunt varius et in nibh. Pellentesque habitant morbi tristique senectus et netus et BLIS malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. Etiam placerat ex at magna volutpat, vitae ullamcorper tellus placerat. Integer gravida lacus nec tincidunt rhoncus. Maecenas egestas eros ac metus consequat tempor. Pellentesque sed nisl iaculis, pellentesque sapien at, dictum nunc. Sed cursus risus quis euismod suscipit. Nulla facilisi. Suspendisse egestas vel sapien vel finibus. Donec tempus ante hendrerit, posuere tellus dapibus, pharetra ipsum. Etiam euismod, dui vitae mattis suscipit, 1 justo elit auctor mauris, quis efficitur mauris ligula eu mauris. Pellentesque ut porta lectus. Integer dictum sodales leo, in molestie ex ullamcorper nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. 2',
    Tags: [
      'organization',
      'marketing',
    ],
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    DateProcessed: '2021-04-17T10:12:32.706Z',
    FileSize: 3345966,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:12:32.706Z',
    Metadata: {
      modifiedDate: '2021-04-17T09:58:25.000Z',
      pageCount: 2,
      createdDate: '2021-04-17T09:58:25.000Z',
      title: 'Document2',
      author: 'David Tucker',
    },
    PK: '1rICM50SzcfWtFPIN6cOG7BaxJR',
    Name: 'Marketing Org Chart - H1 2021',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICP1k59Xl4jazJcSObBnrxVQz-thumb.png',
    FileDetails: {
      encoding: '7bit',
      contentType: 'application/pdf',
      fileName: 'SampleDocument7.pdf',
    },
    Document: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICP1k59Xl4jazJcSObBnrxVQz.pdf',
    DetectedText: 'LOBOMANTICS Sample Document 7 Aenean feugiat, risus non accumsan commodo, leo urna fermentum nisi, in pulvinar ligula mauris id diam. Maecenas convallis porttitor tempor. Integer a ullamcorper ex. In venenatis urna quam, id semper mauris volutpat vitae. Integer ultrices sem nisl, a faucibus ipsum malesuada nec. Nunc consequat euismod orci, sit amet vehicula mauris efficitur nec. Aliquam a tincidunt ligula. Cras sit amet erat pretium, porttitor risus id, pharetra elit. Suspendisse molestie dolor in lorem dapibus, id dignissim sem tincidunt. Vestibulum urna lacus, venenatis volutpat vulputate in, fringilla feugiat diam. Vestibulum id tincidunt diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis lacus et diam tincidunt varius et in nibh. G Q Search LOBOMANTICS MANIACALLY TAKING TECH TO THE GLOBE O Our story Brands Robotics Media Support Sign-in ROBOTICS ALSO A STORY OF LIFE Life evolves, robotics are no different. Building on existing research and working closely with the defense department and other defense industry partners, we are a proud to announce a new breakthrough that represents a massive leap forward in artificial intelligence and advanced robotics. This elegant combination technologies will revolutionize the human condition, changing everything from the way we protect our countries and police our people to how you clean your home. No longer do the countries of the world have to settle disputes with needless expenditure of human life. Now wars can be fought and won by value of your Globomantics Mark upgrade selections. More than any other time in history, wars will be won by the willingness to spend rather than the strength of will of the individual. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. 1 Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. Etiam placerat ex at magna volutpat, vitae ullamcorper tellus placerat. Integer gravida lacus nec tincidunt rhoncus. Maecenas egestas eros ac metus consequat tempor. Pellentesque sed nisl iaculis, pellentesque sapien at, dictum nunc. Sed cursus risus quis euismod suscipit. Nulla facilisi. Suspendisse egestas vel sapien vel finibus. Donec tempus ante hendrerit, posuere tellus dapibus, pharetra ipsum. Etiam euismod, dui vitae mattis suscipit, justo elit auctor mauris, quis efficitur mauris ligula eu mauris. Pellentesque ut porta lectus. Integer dictum sodales leo, in molestie ex ullamcorper nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. 2',
    Tags: [
      'marketing',
      'website',
    ],
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    DateProcessed: '2021-04-17T10:12:55.058Z',
    FileSize: 2056211,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:12:55.058Z',
    Metadata: {
      modifiedDate: '2021-04-17T09:59:29.000Z',
      pageCount: 2,
      createdDate: '2021-04-17T09:59:29.000Z',
      title: 'Document2',
      author: 'David Tucker',
    },
    PK: '1rICP1k59Xl4jazJcSObBnrxVQz',
    Name: 'Updated Website Copy Feedback',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICSi6kfRPEXKmfkwxa2HPPRst-thumb.png',
    FileDetails: {
      encoding: '7bit',
      contentType: 'application/pdf',
      fileName: 'SampleDocument8.pdf',
    },
    Document: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICSi6kfRPEXKmfkwxa2HPPRst.pdf',
    DetectedText: 'LOBOMANTICS Sample Document 8 Aenean feugiat, risus non accumsan commodo, leo urna fermentum nisi, in pulvinar ligula mauris id diam. Maecenas convallis porttitor tempor. Integer a ullamcorper ex. In venenatis urna quam, id semper mauris volutpat vitae. Integer ultrices sem nisl, a faucibus ipsum malesuada nec. Nunc consequat euismod orci, sit amet vehicula mauris efficitur nec. Aliquam a tincidunt ligula. Cras sit amet erat pretium, porttitor risus id, pharetra elit. Suspendisse molestie dolor in lorem dapibus, id dignissim sem tincidunt. Vestibulum urna lacus, venenatis volutpat vulputate in, fringilla feugiat diam. Vestibulum id tincidunt diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis lacus et diam tincidunt varius et in nibh. G LOBOMANTICS Q Search MANIACALLY TAKING TECH TO THE GLOBE O Our story Brands Robotics Media Support Sign-in WATCH THIS VIDEO WE DO THINGS IN IT Click for inspiration at cosmic levels Sic Transit Gloria Mundi At the deepest level of its core, technology embodies the circle of life. And from an old age Larry Shepard unlearned how to harness that circle and perpetuate it through more technology. need more copy here. At the deepest level of its core, technology embodies the circle of life. And from an old age Larry Shepard unlearned how to harness that circle and perpetuate it through more technology. At the deepest level of its core, technology embodies the circle of life. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula 1 mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. Etiam placerat ex at magna volutpat, vitae ullamcorper tellus placerat. Integer gravida lacus nec tincidunt rhoncus. Maecenas egestas eros ac metus consequat tempor. Pellentesque sed nisl iaculis, pellentesque sapien at, dictum nunc. Sed cursus risus quis euismod suscipit. Nulla facilisi. Suspendisse egestas vel sapien vel finibus. Donec tempus ante hendrerit, posuere tellus dapibus, pharetra ipsum. Etiam euismod, dui vitae mattis suscipit, justo elit auctor mauris, quis efficitur mauris ligula eu mauris. Pellentesque ut porta lectus. Integer dictum sodales leo, in molestie ex ullamcorper nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. 2',
    Tags: [
      'marketing',
      'hr',
    ],
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    DateProcessed: '2021-04-17T10:13:24.898Z',
    FileSize: 1794186,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:13:24.898Z',
    Metadata: {
      modifiedDate: '2021-04-17T10:00:34.000Z',
      pageCount: 2,
      createdDate: '2021-04-17T10:00:34.000Z',
      title: 'Document2',
      author: 'David Tucker',
    },
    PK: '1rICSi6kfRPEXKmfkwxa2HPPRst',
    Name: 'Director of Marketing - Job Description',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICYSIwx6SBVVwY42PQWdx18Sr-thumb.png',
    FileDetails: {
      encoding: '7bit',
      contentType: 'application/pdf',
      fileName: 'SampleDocument9.pdf',
    },
    Document: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICYSIwx6SBVVwY42PQWdx18Sr.pdf',
    DetectedText: 'LOBOMANTICS Sample Document 9 Aenean feugiat, risus non accumsan commodo, leo urna fermentum nisi, in pulvinar ligula mauris id diam. Maecenas convallis porttitor tempor. Integer a ullamcorper ex. In venenatis urna quam, id semper mauris volutpat vitae. Integer ultrices sem nisl, a faucibus ipsum malesuada nec. Nunc consequat euismod orci, sit amet vehicula mauris efficitur nec. Aliquam a tincidunt ligula. Cras sit amet erat pretium, porttitor risus id, pharetra elit. Suspendisse molestie dolor in lorem dapibus, id dignissim sem tincidunt. Vestibulum urna lacus, venenatis volutpat vulputate in, fringilla feugiat diam. Vestibulum id tincidunt diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis lacus et diam tincidunt varius et in nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. Etiam placerat ex at magna volutpat, vitae ullamcorper tellus placerat. Integer gravida lacus nec tincidunt rhoncus. Maecenas egestas eros ac metus consequat tempor. Pellentesque sed nisl iaculis, pellentesque sapien at, dictum nunc. Sed cursus risus quis euismod suscipit. Nulla facilisi. Suspendisse egestas vel sapien vel finibus. Donec tempus ante hendrerit, posuere tellus dapibus, pharetra ipsum. Etiam euismod, dui vitae mattis suscipit, justo elit auctor mauris, quis efficitur mauris ligula eu mauris. Pellentesque ut porta lectus. Integer dictum sodales leo, in molestie ex ullamcorper nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec 1 fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. 2',
    Tags: [
      'marketing',
      'partner network',
    ],
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    DateProcessed: '2021-04-17T10:14:08.642Z',
    FileSize: 88493,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:14:08.642Z',
    Metadata: {
      modifiedDate: '2021-04-17T10:01:11.000Z',
      pageCount: 2,
      createdDate: '2021-04-17T10:01:11.000Z',
      title: 'Document2',
      author: 'David Tucker',
    },
    PK: '1rICYSIwx6SBVVwY42PQWdx18Sr',
    Name: 'Partner Network Marketing Proposal',
  },
  {
    Thumbnail: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICd5Y9dlPEQlVcxCgBSs1v0Zz-thumb.png',
    FileDetails: {
      encoding: '7bit',
      contentType: 'application/pdf',
      fileName: 'SampleDocument10.pdf',
    },
    Document: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/1rICd5Y9dlPEQlVcxCgBSs1v0Zz.pdf',
    DetectedText: 'C Sample Document 10 Aenean feugiat, risus non accumsan commodo, leo urna fermentum nisi, in pulvinar ligula mauris id diam. Maecenas convallis porttitor tempor. Integer a ullamcorper ex. In venenatis urna quam, id semper mauris volutpat vitae. Integer ultrices sem nisl, a faucibus ipsum malesuada nec. Nunc consequat euismod orci, sit amet vehicula mauris efficitur nec. Aliquam a tincidunt ligula. Cras sit amet erat pretium, porttitor risus id, pharetra elit. Suspendisse molestie dolor in lorem dapibus, id dignissim sem tincidunt. Vestibulum urna lacus, venenatis volutpat vulputate in, fringilla feugiat diam. Vestibulum id tincidunt diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis lacus et diam tincidunt varius et in nibh. 1 Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. Etiam placerat ex at magna volutpat, vitae ullamcorper tellus placerat. Integer gravida lacus nec tincidunt rhoncus. Maecenas egestas eros ac metus consequat tempor. Pellentesque sed nisl iaculis, pellentesque sapien at, dictum nunc. Sed cursus risus quis euismod suscipit. Nulla facilisi. Suspendisse egestas vel sapien vel finibus. Donec tempus ante hendrerit, posuere tellus dapibus, pharetra ipsum. Etiam euismod, dui vitae mattis suscipit, justo elit auctor mauris, quis efficitur mauris ligula eu mauris. Pellentesque ut porta lectus. Integer dictum sodales leo, in molestie ex ullamcorper nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem est, mollis hendrerit suscipit quis, sodales quis odio. Pellentesque aliquam et leo id tincidunt. Curabitur vel ipsum ac massa tristique sollicitudin id quis turpis. Aenean et est nisi. Praesent tellus metus, varius non felis viverra, interdum consequat nisl. In quis ligula lectus. Nullam varius mi at magna dapibus faucibus. Praesent et auctor augue. Sed aliquet vehicula mauris ac hendrerit. Nunc facilisis dictum ante, at commodo enim sollicitudin nec. Donec fermentum felis velit, sit amet ultricies nunc cursus vulputate. Fusce viverra, augue a congue sodales, purus felis dictum nisl, nec commodo orci metus ut nunc. Etiam tempor pulvinar urna eget luctus. Curabitur augue lorem, vulputate sed est quis, vehicula egestas lectus. Integer sit amet tempus mauris, quis consectetur lectus. Curabitur id semper risus. Sed quis purus eget lectus malesuada euismod. Ut eleifend mauris metus, quis scelerisque odio tempus nec. Vivamus a fermentum ex, nec posuere ligula. Praesent porta purus quis massa lobortis viverra. Sed lobortis elit ac nisl ultricies placerat. Suspendisse ex tortor, eleifend in nisl eu, ultrices finibus lorem. Nunc tempus elementum mi, et blandit elit tincidunt in. Sed commodo ornare nulla vestibulum luctus. 2',
    Tags: [
      'marketing',
      'strategy',
      'Q4-2021',
    ],
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    DateProcessed: '2021-04-17T10:14:46.811Z',
    FileSize: 1753479,
    SK: 'Doc#Marketing',
    DateUploaded: '2021-04-17T10:14:46.811Z',
    Metadata: {
      modifiedDate: '2021-04-17T10:02:41.000Z',
      pageCount: 2,
      createdDate: '2021-04-17T10:02:41.000Z',
      title: 'Document2',
      author: 'David Tucker',
    },
    PK: '1rICd5Y9dlPEQlVcxCgBSs1v0Zz',
    Name: 'Strategic Quarterly Goals - Q4 2021',
  },
];

// Users -----------------------------------------------------------------

export const profile = {
  userId: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
  dateCreated: '2021-04-06T01:55:47.773Z',
  name: 'David Tucker',
  email: 'david@globomantics.com',
  picture: 'profile/david.jpg',
  pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/david.jpg',
};

export const profiles = [
  {
    userId: '9963149f-d388-4370-860a-b2f7fa1593d3',
    name: 'Jane Williams',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/jane.jpg',
  },
  {
    userId: '9d0c650c-283c-4a66-8b23-445a46d35fb3',
    name: 'Simon Carlson',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/simon.jpg',
  },
  {
    userId: 'b5bfd373-c7a9-4040-9192-fb608a5e2725',
    name: 'Lacy Masterson',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/lacy.jpg',
  },
  {
    userId: 'efd11193-3440-409d-aeb3-a5991e28e3ef',
    name: 'Danny Earl',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/danny.jpg',
  },
  {
    userId: '4a0018fb-ac89-4359-aaf8-0b654e9af330',
    name: 'Solomon Cousins',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/solomon.jpg',
  },
  {
    userId: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    name: 'David Tucker',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/david.jpg',
  },
  {
    userId: '1a30ab9c-a1a4-43a2-99b7-0249c83890ad',
    name: 'Esther Gonzales',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/esther.jpg',
  },
];

export const allUsers = [
  {
    userId: '9963149f-d388-4370-860a-b2f7fa1593d3',
    name: 'Jane Williams',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/jane.jpg',
    dateCreated: '2021-04-13T12:03:00.005Z',
    group: 'reader',
    email: 'jane@globomantics.com',
  },
  {
    userId: '9d0c650c-283c-4a66-8b23-445a46d35fb3',
    name: 'Simon Carlson',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/simon.jpg',
    dateCreated: '2021-04-01T13:45:00.005Z',
    group: 'reader',
    email: 'simon@globomantics.com',
  },
  {
    userId: 'b5bfd373-c7a9-4040-9192-fb608a5e2725',
    name: 'Lacy Masterson',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/lacy.jpg',
    dateCreated: '2021-04-03T01:30:00.005Z',
    group: 'contributor',
    email: 'lacy@globomantics.com',
  },
  {
    userId: 'efd11193-3440-409d-aeb3-a5991e28e3ef',
    name: 'Danny Earl',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/danny.jpg',
    dateCreated: '2021-04-10T11:54:00.005Z',
    group: 'contributor',
    email: 'danny@globomantics.com',
  },
  {
    userId: '4a0018fb-ac89-4359-aaf8-0b654e9af330',
    name: 'Solomon Cousins',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/solomon.jpg',
    dateCreated: '2021-04-01T17:03:00.005Z',
    group: 'contributor',
    email: 'solomon@globomantics.com',
  },
  {
    userId: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
    name: 'David Tucker',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/david.jpg',
    dateCreated: '2021-04-13T19:32:00.005Z',
    group: 'admin',
    email: 'david@globomantics.com',
  },
  {
    userId: '1a30ab9c-a1a4-43a2-99b7-0249c83890ad',
    name: 'Esther Gonzales',
    pictureURL: 'https://serverless-path-assets.s3.us-east-2.amazonaws.com/profile/esther.jpg',
    dateCreated: '2021-04-12T20:21:00.005Z',
    group: 'admin',
    email: 'esther@globomantics.com',
  },
];

// Comments --------------------------------------------------------------

const comments = {};

const fakeComments = (documentId) => [
  {
    Comment: 'Have you followed up with legal on this one? It needs a review.',
    DateAdded: '2021-04-18T10:54:43.217Z',
    SK: 'Comment#1rL6zLz8U5wz6H8emruAP1e45V4',
    PK: `${documentId}`,
    Owner: '1a30ab9c-a1a4-43a2-99b7-0249c83890ad',
  },
  {
    Comment: 'This fits what we discussed.  I may add a few additional notes from our last meeting.',
    DateAdded: '2021-04-18T10:51:43.217Z',
    SK: 'Comment#1rL6zLz8U5wz6H8emruAP1e45V6',
    PK: `${documentId}`,
    Owner: '4a0018fb-ac89-4359-aaf8-0b654e9af330',
  },
];

export const getCommentsForDocument = (id) => {
  if (!comments[id]) {
    comments[id] = fakeComments(id);
  }
  return comments[id];
};

export const createComment = (id, content) => {
  const newComment = {
    Comment: content,
    DateAdded: new Date().toISOString(),
    SK: `Comment#${new Date().getTime()}`,
    PK: id,
    Owner: 'fc4cec10-6ae4-435c-98ca-6964382fee77',
  };
  if (!comments[id]) {
    comments[id] = fakeComments(id);
  }
  comments[id].push(newComment);
  return newComment;
};
