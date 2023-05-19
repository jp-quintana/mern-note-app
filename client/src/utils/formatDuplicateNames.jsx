function formatDuplicateName(name, existingNames) {
  let newName = name;
  let counter = 0;

  while (existingNames.includes(newName)) {
    if (counter > 0) {
      newName = `${name} (${counter})`;
    }

    counter++;
  }

  return newName;
}

export default formatDuplicateName;
