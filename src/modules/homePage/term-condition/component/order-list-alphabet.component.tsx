import { isUndefined } from 'lodash';
import React, { ComponentProps } from 'react';
import { ListItemAlphabet, OrderListAlphabet } from '../styles/ol-li-styles';

type ListAlphabetOrderProps = {
  data?: string[];
  object?: string;
} & ComponentProps<typeof OrderListAlphabet>;

const ListAlphabetOrder = ({ data, object, ...props }: ListAlphabetOrderProps) => {
  return (
    <OrderListAlphabet {...props}>
      {!isUndefined(data) ? (
        data.map((item: string, index: number) => (
          <ListItemAlphabet data-left=' ( ' data-right=' ) ' key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))
      ) : (
        <ListItemAlphabet
          dangerouslySetInnerHTML={{
            __html: object ?? '',
          }}
        />
      )}
    </OrderListAlphabet>
  );
};

export default ListAlphabetOrder;
