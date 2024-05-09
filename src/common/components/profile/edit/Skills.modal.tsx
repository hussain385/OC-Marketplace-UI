import React, { useCallback, useEffect } from 'react';
import Modal from '@/common/components/modal.component.tsx';
import {
  Autocomplete,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  createFilterOptions,
  TextField,
  Typography,
} from '@mui/material';
import { Color } from '@/theme.ts';
import { useGetSkillsQuery, useLazyGetSkillsQuery, useSetSkillMutation } from '@/modules/servi-profile/service/profile.api';
import { IoClose } from 'react-icons/io5';
import { useDebounce, useSetState } from 'react-use';
import { produce } from 'immer';
import { IQueryGlobal } from '@/common/interface';
import { useAppSelector } from '@/redux/hooks.tsx';
import { useGetEntityInfoQuery } from '@/redux/apis/marketplace.ts';

const createFilter = createFilterOptions<string>();

interface ISkillsModal {
  isOpen: boolean;
  onClose: () => void;
  entityId?: string;
}

function SkillsModal({ isOpen, onClose, entityId }: ISkillsModal) {
  const selectedEntityUid = useAppSelector((state) => state.mainState.useInfo.selectedEntity?.uid);
  const { data: entitySkills } = useGetEntityInfoQuery(
    { entityId: entityId ?? selectedEntityUid ?? '' },
    { skip: !entityId && !selectedEntityUid, selectFromResult: (a) => ({ ...a, data: a.data?.data.skills }) },
  );

  /**
   * Get skills for popular suggestion
   */
  const { data } = useGetSkillsQuery({
    limit: 10,
    options: { sort: { popularity_points: 'desc' } },
    filter: (entitySkills?.length ?? 0) > 0 ? `name||$notin||${entitySkills}` : undefined,
  });

  /**
   * Set skills mutation
   */
  const [SetSkills, { isLoading: isSetLoading }] = useSetSkillMutation();

  /**
   * For States
   */
  const [{ isSuggest, search, skills }, setState] = useSetState({
    isSuggest: true,
    search: '',
    skills: entitySkills ?? [],
  });

  /**
   * Search skills
   */
  const [SearchSkills, { data: searchSkills, isFetching: isSearchLoading }] = useLazyGetSkillsQuery();

  /**
   * Debounce search api to limit fetching
   */
  useDebounce(
    () => {
      const params: IQueryGlobal = {
        limit: 10,
        options: { sort: { popularity_points: 'desc' } },
      };

      const searchParam = {
        $and: [] as Record<string, any>[],
      };

      if (skills.length > 0) {
        searchParam.$and.push({ name: { $notin: skills } });
      }

      if (search) {
        searchParam.$and.push({ name: { $contL: search } });
      }

      params.s = JSON.stringify(searchParam);

      SearchSkills(params);
    },
    400,
    [search],
  );

  /**
   * Reset suggestion on close
   */
  useEffect(() => {
    if (!isOpen) {
      setState({ isSuggest: true });
    }
  }, [setState, isOpen]);

  /**
   * Re-sync skills
   */
  useEffect(() => {
    setState({ skills: entitySkills ?? [] });
  }, [entitySkills, setState]);

  /**
   * On setting the skills
   */
  const onSetSkills = useCallback(() => {
    SetSkills({ skills, entityId }).unwrap().then(onClose);
  }, [SetSkills, entityId, onClose, skills]);

  return (
    <Modal
      dialogSx={{
        '& .MuiPaper-root': {
          maxWidth: '616px',
        },
      }}
      isOpen={isOpen}
      onCancel={onClose}
      noBtnDisplay
      extraFooter={
        <>
          <Box />
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <ButtonBase onClick={onClose} sx={{ fontWeight: 600, color: Color.textGray2 }}>
              Cancel
            </ButtonBase>
            <Button
              disabled={isSetLoading}
              variant={'outlined'}
              sx={{
                color: Color.priBlue,
                borderColor: `${Color.priBlue} !important`,
                textTransform: 'none',
              }}
              onClick={onSetSkills}
            >
              Set
            </Button>
          </Box>
        </>
      }
      content={
        <Box>
          <Autocomplete
            multiple
            options={searchSkills?.data.map((s) => s.name) ?? []}
            filterOptions={(options, state) => {
              const filtered = createFilter(options, state);

              const { inputValue } = state;

              const isExisting = options.some((option) => inputValue === option);
              if (!isSearchLoading && inputValue !== '' && !isExisting) {
                filtered.push(`Add "${inputValue}"`);
              }

              return filtered;
            }}
            // getOptionLabel={(option) => option.name}
            value={skills}
            onChange={(_, value) => setState({ skills: value.map((e) => e.replace('Add "', '').replace('"', '')) })}
            loading={isSearchLoading}
            renderTags={(value, getTagProps, ownerState) =>
              value.map((s, index) => (
                // eslint-disable-next-line react/jsx-key
                <Box
                  sx={{
                    padding: '4px 9px',
                    borderRadius: '100px',
                    backgroundColor: '#EFEFF0',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                  {...getTagProps({ index })}
                >
                  <Typography sx={{ fontWeight: 500 }}>{s}</Typography>
                  <ButtonBase onClick={getTagProps({ index }).onDelete}>
                    <IoClose color={'#4A4A4A'} />
                  </ButtonBase>
                </Box>
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  height: 'auto',
                  '& fieldset': {
                    top: 0,
                    border: '1px solid #EAEAEA !important',
                    '& legend': { display: 'none' },
                  },
                  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid rgba(0, 0, 0, 0.87)!important',
                  },
                }}
                onChange={(event) => {
                  setState({ search: event.target.value });
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isSearchLoading ? (
                        <Box sx={{ color: Color.priBlue }}>
                          <CircularProgress color={'inherit'} size={20} />
                        </Box>
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          {isSuggest && (
            <Box
              sx={{
                backgroundColor: '#F9FAFD',
                boxShadow: '0px 4.443px 11.849px 0px rgba(0, 0, 0, 0.15)',
                borderRadius: '6px',
                padding: '34px',
                position: 'relative',
                mt: '20px',
                mb: '24px',
              }}
            >
              <ButtonBase
                sx={{ position: 'absolute', top: '10px', right: '10px' }}
                onClick={() => setState({ isSuggest: false })}
              >
                <IoClose color={'#7E7E7E'} size={25} />
              </ButtonBase>
              <Typography sx={{ mb: '26px', fontWeight: 700 }}>Suggested based on popular terms</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {data?.data
                  .filter((s) => !skills.some((e) => e === s.name))
                  .map((s) => (
                    <Box
                      key={s.id}
                      sx={{
                        padding: '6px 14px',
                        border: '1px solid #000',
                        borderRadius: '15px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setState(
                          produce((args) => {
                            const index = args.skills.findIndex((e: string) => e === s.name);
                            if (index === -1) {
                              args.skills.push(s.name);
                            }
                          }),
                        );
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, color: '#646465', fontSize: '15px' }}>{s.name}</Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          )}
        </Box>
      }
    />
  );
}

export default SkillsModal;
