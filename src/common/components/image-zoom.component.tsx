import React from 'react';
import { Box, Button } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ClearIcon from '@mui/icons-material/Clear';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import RenderIf from './render-if.component';

type MyProps = {
  // using `interface` is also ok
  srcFile: string;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCursor: any;
  cursorActive: boolean;
};
type MyState = {
  fire?: boolean; // like this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef?: React.RefObject<any>;
};
class ZoomPinch extends React.Component<MyProps, MyState> {
  state: MyState = {
    // optional second annotation for better type inference
    fire: false,
    inputRef: React.createRef(),
  };

  render() {
    return (
      <TransformWrapper
        onPanning={(e) => this.props.onCursor(!this.props.cursorActive)}
        doubleClick={{ step: 0.5, mode: 'zoomIn' }}
        centerZoomedOut={true}
        onWheel={(e) => this.setState({ fire: false })}
        onZoom={(e) => this.props.onCursor(!this.props.cursorActive)}
        minScale={1}
        maxScale={8}
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
          return (
            <React.Fragment>
              <RenderIf
                value={this.state?.inputRef?.current?.clientWidth > 198 && this.state?.inputRef?.current?.clientHeight > 176}
              >
                <Box sx={{ position: 'absolute', right: '0', zIndex: '99999999' }} className='tools'>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2%', background: 'rgba(0,0,0,.2)', padding: '20px' }}>
                    <Button onClick={() => resetTransform()}>
                      <CropFreeIcon />
                    </Button>
                    <Button onClick={() => zoomOut()}>
                      <ZoomOutIcon />
                    </Button>
                    <Button onClick={() => zoomIn()}>
                      <ZoomInIcon />
                    </Button>
                    <Button onClick={this.props.onClose}>Close</Button>
                  </Box>
                </Box>
              </RenderIf>
              <RenderIf
                value={this.state?.inputRef?.current?.clientWidth <= 198 && this.state?.inputRef?.current?.clientHeight <= 176}
              >
                <Box sx={{ position: 'absolute', right: 0, left: 0, zIndex: '99999999', padding: '0' }} className='tools'>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      background: 'rgba(0,0,0,.2)',
                      padding: '0',
                    }}
                  >
                    <Button sx={{ padding: 0 }} onClick={() => resetTransform()}>
                      <CropFreeIcon />
                    </Button>
                    <Button sx={{ padding: 0 }} onClick={() => zoomOut()}>
                      <ZoomOutIcon />
                    </Button>
                    <Button sx={{ padding: 0 }} onClick={() => zoomIn()}>
                      <ZoomInIcon />
                    </Button>
                    <Button sx={{ padding: 0 }} onClick={this.props.onClose}>
                      <ClearIcon />
                    </Button>
                  </Box>
                </Box>
              </RenderIf>

              <TransformComponent contentStyle={{ cursor: this.props.cursorActive === true ? 'zoom-out' : 'zoom-in' }}>
                <Box
                  sx={{
                    width: { xs: '300px', sm: '100%', md: '100%' },
                    minWidth: '300px',
                    minHeight: '300px',
                    maxWidth: '900px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  component='img'
                  src={this.props.srcFile}
                  ref={this.state.inputRef}
                />
              </TransformComponent>
            </React.Fragment>
          );
        }}
      </TransformWrapper>
    );
  }
}

export default ZoomPinch;
