import React, { useEffect, useState } from 'react';
import { subText } from '@/modules/seller/manage-listing/manage-listing-form/overview.view';
import { Controller, FieldErrorsImpl } from 'react-hook-form';
import { Avatar, Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { Color } from '@/theme';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { isEmpty, startCase } from 'lodash';
import { AvatarLabel } from '@/common/styles';
import { useGetFunctionalEmployeeQuery } from '@/redux/apis/teamManagementApi';
import { ILogo } from '@/common/interface';
import { mediaUrlGenerator } from '@/common/utils';

type componentProps = {
  errors: Partial<FieldErrorsImpl<any>>;
  control: any;
};

const RepresentativeSelectionDisplay = ({ image, name }: { image?: string; name?: string }) => (
  <div style={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}>
    {!isEmpty(image) ? (
      <Avatar src={image} style={{ width: '1.3em', height: '1.3em', border: '1px solid #EEEEEE' }} />
    ) : (
      <Avatar style={{ width: '1.3em', height: '1.3em', border: '1px solid #EEEEEE', backgroundColor: Color.priBlue }}>
        <AvatarLabel sx={{ fontSize: '12px' }}>{name ? startCase(name[0]) : 'N/A'}</AvatarLabel>
      </Avatar>
    )}
    <Typography sx={{ fontWeight: '400', fontSize: '14px' }}>{name}</Typography>
  </div>
);

const RepresentativePersonComponent = ({ errors, control }: componentProps) => {
  const [teamMembers, setTeamMembers] = useState<{ id: string; name: string; image: string }[]>([]);
  const [searchMembers, setSearchMembers] = useState<string>('');
  const { data: getListInvitationRequest, isLoading }: any = useGetFunctionalEmployeeQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (getListInvitationRequest?.data) {
      const entityMembers = getListInvitationRequest?.data
        .filter((request: { status: string }) => request.status === 'Accepted')
        .map(
          (member: {
            id: string;
            name: string;
            user: { id: string };
            individualProfile: { detail: { logo: ILogo | null } };
          }) => ({
            id: member.user.id,
            name: member.name,
            image: mediaUrlGenerator(member?.individualProfile?.detail?.logo ?? ''),
          }),
        );
      setTeamMembers(entityMembers);
    }
  }, [getListInvitationRequest?.data]);

  useEffect(() => {
    if (isEmpty(searchMembers)) {
      if (getListInvitationRequest?.data) {
        const entityMembers = getListInvitationRequest?.data
          .filter((request: { status: string }) => request.status === 'Accepted')
          .map(
            (member: {
              id: string;
              name: string;
              user: { id: string };
              individualProfile: { detail: { logo: ILogo | null } };
            }) => ({
              id: member.user.id,
              name: member.name,
              image: mediaUrlGenerator(member?.individualProfile?.detail?.logo ?? ''),
            }),
          );
        setTeamMembers(entityMembers);
      }
    } else {
      setTeamMembers((prevState) =>
        prevState.filter((member) => member.name.toLowerCase().includes(searchMembers.toLowerCase())),
      );
    }
  }, [searchMembers]);

  return (
    <Box sx={{ marginTop: '1em' }}>
      <Typography className='subHeading'>Representative person</Typography>
      <Typography sx={subText}>Select a representative to receive messages for this service</Typography>
      <Controller
        name={'supporterId'}
        control={control}
        render={({ field }) => {
          return (
            <FormControl sx={{ mt: 1, minWidth: 120 }} size='small'>
              <Select
                value={isEmpty(field.value) ? [] : [field.value]}
                label='supporterId'
                error={!!errors.supporterId}
                onChange={(e) => field.onChange(e.target.value[e.target.value.length - 1])}
                multiple
                IconComponent={MdKeyboardArrowDown}
                renderValue={() => {
                  if (
                    teamMembers.find((value) => value.id === field.value) &&
                    !isEmpty(teamMembers.find((value) => value.id === field.value))
                  ) {
                    field.onChange(teamMembers.find((value) => value.id === field.value)?.id);
                    return (
                      <RepresentativeSelectionDisplay
                        name={teamMembers.find((value) => value.id === field.value)?.name ?? ''}
                        image={teamMembers.find((value) => value.id === field.value)?.image ?? ''}
                      />
                    );
                  }

                  return <em>Select</em>;
                }}
                sx={{
                  border: errors.supporterId && errors.supporterId?.message ? `1px solid ${Color.negative}` : '1px solid #eaeaea',
                  width: '20em',
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                }}
              >
                <input
                  style={{
                    border: 'none',
                    paddingInline: '1em',
                    height: '3em',
                    borderBottom: '1px solid #eaeaea',
                    marginBottom: '5px',
                    marginTop: '-5px',
                    width: '20em',
                    outline: 'none',
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                  placeholder={'search team members'}
                  value={searchMembers}
                  onChange={(e) => {
                    setSearchMembers(e.target.value);
                    field.onChange('');
                  }}
                />
                {isLoading ? (
                  <MenuItem value={''}>
                    <em>Loading list...</em>
                  </MenuItem>
                ) : (
                  teamMembers.map((member, key) => (
                    <MenuItem
                      key={key}
                      value={member.id}
                      style={{
                        height: '2.4em',
                        display: 'flex',
                        justifyContent: 'space-between',
                        opacity: 'inherit',
                        backgroundColor: field.value === member.id ? '#E2EFFF' : '#fff',
                        borderRadius: '3px',
                        margin: '3px',
                      }}
                    >
                      <RepresentativeSelectionDisplay name={member.name} image={member.image} />
                      {field.value === member.id && (
                        <div style={{ color: '#2752E7', marginTop: '-3px' }}>
                          <FaCheck />
                        </div>
                      )}
                    </MenuItem>
                  ))
                )}
                {isEmpty(teamMembers) && !isLoading && (
                  <MenuItem value={''}>
                    <em>Nothing available...</em>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          );
        }}
      />
      {Boolean(errors.supporterId?.message) && (
        <Typography className='errorMessage'>{errors.supporterId?.message as never}</Typography>
      )}
    </Box>
  );
};

export default RepresentativePersonComponent;
