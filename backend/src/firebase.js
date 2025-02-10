var admin = require("firebase-admin");
var serviceAccount = require("./yorku-scheduler-firebase-adminsdk-fbsvc-b71daa9446.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Get Firestore reference


//given a course's name and an array storing it's sections, upload this to the database.
const addCourse = async (coursename, sections) => {
  const docRef = db.collection('courses').doc(coursename);
  await docRef.set({
    sections: sections
 });
  console.log('Document written');
};

const addUser = async (username, password, courses) => {
  const docRef = db.collection('accounts').doc(username);
  await docRef.set({
    password: password,
    courses: courses
 });
  console.log('Document written');
};

// const getDocument = async (collectionName, docId) => {
//   try {
//     const docRef = db.collection(collectionName).doc(docId);
//     const doc = await docRef.get();
//     if (doc.exists) {
//       console.log('Document data:', doc.data());
//     } else {
//       console.log('No such document!');
//     }
//   } catch (error) {
//     console.error('Error getting document:', error);
//   }
// };

module.exports = { addCourse };


