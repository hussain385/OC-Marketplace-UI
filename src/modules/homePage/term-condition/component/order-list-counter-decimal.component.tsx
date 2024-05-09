import { SxProps } from '@mui/material';
import { isUndefined } from 'lodash';
import React, { ComponentProps } from 'react';
import {
  OrderListDecimalCounterOutSide,
  OrderListDecimalCounterInside,
  ListItemDecimalOutside,
  ListItemDecimalInside,
} from '../styles/ol-li-styles';

type ListDecimalCounterOrderProps = {
  data?: string[];
  object?: string;
  counter?: string;
  customListStyles?: React.CSSProperties | SxProps;
} & ComponentProps<typeof OrderListDecimalCounterOutSide>;

const ListDecimalCounterOrder = ({ object, data, counter, customListStyles, ...props }: ListDecimalCounterOrderProps) => {
  return (
    <OrderListDecimalCounterOutSide {...props}>
      {isUndefined(object) && <ListItemDecimalOutside></ListItemDecimalOutside>}
      {!isUndefined(data) && (
        <OrderListDecimalCounterInside>
          {data.map((item: string, index: number) => (
            <ListItemDecimalInside
              data-counter={counter}
              sx={customListStyles}
              key={index}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </OrderListDecimalCounterInside>
      )}
      {!isUndefined(object) && (
        <ListItemDecimalOutside data-counter={counter} sx={customListStyles}>
          {object}
        </ListItemDecimalOutside>
      )}
    </OrderListDecimalCounterOutSide>
  );
};

export default ListDecimalCounterOrder;
