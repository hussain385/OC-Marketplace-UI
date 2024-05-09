/* eslint-disable no-unused-vars */
// import { styled } from '@mui/system';
import React, { useCallback, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/system';
import { createGlobalState } from 'react-use';
import { isEmpty } from 'lodash';
import { Color } from '../../../theme';

const Code = styled.input`
  width: 64px;
  height: 64px;
  font-size: 30px;
  text-align: center;
  outline: none;
  color: #7e7e7e;
  border: 1px solid #eaeaea;
  &:focus {
    background: none;
    -webkit-apperance: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  &:disabled {
    border: 1px solid #eaeaea;
    background: transparent;
  }
`;

const MuiCodeBox = muiStyled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '16px',
  marginTop: '1em',
  [theme.breakpoints.up('xs')]: {
    gap: '10px',
  },
}));

type Props = {
  isError: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export const CodeNumber = createGlobalState<string>('');

const SeparatedInput = ({ isError, setError }: Props) => {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [input3, setInput3] = useState<string>('');
  const [input4, setInput4] = useState<string>('');

  const [inputField, setInputField] = CodeNumber();

  const inputRef = useRef<HTMLDivElement | HTMLInputElement>(null);

  const keyUpInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 1) {
      return false;
    } else {
      if (inputRef) {
        const inp = inputRef.current?.children ?? ('' as any);

        const arr = [0, 1, 2, 3];

        arr.map((a, i) => {
          if (inp[0].value.length === 1) {
            inp[1].focus();
            inp[1].disabled = false;
            setInput1(inp[0].value);
          }

          if (inp[1].value.length === 1) {
            inp[2].focus();
            inp[2].disabled = false;

            setInput2(inp[1].value);
          }

          if (inp[2].value.length === 1) {
            inp[3].focus();
            inp[3].disabled = false;

            setInput3(inp[2].value);
          }

          if (inp[3].value.length === 1) {
            setInput4(inp[3].value);
          }
        });
        const val1 = inp[0].value;
        const val2 = inp[1].value;
        const val3 = inp[2].value;
        const val4 = inp[3].value;

        const combine = val1.concat(val2).concat(val3).concat(val4);

        setInputField(combine);
      }
    }
  }, []);

  const handlerKeys = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;

    const filterKey = [13, 32];

    if (keyCode === 8) {
      const ref = inputRef.current?.children ?? ('' as any);

      const val = [0, 1, 2, 3];

      val.map((a) => {
        const refVal = ref[a].value;

        if (refVal.length === 1) {
          setInput4('');
          ref[3].focus();
        }

        if (ref[3].value.length === 0) {
          setInput3('');
          ref[2].focus();
        }

        if (ref[2].value.length === 0) {
          setInput2('');
          ref[1].focus();
        }
        if (ref[1].value.length === 0) {
          setInput1('');
          ref[0].focus();
          ref[3].disabled = true;
          ref[2].disabled = true;
          ref[1].disabled = true;
        }
      });
    }

    if (filterKey.includes(keyCode)) {
      setInput1('');
      setInput2('');
      setInput3('');
      setInput4('');

      const inp = inputRef.current?.children ?? (0 as any);

      inp[0].focus();
      inp[1].disabled = true;
      inp[2].disabled = true;
      inp[3].disabled = true;
    }
  }, []);

  const handlerClick = useCallback(() => {
    setError('');
    setInput1('');
    setInput2('');
    setInput3('');
    setInput4('');
    setInputField('');
  }, [setError]);

  return (
    <MuiCodeBox ref={inputRef} onChange={keyUpInput} onKeyUp={handlerKeys}>
      <Code
        style={{
          border: isEmpty(isError) ? `1px solid ${Color.line}` : `1px solid ${Color.negative}`,
          color: Color.textBlack,
        }}
        autoFocus
        onClick={handlerClick}
        type='number'
        name='code'
        className='codeInput'
        maxLength={1}
        value={input1}
        placeholder={'-'}
      />
      <Code
        style={{
          border: isEmpty(isError) ? `1px solid ${Color.line}` : `1px solid ${Color.negative}`,
          color: Color.textBlack,
        }}
        autoFocus
        type='number'
        name='code'
        className='codeInput'
        maxLength={1}
        value={input2}
        placeholder={'-'}
        disabled
      />
      <Code
        style={{
          border: isEmpty(isError) ? `1px solid ${Color.line}` : `1px solid ${Color.negative}`,
          color: Color.textBlack,
        }}
        autoFocus
        type='number'
        name='code'
        className='codeInput'
        maxLength={1}
        disabled
        placeholder={'-'}
        value={input3}
      />
      <Code
        style={{
          border: isEmpty(isError) ? `1px solid ${Color.line}` : `1px solid ${Color.negative}`,
          color: Color.textBlack,
        }}
        autoFocus
        type='number'
        name='code'
        className='codeInput'
        maxLength={1}
        disabled
        placeholder={'-'}
        value={input4}
      />
    </MuiCodeBox>
  );
};

export default React.memo(SeparatedInput);
