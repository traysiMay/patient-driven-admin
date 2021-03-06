import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

export default function Surveys({ doc }) {
  useFirestoreConnect({
    collection: "patients",
    doc,
    subcollections: [{ collection: "surveys" }],
    storeAs: `surveys-${doc}`,
  });
  const surveys = useSelector(
    (state) => state.firestore.ordered[`surveys-${doc}`]
  );
  console.log(surveys);
  if (!surveys) return <div>loading</div>;
  if (surveys.length === 0) return <div>no surveys</div>;
  return (
    <div>
      {surveys.map((s) => (
        <div key={s.id} style={{ color: s.completed ? "green" : "red" }}>
          {s.id}
        </div>
      ))}
    </div>
  );
}
