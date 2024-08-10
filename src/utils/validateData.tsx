// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function validateData(results: any) {
  console.log(results);

  const errors: string[] = [];
  const headers = results[0];
  const expectedHeaders = [
    "id",
    "links",
    "prefix",
    "select tags",
    "selected tags",
  ];

  // Validate headers
  if (JSON.stringify(headers) !== JSON.stringify(expectedHeaders)) {
    console.log(JSON.stringify(headers), JSON.stringify(expectedHeaders));
    errors.push("CSV headers do not match the expected format");
  }

  // Validate each row
  for (let i = 1; i < results.length; i++) {
    const row = results[i];
    console.log(row);

    // Check if row has correct number of columns
    if (row.length !== 5) {
      errors.push(`Row ${i}: Incorrect number of columns`);
      continue;
    }

    // Validate id
    if (!/^\d+$/.test(row[0])) {
      errors.push(`Row ${i}: Invalid id (should be a number)`);
    }

    // Validate links (basic URL validation)
    if (!/^(https?:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/.test(row[1])) {
      errors.push(`Row ${i}: Invalid domain in links column`);
    }

    // Validate prefix (alphanumeric)
    if (!/^[a-zA-Z0-9]+$/.test(row[2])) {
      errors.push(`Row ${i}: Invalid prefix (should be alphanumeric)`);
    }

    // Validate select tags
    const validTags = [
      "Technology",
      "Fashion",
      "Food",
      "Travel",
      "Sports",
      "Music",
      "Art",
      "Health",
      "Education",
      "Finance",
    ];
    const selectTags = row[3].split(", ");
    if (!selectTags.every((tag: string) => validTags.includes(tag))) {
      errors.push(`Row ${i}: Invalid tags in select tags column`);
    }

    // Validate selected tags (if not empty)
    if (row[4] !== "") {
      const selectedTags = row[4].split(", ");
      if (!selectedTags.every((tag: string) => selectTags.includes(tag))) {
        errors.push(`Row ${i}: Selected tags not present in select tags`);
      }
    }
  }

  return errors;
}
