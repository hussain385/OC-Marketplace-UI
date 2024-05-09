import React, { ComponentProps } from 'react';
import { TextContentStyle, TextContentBold } from '../styles/text.component.styles';
import { isUndefined } from 'lodash';

type TextContentProps = {
  item: string | React.ReactNode;
  bold?: boolean;
} & ComponentProps<typeof TextContentStyle>;

const TextContent = ({ item, bold, ...props }: TextContentProps) => {
  return (
    <>{isUndefined(bold) ? <TextContentStyle {...props}>{item}</TextContentStyle> : <TextContentBold>{item}</TextContentBold>}</>
  );
};

export default TextContent;
