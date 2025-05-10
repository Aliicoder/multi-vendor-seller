export default (values: any) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    const value = values[key];

    if (Array.isArray(value)) {
      value.forEach((file) => {
        if (file instanceof File) {
          formData.append(key, file);
        } else {
          formData.append(key, String(file));
        }
      });
    } else if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  console.log("FormData Contents:");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  return formData;
};
