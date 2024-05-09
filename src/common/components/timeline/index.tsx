import classNames from 'classnames/bind';
import { Box, SxProps } from '@mui/material';
import React from 'react';
import {
  TimelineContainer,
  TimelineConnecter,
  TimelineContent,
  TimelineContentLeft,
  TimelineDot,
  TimelineItemRow,
  TimelineSeparator,
} from './timeline.style';
import { FaCheck } from 'react-icons/fa6';
import { Text14, Text18 } from '@/common/styles';
import { Color } from '@/theme';

export type TimelineProps = {
  contentLeft?: {
    date?: string;
    htmlContent?: React.ReactNode;
  };
  contentRight?: {
    text?: string;
    htmlContent?: React.ReactNode;
  };
  marker?: {
    label?: string | number;
    dotIcon?: React.ReactNode | React.ReactElement | string;
    customCss?: SxProps;
  };
  status: 'active' | 'done' | undefined;
  connector?: {
    style?: 'solid' | 'dotted';
    customCss?: SxProps;
    hide?: boolean;
  };
};

interface Props {
  timelines: TimelineProps[];
  containerStyle?: SxProps;
}

const Timeline = ({ timelines, containerStyle }: Props) => {
  const showMarkerContent = (timeline: TimelineProps) => {
    if (timeline.marker && ((timeline.marker.label && !timeline.status) || timeline.status === 'active')) {
      return timeline.marker!.label;
    } else if (timeline.marker?.dotIcon && timeline.status === 'done') {
      return timeline.marker?.dotIcon;
    } else if (!timeline.marker?.dotIcon && timeline.status === 'done') {
      return <FaCheck size={16} color='white' />;
    }
  };
  return (
    <Box sx={{ py: 4, px: 4, ...containerStyle }} className='timeline-main'>
      <TimelineContainer className='timeline-container'>
        {timelines.length > 0
          ? timelines.map((timeline, index) => {
              const klass = classNames({
                dotted: timeline.connector?.style === 'dotted',
                done: timeline.status === 'done',
                active: timeline.status === 'active',
              });
              return (
                <TimelineItemRow key={index}>
                  <TimelineContentLeft>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Text14 sx={{ color: Color.textGray }}>{timeline.contentLeft?.date}</Text14>
                      {timeline.contentLeft?.htmlContent}
                    </Box>
                  </TimelineContentLeft>
                  <TimelineSeparator>
                    <TimelineDot className={timeline.status} sx={{ ...timeline.marker?.customCss }}>
                      {showMarkerContent(timeline)}
                    </TimelineDot>
                    {!timeline.connector?.hide ? <TimelineConnecter className={klass}></TimelineConnecter> : null}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                      <Text18>{timeline.contentRight?.text}</Text18>
                      {timeline.contentRight?.htmlContent}
                    </Box>
                  </TimelineContent>
                </TimelineItemRow>
              );
            })
          : 'No timeline'}
      </TimelineContainer>
    </Box>
  );
};
export default Timeline;
