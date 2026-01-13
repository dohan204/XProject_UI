// import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tabs, Typography } from '@mui/material'
// import React, {useState } from 'react'
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// // import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import type { PropsOpenModifiedUser } from '../../../model/props/User'
// import TabModifiedAll from './TabModifiedAll';
// import TabChangPassword from './TabChangPassword';
// // import axios from 'axios';

// export default function ModifiedInfo({open, handleClose}: PropsOpenModifiedUser) {
//     const [value, setValue] = useState<string>('1')
//     // const buttonClick = useRef<HTMLButtonElement>(null)
    
//     const handleChange = (_: React.SyntheticEvent, newValue: string) => {
//         setValue(newValue)
//     }
//     // const handleClickModifiedAll = () => {
//     //     alert('Modified all')
//     // }
//     // const handleClickChangePassword = () => {
//     //     alert('Change Pasword')
//     // }
//     // const handleClickSubmitTabs = () => {
//     //     console.log('Đang xử lý cho tab có value: ', value);

//     //     switch(value){
//     //         case '1': 
//     //             handleClickModifiedAll();
//     //             break;
//     //         case '2': 
//     //             handleClickChangePassword();
//     //             break;
//     //         default: 
//     //             throw new Error('Giá trị không hợp lệ');
//     //             break;
//     //     }
//     // }
//   return (
//     <div>
//         <Dialog open={open} sx={{width: 'auto'}}  maxWidth='md'>
//             <DialogTitle>
//                 <Typography>
//                     Chỉnh sửa thông tin
//                 </Typography>
//             </DialogTitle>
//             <DialogContent >
//                <Box>
//                     <TabContext value={value}>
//                         <Box>
//                             <Tabs onChange={handleChange} value={value}>
//                                 <Tab label='Thay đổi thông tin' value='1' sx={{
//                                     outline: 'none',
//                                     '&:focus': {
//                                         outline: 'none'
//                                     }
//                                 }} />
//                                 <Tab label='Thay đổi mật khẩu' value='2' sx={{
//                                     outline: 'none',
//                                     '&:focus': {
//                                         outline: 'none'
//                                     }
//                                 }} />
//                             </Tabs>
//                         </Box>
//                         <TabPanel value="1">
//                             <TabModifiedAll />
//                         </TabPanel>
//                         <TabPanel value='2'>
//                             <TabChangPassword />
//                         </TabPanel>
//                     </TabContext>
//                 </Box> 
//             </DialogContent>
//             <DialogActions>
//                 {/* <Button color='success' variant='contained'
//                     onClick={handleClickSubmitTabs}
//                 >
//                     Thay đổi
//                 </Button> */}
//                 <Button onClick={handleClose}>
//                     Đóng
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     </div>
//   )
// }
