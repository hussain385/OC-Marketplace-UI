import React from 'react';
import { useNavigate } from '@/router';
import { useMediaBreakpoint } from '@/common/components';

const NavBarLogoComponent = () => {
  const { xs, sm } = useMediaBreakpoint();
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', width: '50%', cursor: 'pointer' }}>
      <img
        alt=''
        src={require('@/assets/logos/new_logo.svg').default}
        style={{ width: !xs && !sm ? '9em' : '7.5em', height: !xs && !sm ? '6em' : '3.5em' }}
      />
    </div>
  );
};

export default NavBarLogoComponent;
