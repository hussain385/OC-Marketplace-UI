import { isUndefined } from 'lodash';
import React, { ComponentProps } from 'react';
import { OrderListCounter, ListItemCounter } from '../styles/ol-li-styles';
import TextContent from './text.component';

type ListCounterOrderProps = {
  data?: string[] | React.ReactNode[];
  object?: string | React.ReactNode;
  nested?: string | React.ReactNode;
  extraText?: string[] | React.ReactNode[];
} & ComponentProps<typeof OrderListCounter>;

const ListCounterOrder = ({ data, object, nested, extraText, ...props }: ListCounterOrderProps) => {
  return (
    <OrderListCounter {...props}>
      {!isUndefined(nested) && <ListItemCounter>{nested}</ListItemCounter>}
      {!isUndefined(extraText) &&
        extraText.map((item: string | React.ReactNode, index: number) => <TextContent key={index} item={item} />)}
      {!isUndefined(data) ? (
        data.map((item: string | React.ReactNode, index: number) => <ListItemCounter key={index}>{item}</ListItemCounter>)
      ) : (
        <ListItemCounter>{object ?? ''}</ListItemCounter>
      )}
    </OrderListCounter>
  );
};

export default ListCounterOrder;
