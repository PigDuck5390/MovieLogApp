export function unwrapFirestoreValue(v) {
  if (v == null) return null;

  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return Number(v.doubleValue);
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;

  if ("mapValue" in v) {
    const obj = {};
    const fields = v.mapValue.fields || {};
    for (const [k, vv] of Object.entries(fields)) obj[k] = unwrapFirestoreValue(vv);
    return obj;
  }

  if ("arrayValue" in v) {
    const arr = v.arrayValue.values || [];
    return arr.map(unwrapFirestoreValue);
  }

  if ("timestampValue" in v) return v.timestampValue;
  return v;
}

export function firestoreDocumentsToArray(json) {
  const docs = json.documents || [];
  return docs.map((doc) => {
    const fields = doc.fields || {};
    const obj = {};
    for (const [k, v] of Object.entries(fields)) obj[k] = unwrapFirestoreValue(v);
    obj._docId = doc.name.split("/").pop();
    return obj;
  });
}
