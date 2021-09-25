import { useEffect, useRef, useState } from 'react';
import './App.css';
import OtpInput from 'react-otp-input';
import "./app.scss"
import { Typography, Divider, Button, Box , Modal  } from '@mui/material';
import { blue, green } from '@mui/material/colors';




const PhoneVerification=()=>{
  const [otp, setOTP] = useState()
  const input = useRef()


  const handleChange = (otp) => {
    setOTP(otp)
  }

  useEffect(() => {
    const keydown = input.current.handleOnKeyDown
    const paste = input.current.handleOnPaste
    
    input.current.handleOnKeyDown = function (e) {
      arguments[0].originalKeyCode = e.keyCode
      if (e.keyCode === 32) arguments[0].keyCode = 8
      keydown.call(this, ...arguments)
    }

    input.current.handleOnPaste = function(e){
      if(e && e.clipboardData && e.clipboardData.types && e.clipboardData.getData) {
          let ptext = parseInt((e.originalEvent || e).clipboardData.getData('text/plain'))
          if(ptext || ptext===0){
            paste.call(this, ...arguments)
          }
      }

    }

  }, [])

  return <>
        <div>
          <Typography variant='h5' align='center'>Phone Verification</Typography >
          <Divider style={{ marginTop: 8 }} />
          <Typography variant='h8' as="div" sx={{ color: '#8e878f', marginTop: 1.9, marginBottom: 3 }} align='center'>Enter the OTP you received on 89206-6XXXXX</Typography>

          <Box>

            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={6}
              ref={input}
              isInputNum={true}
              separator={<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
              containerStyle={{
                justifyContent: 'center'
              }}
              inputStyle='input'
              shouldAutoFocus={true}
              
            />

          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            color: blue[400]
          }}>
            <Box sx={{ p: 1,cursor: 'pointer' }}>Change Number</Box>
            <Box sx={{ p: 1,  cursor: 'pointer' }}>Re-send OTP</Box>
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 1,
            m: 1,
          }}>
            <Button variant="contained" sx={{ bgcolor: green[300], marginTop: 2, borderRadius: 15, paddingLeft: 5, paddingRight: 5 }} size="medium">Verify Phone Number</Button>
          </Box>

        </div>
    

  </>
}



function App() {

  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    bgcolor: 'white',
    p: 4,
  };

  return (
    <div>
      <Box sx={{...style,bgcolor:'transparent',boxShadow:0,p:0,width:'auto'}}>
        <Button onClick={handleOpen} variant="contained" sx={{ bgcolor: green[300], marginTop: 2, borderRadius: 15, paddingLeft: 5, paddingRight: 5 }} size="medium">Phone Verification</Button>
      </Box>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <PhoneVerification />
      </Box>
    </Modal>
    </div>
   );
}

export default App;
