function ReadFile(req: Blob) {
  return new Promise((resolve) => {
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      resolve(fileReader.result);
    };

    fileReader.readAsDataURL(req);
  });
}

export default ReadFile;
