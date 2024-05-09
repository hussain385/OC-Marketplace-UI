function renameUpload(
  renameFile: unknown,
  newName: string,
  uploadName: unknown,
  type: string | undefined,
  lastModified: number | undefined,
) {
  return new File([renameFile] as File[], `${newName}-${uploadName as string}`, { type, lastModified });
}

function renameUploadFileWithRef(
  renameFile: unknown,
  newName: string,
  uid: string,
  uploadName: unknown,
  type: string | undefined,
  lastModified: number | undefined,
) {
  return new File([renameFile] as File[], `${newName}@-${uid}${uploadName as string}`, { type, lastModified });
}

function validSize(file: number) {
  if (Number(file) > 5) {
    return true;
  }
  return false;
}

export { renameUpload, renameUploadFileWithRef, validSize };
