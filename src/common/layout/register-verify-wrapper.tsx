import React from 'react';

import { Box } from '@mui/material';

import BackgroundBoxWrapper from '../components/background-box.wrapper';

type Props = {
  children: React.ReactNode;
  styleOveride?: React.CSSProperties;
};

const UserRegisterVerifyWrapper = ({ children, styleOveride }: Props) => {
  // const [open, setOpen] = useGlobalCountryOpen();
  //
  // const [focus, setFocus] = useGlobalFocus();
  // const {setSearchValInput, setSearch} = useSearchManagerforCountry();

  // const onLeaveHandler = React.useCallback(() => {
  //   window.addEventListener('keydown', (e) => {
  //     if (e.code === 'Escape') {
  //       if (open) {
  //         setOpen(false);
  //         setSearchValInput('');
  //         setSearch([]);
  //       }
  //     }
  //   });
  //
  //   if (open === true && focus === false) {
  //     setOpen(false);
  //
  //     setFocus(true);
  //     setSearchValInput('');
  //     setSearch([]);
  //   }
  // }, [setOpen, setSearchValInput, open]);

  return (
    <BackgroundBoxWrapper>
      <Box
        sx={(theme) => ({
          width: { xs: '92%', sm: '100%', md: '100%' },
          margin: '0 auto',
          height: { xs: '100vh', sm: '100vh', md: '89vh' },
          paddingTop: { xs: '20px', sm: '0', md: '0' },

          [theme.breakpoints.down(321)]: {
            paddingTop: '100px',
          },
          ...styleOveride,
        })}
      >
        {children}
      </Box>

      {/* <Box sx={{ height: '6vh', minHeight: '6vh', background: Color.priWhite }}>
        <LoginFooter customStyle={{ background: Color.priWhite }} />
      </Box> */}
    </BackgroundBoxWrapper>
  );
};

export default UserRegisterVerifyWrapper;
