const Account = require('../../src/models/Account');
const Course = require('../../src/models/Course');

const ReviewService = require('../../src/services/ReviewService');
const StubDatabase = require('../../src/database/StubDatabase')
const {writeCourseData, writeAccountData} = require('../../src/database/WriteDummyData');

const accountRepository = require('../../src/repositories/accountRepository');
const courseRepository = require('../../src/repositories/courseRepository');

// test cases for Review business logic.

test("Test successful review post (account and course both exist)", async () => {
  StubDatabase.init();
  await writeCourseData();
  await writeAccountData();

  const key = await accountRepository.getKeyFromUsername('calebwj');
  const exit = await ReviewService.postReview(key, 'EECS2311', 2, 5, "blah blah blah description here");
  expect(exit).toBe(0);
  
  
  const accountInstance = Account.getInstance(key, await accountRepository.readAccount(key));
  const courseInstance = Course.getInstance('EECS2311', await courseRepository.readCourse('EECS2311'));

  expect(accountInstance.reviewList.length).toBe(1);
  expect(accountInstance.reviewList[0]).toBe(1); //1 is the first review ID generated(they are in numerical order)

  expect(courseInstance.reviewList.length).toBe(1);
  expect(courseInstance.reviewList[0]).toBe(1);
})

test("Test bad review post (poster does not exist)", async () => {
  StubDatabase.init();
  await writeCourseData();
  await writeAccountData();

  const exit = await ReviewService.postReview('badKey', 'EECS2311', 2, 5, "blah blah blah description here");
  expect(exit).toBe(2);
  
  const courseInstance = Course.getInstance('EECS2311', await courseRepository.readCourse('EECS2311'));
  expect(courseInstance.reviewList.length).toBe(0);
  expect(courseInstance.reviewList[0]).toBe(undefined);
})

test("Test bad review post (course does not exist)", async () => {
  StubDatabase.init();
  await writeCourseData();
  await writeAccountData();

  const key = await accountRepository.getKeyFromUsername('calebwj');
  const exit = await ReviewService.postReview(key, 'FAKECOURSE', 2, 5, "blah blah blah description here");
  expect(exit).toBe(1);
  
  
  const accountInstance = Account.getInstance(key, await accountRepository.readAccount(key));

  expect(accountInstance.reviewList.length).toBe(0);
  expect(accountInstance.reviewList[0]).toBe(undefined);
})

