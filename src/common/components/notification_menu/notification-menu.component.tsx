import { isEmpty } from 'lodash';
import React, { useMemo, useState } from 'react';
import { Badge, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { TextLink } from '../../styles';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { selectAllChatRoom, useGetUnreadChatQuery } from '@/modules/communication/services';
import { Color } from '@/theme.ts';
import NotificationItems from '@/common/components/notification_menu/notification-items.component.tsx';
import { ReactComponent as EnvelopIcon } from '@/assets/notification/envelop.svg';
import { ReactComponent as ActiveEnvelopIcon } from '@/assets/notification/active-envelop.svg';

const NotificaionMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { user, selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const rooms = useAppSelector(selectAllChatRoom);
  const unReadCount = useMemo(() => rooms.filter((r) => r.__unreadCount && r.__unreadCount > 0).length, [rooms]);
  useGetUnreadChatQuery(
    {
      params: {
        populate: [
          {
            path: '__latestMessage',
            populate: [
              {
                path: '__representative',
                populate: '__logo',
              },
              {
                path: '__sender',
                populate: '__logo',
              },
            ],
          },
          { path: '__representativeEntities', populate: '__logo' },
        ],
      },
    },
    { skip: !selectedEntity?.uid || true },
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isEmpty(user)) {
      setAnchorEl(event.currentTarget);
      // setInboxCount(inboxCount - 1);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Badge
        badgeContent={unReadCount}
        max={99}
        overlap='circular'
        sx={{
          '& .MuiBadge-badge': {
            fontSize: '8px',
            fontWeight: 700,
            lineHeight: '8px',
            height: '10px',
            minWidth: '12px',
            padding: '1px 4px',
            borderRadius: '2px',
            background: Color.priRed,
            top: '25%',
            right: '25%',
          },
        }}
      >
        <IconButton onClick={handleClick} sx={{ position: 'relative' }}>
          {unReadCount > 0 ? <ActiveEnvelopIcon /> : <EnvelopIcon />}
        </IconButton>
      </Badge>
      <Menu
        id='notification-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '400px',
            padding: '15px 0 0 0',
            borderRadius: 10,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: { pb: 0 },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <NotificationItems />
        <MenuItem sx={{ display: 'block', textAlign: 'center', py: '16px' }} onClick={() => navigate('/chat')}>
          <TextLink sx={{ fontWeight: 700, letterSpacing: '-0.56px' }} underline='none'>
            View all in inbox {rooms && rooms?.length >= 1 ? (rooms?.length > 99 ? '99+' : rooms?.length) : 0}
          </TextLink>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NotificaionMenu;
