const admin = require("firebase-admin");
const fs = require("fs-extra");
const yaml = require("yamljs");

admin.initializeApp({
  credential: admin.credential.cert(require("./credentials.json")),
});
const db = admin.firestore();

const courses = [
  "mett"
];

const update = async (id) => {
  const json = yaml.load(`courses/${id}.yaml`);

  console.log(JSON.stringify(json));

  const ref = db.collection("courses").doc(id);

  await ref.set(json, { merge: true });

  console.log("DONE");
};

for (const course of courses) {
  update(course);
}
