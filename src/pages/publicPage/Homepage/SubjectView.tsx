// import React, {useState} from 'react'
// import {
//     Box,
//     Grid,
//     CardActionArea,
//     CardHeader,
//     CardContent,
//     Backdrop,CircularProgress,
//     CardMedia,
// }
// from '@mui/material'

// import type { Subject } from '../../../model/apiResponse/Subject';
// export default function SubjectView() {
//     const [codeSubject, setCodeSubject] = useState<string>('');
//     const [subjects, setSubject] = useState<Subject[]>([])
//     const [loading, setLoading] = useState<boolean>(false);

//     const handleClickSubject = (code: string) => {

//     }
//     return (
//         <Box width={'99vw'} height='auto' p={5}
//             display={'flex'} flexDirection={'column'} gap={3}
//         >
//             <Grid width={'100%'} height={'50%'} container columns={20}
//                 display={'flex'} flexDirection={'row'} spacing={3} mb={4}
//             >
//                 {/* <Grid size={2}></Grid> */}
//                 {loading ? (<Backdrop
//                     sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
//                     open={loading}
//                 >
//                     <CircularProgress color="inherit" />
//                 </Backdrop>) : subjects.map((sub) => (
//                     <Grid size={5}
//                         key={sub.id}
//                         sx={{
//                             transition: '0.5s',
//                             '&:hover': {
//                                 transition: '0.5s ease',
//                                 transform: 'translateY(-10px)',
//                                 boxShadow: '4px 4px 6px lightgray'
//                             }
//                         }}
//                     >
//                         <CardActionArea sx={{
//                             width: '100%', height: '100%', outline: 'none',
//                             '&:focus, &:hover': {
//                                 outline: 'none',
//                                 borderColor: 'white'
//                             }
//                         }} onDoubleClick={() => alert('thần đằng')} onClick={() => handleClickSubject(sub.code)}>
//                             <CardHeader title={sub.name} />
//                             <CardMedia
//                                 component={'img'}
//                                 image={html_css}
//                             />
//                             <CardContent>
//                             </CardContent>
//                         </CardActionArea>
//                     </Grid>
//                 ))}
//                 {/* <Grid size={2}></Grid> */}
//             </Grid>
//         </Box>
//     )
// }
