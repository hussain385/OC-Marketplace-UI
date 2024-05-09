import { useState } from 'react';

interface IDoc {
  default?: 'NATIONAL' | 'PASSPORT' | 'NONE';
}

function useDocumentType(props: IDoc | void) {
  const [documentType, setDocumentType] = useState<string>(props?.default ?? 'NATIONAL');
  return { documentType, setDocumentType };
}

export default useDocumentType;
