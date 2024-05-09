import React, { useEffect } from 'react';
import { isNull } from 'lodash';

type componentProps = {
  textRef: any;
  displayText: any;
  style?: React.CSSProperties;
};

const PointerDisplayComponent = ({ textRef, displayText, style }: componentProps) => {
  useEffect(() => {
    if (!isNull(textRef)) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      (textRef as any).current.style.height = '0px';
      const scrollHeight = (textRef as any).current.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      (textRef as any).current.style.height = scrollHeight + 'px';
    }
  }, [textRef, displayText]);
  return (
    <textarea
      ref={textRef}
      disabled
      style={{
        border: 'none',
        resize: 'none',
        outline: 'none',
        color: '#000',
        width: '100%',
        backgroundColor: 'white',
        ...style,
      }}
      value={displayText}
    />
  );
};

export default PointerDisplayComponent;
