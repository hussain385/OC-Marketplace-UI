import { Box } from '@mui/material';

import React from 'react';

import RenderIf from '../../common/components/render-if.component';

import BackLayout from './back.layout';

import DialogImagePreview from '@/modules/communication/components/image-preview';

import { useClick } from '../utils/global_state.util';

import useMediaBreakpoint from '../../common/components/breakpoint';

import NavBar from '@/common/components/navbar';

type Props = {
  children?: React.ReactNode;
};

const CommunicationLayout: React.FC<Props> = ({ children }) => {
  const { xs } = useMediaBreakpoint();

  const [clicked, setClick] = useClick();

  const backHandler = () => {
    setClick(!clicked);
  };

  return (
    <Box
      className='communication-layout'
      sx={{ display: 'flex', height: '100%', minHeight: '100%', width: '100%', flexDirection: 'column' }}
    >
      <RenderIf value={clicked && xs}>
        <BackLayout backHandler={backHandler} />
      </RenderIf>
      <NavBar />
      <Box
        className='wrapper-main'
        sx={{
          width: '100%',
          height: 'calc(100% - 70px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {children}
      </Box>
      {<DialogImagePreview />}
    </Box>
  );
};
export default CommunicationLayout;
