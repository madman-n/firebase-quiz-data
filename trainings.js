const admin = require("firebase-admin");
const fs = require("fs-extra");
const yaml = require("yamljs");

admin.initializeApp({
  credential: admin.credential.cert(require("./credentials.json")),
});
const db = admin.firestore();

const trainings = [
  "mett-benchmark",
];

const update = async (trainingId) => {
  const json = yaml.load(`trainings/${trainingId}.yaml`);

  console.log(JSON.stringify(json));

  const ref = db.collection("trainings").doc(trainingId);

  await ref.set(json, { merge: true });

  console.log("DONE");
};

for (const training of trainings) {
  update(training);
}
