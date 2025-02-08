const Account = require('../../src/models/Account');

// this file contains test cases exclusively for Account instance method. This means NO database communication 
// or communication with other models, as these are done through the database.

// #region - instantiation tests
test("Create a fresh Account Instance.", () => {
  const acc = new Account(
    "matthew",
    "matthew@hotmail.com",
    "123pass"
  );

  expect(acc.username).toBe("matthew");
  expect(acc.password).toBe("123pass");
  expect(acc.email).toBe("matthew@hotmail.com");

  // should be empty, as they were not specified in instantiation.
  expect(acc.coursePreferenceMap).toStrictEqual({});
  expect(acc.friendsList).toStrictEqual([]);
  expect(acc.requestList).toStrictEqual([]);
  expect(acc.reviewList).toStrictEqual([]);
})


test("Create a fresh Account, get it's key-value pair database entry.", () => {
  const acc = new Account(
    "calebwj",
    "calebwj@gmail.com",
    "caleb123"
  );

  const {key, value} = Account.getKeyValue(acc);

  expect(key).toBe('calebwj|calebwj@gmail.com');
  expect(key).toBe(`${acc.username}|${acc.email}`);
  
  expect(value.password).toBe('caleb123');
  expect(value.password).toBe(acc.password);

  // should be empty, as they were not specified in instantiation.
  expect(value.coursePrefs).toStrictEqual({});
  expect(value.friends).toStrictEqual([]);
  expect(value.requests).toStrictEqual([]);
  expect(value.reviews).toStrictEqual([]);
})


test("Given the key-value format of an account, convert it into an account instance.", () => {
  const key = 'IAmKunle|kunle@yorku.ca';
  const value = {
    password: 'nigeria123',
    coursePrefs: {},
    friends: [],
    requests: [],
    reviews: [],
  };

  const acc = Account.getInstance(key, value);
  
  expect(acc.username).toBe('IAmKunle');
  expect(acc.password).toBe('nigeria123');
  expect(acc.password).toBe(value.password);
  expect(acc.email).toBe('kunle@yorku.ca');

  expect(acc.coursePreferenceMap).toStrictEqual({});
  expect(acc.friendsList).toStrictEqual([]);
  expect(acc.requestList).toStrictEqual([]);
  expect(acc.reviewList).toStrictEqual([]);

}) 

// #endregion

// #region - adjusting friends list tests
test("Add friends to an Account instance. No duplicate handling on this layer." , () => {
  const acc = new Account (
    "calebwj",
    "calebcaleb@yorku.ca",
    "caleb123"
  );
  expect(acc.friendsList.length).toBe(0);
  expect(acc.friendsList).toStrictEqual([]);

  acc.addFriend('kunle');
  expect(acc.friendsList.length).toBe(1)
  expect(acc.friendsList[0]).toBe('kunle');
  expect(acc.friendsList).toStrictEqual(['kunle']);

  acc.addFriend('zayn');
  expect(acc.friendsList.length).toBe(2)
  expect(acc.friendsList[1]).toBe('zayn');
  expect(acc.friendsList).toStrictEqual(['kunle','zayn']);

  acc.addFriend('mateo');
  expect(acc.friendsList.length).toBe(3)
  expect(acc.friendsList[2]).toBe('mateo');
  expect(acc.friendsList).toStrictEqual(['kunle','zayn','mateo']);
});

test("Add friends to an Account instance, ensure changes reflect in key-value pair", () => {
  const acc = new Account (
    "calebwj",
    "calebcaleb@yorku.ca",
    "caleb123"
  );
  var value = Account.getKeyValue(acc).value;
  expect(value.friends.length).toBe(0);
  expect(value.friends).toStrictEqual([]);

  acc.addFriend('kunle');
  value = Account.getKeyValue(acc).value;
  expect(value.friends.length).toBe(1)
  expect(value.friends[0]).toBe('kunle');
  expect(value.friends).toStrictEqual(['kunle']);

  acc.addFriend('zayn');
  value = Account.getKeyValue(acc).value;
  expect(value.friends.length).toBe(2)
  expect(value.friends[1]).toBe('zayn');
  expect(value.friends).toStrictEqual(['kunle','zayn']);

  acc.addFriend('mateo');
  value = Account.getKeyValue(acc).value;
  expect(value.friends.length).toBe(3)
  expect(value.friends[2]).toBe('mateo');
  expect(value.friends).toStrictEqual(['kunle','zayn','mateo']);
});

test("Add and remove friends from an Account instance." , () => {
  const acc = new Account (
    "calebwj",
    "calebcaleb@yorku.ca",
    "caleb123"
  );

  acc.addFriend('kunle');
  acc.addFriend('zayn');

  acc.removeFriend('kunle');
  expect(acc.friendsList.length).toBe(1);
  expect(acc.friendsList).toStrictEqual(['zayn']);
  
  acc.addFriend('mateo');
  acc.addFriend('ahmet');
  expect(acc.friendsList.length).toBe(3);
  expect(acc.friendsList).toStrictEqual(['zayn','mateo','ahmet']);

  acc.removeFriend('ahmet');
  expect(acc.friendsList.length).toBe(2);
  expect(acc.friendsList).toStrictEqual(['zayn','mateo']);
  
  acc.removeFriend('zayn');
  expect(acc.friendsList.length).toBe(1);
  expect(acc.friendsList).toStrictEqual(['mateo']);
  
  acc.removeFriend('mateo');
  expect(acc.friendsList.length).toBe(0);
  expect(acc.friendsList).toStrictEqual([]);

  //remove friend that doesnt exist
  acc.removeFriend('aman');
  expect(acc.friendsList.length).toBe(0);
  expect(acc.friendsList).toStrictEqual([]);
});

test("Add and remove friends from an Account instance, ensure changes reflect in key-value pair" , () => {
  const acc = new Account (
    "calebwj",
    "calebcaleb@yorku.ca",
    "caleb123"
  );

  acc.addFriend('kunle');
  acc.addFriend('zayn');

  acc.removeFriend('kunle');
  value = Account.getKeyValue(acc).value;
  expect(value.friends.length).toBe(1);
  expect(value.friends).toStrictEqual(['zayn']);
  
  acc.addFriend('mateo');
  acc.addFriend('ahmet');
  value = Account.getKeyValue(acc).value;
  expect(value.friends.length).toBe(3);
  expect(value.friends).toStrictEqual(['zayn','mateo','ahmet']);

  acc.removeFriend('ahmet');
  value = Account.getKeyValue(acc).value;
  expect(value.friends.length).toBe(2);
  expect(value.friends).toStrictEqual(['zayn','mateo']);
  
  acc.removeFriend('zayn');
  value = Account.getKeyValue(acc).value;
  expect(value.friends.length).toBe(1);
  expect(value.friends).toStrictEqual(['mateo']);
  
  acc.removeFriend('mateo');
  value = Account.getKeyValue(acc).value;
  expect(value.friends.length).toBe(0);
  expect(value.friends).toStrictEqual([]);

  //remove friend that doesnt exist
  acc.removeFriend('aman');
  value = Account.getKeyValue(acc).value;
  expect(value.friends.length).toBe(0);
  expect(value.friends).toStrictEqual([]);
});

// #endregion

// #region - adjusting request list tests
test("Add requests to an Account instance. No duplicate handling on this layer." , () => {
  const acc = new Account (
    "calebwj",
    "calebcaleb@yorku.ca",
    "caleb123"
  );
  expect(acc.requestList.length).toBe(0);
  expect(acc.requestList).toStrictEqual([]);

  acc.addRequest('kunle');
  expect(acc.requestList.length).toBe(1)
  expect(acc.requestList[0]).toBe('kunle');
  expect(acc.requestList).toStrictEqual(['kunle']);

  acc.addRequest('zayn');
  expect(acc.requestList.length).toBe(2)
  expect(acc.requestList[1]).toBe('zayn');
  expect(acc.requestList).toStrictEqual(['kunle','zayn']);

  acc.addRequest('mateo');
  expect(acc.requestList.length).toBe(3)
  expect(acc.requestList[2]).toBe('mateo');
  expect(acc.requestList).toStrictEqual(['kunle','zayn','mateo']);
});

test("Add requests to an Account instance, ensure changes reflect in key-value pair", () => {
  const acc = new Account (
    "calebwj",
    "calebcaleb@yorku.ca",
    "caleb123"
  );
  var value = Account.getKeyValue(acc).value;
  expect(value.requests.length).toBe(0);
  expect(value.requests).toStrictEqual([]);

  acc.addRequest('kunle');
  value = Account.getKeyValue(acc).value;
  expect(value.requests.length).toBe(1)
  expect(value.requests[0]).toBe('kunle');
  expect(value.requests).toStrictEqual(['kunle']);

  acc.addRequest('zayn');
  value = Account.getKeyValue(acc).value;
  expect(value.requests.length).toBe(2)
  expect(value.requests[1]).toBe('zayn');
  expect(value.requests).toStrictEqual(['kunle','zayn']);

  acc.addRequest('mateo');
  value = Account.getKeyValue(acc).value;
  expect(value.requests.length).toBe(3)
  expect(value.requests[2]).toBe('mateo');
  expect(value.requests).toStrictEqual(['kunle','zayn','mateo']);
});

test("Add and remove requests from an Account instance." , () => {
  const acc = new Account (
    "calebwj",
    "calebcaleb@yorku.ca",
    "caleb123"
  );

  acc.addRequest('kunle');
  acc.addRequest('zayn');

  acc.removeRequest('kunle');
  expect(acc.requestList.length).toBe(1);
  expect(acc.requestList).toStrictEqual(['zayn']);
  
  acc.addRequest('mateo');
  acc.addRequest('ahmet');
  expect(acc.requestList.length).toBe(3);
  expect(acc.requestList).toStrictEqual(['zayn','mateo','ahmet']);

  acc.removeRequest('ahmet');
  expect(acc.requestList.length).toBe(2);
  expect(acc.requestList).toStrictEqual(['zayn','mateo']);
  
  acc.removeRequest('zayn');
  expect(acc.requestList.length).toBe(1);
  expect(acc.requestList).toStrictEqual(['mateo']);
  
  acc.removeRequest('mateo');
  expect(acc.requestList.length).toBe(0);
  expect(acc.requestList).toStrictEqual([]);

  //remove friend that doesnt exist
  acc.removeRequest('aman');
  expect(acc.requestList.length).toBe(0);
  expect(acc.requestList).toStrictEqual([]);
});

test("Add and remove requests from an Account instance, ensure changes reflect in key-value pair" , () => {
  const acc = new Account (
    "calebwj",
    "calebcaleb@yorku.ca",
    "caleb123"
  );

  acc.addRequest('kunle');
  acc.addRequest('zayn');

  acc.removeRequest('kunle');
  value = Account.getKeyValue(acc).value;
  expect(value.requests.length).toBe(1);
  expect(value.requests).toStrictEqual(['zayn']);
  
  acc.addRequest('mateo');
  acc.addRequest('ahmet');
  value = Account.getKeyValue(acc).value;
  expect(value.requests.length).toBe(3);
  expect(value.requests).toStrictEqual(['zayn','mateo','ahmet']);

  acc.removeRequest('ahmet');
  value = Account.getKeyValue(acc).value;
  expect(value.requests.length).toBe(2);
  expect(value.requests).toStrictEqual(['zayn','mateo']);
  
  acc.removeRequest('zayn');
  value = Account.getKeyValue(acc).value;
  expect(value.requests.length).toBe(1);
  expect(value.requests).toStrictEqual(['mateo']);
  
  acc.removeRequest('mateo');
  value = Account.getKeyValue(acc).value;
  expect(value.requests.length).toBe(0);
  expect(value.requests).toStrictEqual([]);

  //remove friend that doesnt exist
  acc.removeRequest('aman');
  value = Account.getKeyValue(acc).value;
  expect(value.requests.length).toBe(0);
  expect(value.requests).toStrictEqual([]);
});
//#endregion

// #region - adjusting review list tests
test("Add reviews to an Account instance. No duplicate handling on this layer." , () => {
  const acc = new Account (
    "calebwj",
    "calebcaleb@yorku.ca",
    "caleb123"
  );
  expect(acc.reviewList.length).toBe(0);
  expect(acc.reviewList).toStrictEqual([]);

  acc.addReview(12345);
  expect(acc.reviewList.length).toBe(1)
  expect(acc.reviewList[0]).toBe(12345);
  expect(acc.reviewList).toStrictEqual([12345]);

  acc.addReview(21110);
  expect(acc.reviewList.length).toBe(2)
  expect(acc.reviewList[1]).toBe(21110);
  expect(acc.reviewList).toStrictEqual([12345, 21110]);

  acc.addReview(64532);
  expect(acc.reviewList.length).toBe(3)
  expect(acc.reviewList[2]).toBe(64532);
  expect(acc.reviewList).toStrictEqual([12345, 21110,64532]);
});

test("Add reviews to an Account instance, ensure changes reflect in key-value pair", () => {
  const acc = new Account (
    "calebwj",
    "calebcaleb@yorku.ca",
    "caleb123"
  );
  var value = Account.getKeyValue(acc).value;
  expect(value.reviews.length).toBe(0);
  expect(value.reviews).toStrictEqual([]);

  acc.addReview(12345);
  value = Account.getKeyValue(acc).value;
  expect(value.reviews.length).toBe(1)
  expect(value.reviews[0]).toBe(12345);
  expect(value.reviews).toStrictEqual([12345]);

  acc.addReview(21110);
  value = Account.getKeyValue(acc).value;
  expect(value.reviews.length).toBe(2)
  expect(value.reviews[1]).toBe(21110);
  expect(value.reviews).toStrictEqual([12345,21110]);

  acc.addReview(64532);
  value = Account.getKeyValue(acc).value;
  expect(value.reviews.length).toBe(3)
  expect(value.reviews[2]).toBe(64532);
  expect(value.reviews).toStrictEqual([12345,21110,64532]);
});

test("Add and remove reviews from an Account instance." , () => {
  const acc = new Account (
    "calebwj",
    "calebcaleb@yorku.ca",
    "caleb123"
  );

  acc.addReview(12345);
  acc.addReview(21110);

  acc.removeReview(12345);
  expect(acc.reviewList.length).toBe(1);
  expect(acc.reviewList).toStrictEqual([21110]);
  
  acc.addReview(64532);
  acc.addReview(31523);
  expect(acc.reviewList.length).toBe(3);
  expect(acc.reviewList).toStrictEqual([21110,64532,31523]);

  acc.removeReview(31523);
  expect(acc.reviewList.length).toBe(2);
  expect(acc.reviewList).toStrictEqual([21110,64532]);
  
  acc.removeReview(21110);
  expect(acc.reviewList.length).toBe(1);
  expect(acc.reviewList).toStrictEqual([64532]);
  
  acc.removeReview(64532);
  expect(acc.reviewList.length).toBe(0);
  expect(acc.reviewList).toStrictEqual([]);

  //remove friend that doesnt exist
  acc.removeReview(55555);
  expect(acc.reviewList.length).toBe(0);
  expect(acc.reviewList).toStrictEqual([]);
});

test("Add and remove reviews from an Account instance, ensure changes reflect in key-value pair" , () => {
  const acc = new Account (
    "calebwj",
    "calebcaleb@yorku.ca",
    "caleb123"
  );

  acc.addReview(12345);
  acc.addReview(21110);

  acc.removeReview(12345);
  value = Account.getKeyValue(acc).value;
  expect(value.reviews.length).toBe(1);
  expect(value.reviews).toStrictEqual([21110]);
  
  acc.addReview(64532);
  acc.addReview(31523);
  value = Account.getKeyValue(acc).value;
  expect(value.reviews.length).toBe(3);
  expect(value.reviews).toStrictEqual([21110,64532,31523]);

  acc.removeReview(31523);
  value = Account.getKeyValue(acc).value;
  expect(value.reviews.length).toBe(2);
  expect(value.reviews).toStrictEqual([21110,64532]);
  
  acc.removeReview(21110);
  value = Account.getKeyValue(acc).value;
  expect(value.reviews.length).toBe(1);
  expect(value.reviews).toStrictEqual([64532]);
  
  acc.removeReview(64532);
  value = Account.getKeyValue(acc).value;
  expect(value.reviews.length).toBe(0);
  expect(value.reviews).toStrictEqual([]);

  //remove friend that doesnt exist
  acc.removeReview(55555);
  value = Account.getKeyValue(acc).value;
  expect(value.reviews.length).toBe(0);
  expect(value.reviews).toStrictEqual([]);
});

//#endregion

