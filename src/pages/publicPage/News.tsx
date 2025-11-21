import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import news from '../../assets/news.jpg';
import { motion } from "framer-motion";

export default function News() {
  const infoImportance = [
    'Thời gian mở/đóng đăng ký thi',
    'Bảo trì hệ thống, nâng cấp server',
    'Thay đổi quy định, hướng dẫn thi mới'
  ];

  const updateSystem = [
    'Cập nhật tính năng mới trên platform.',
    'Thay đổi quy định, hướng dẫn thi mới',
    'Sửa lỗi hoặc cải thiện trải nghiệm người dùng'
  ]

  const TipAndTest = [
    'Các tips để làm trắc nghiệm nhanh, tránh sai lãng phí thời gian',
    'Tổng hợp các câu hỏi mẫu / đề thi mẫu',
    'Chiến lược ôn tập theo môn hoặc theo cấp độ'
  ]

  const educationNew = [
    'Các kỳ thi lớn khác, học bổng, cuộc thi online',
    'Các bài viết khuyến khích học sinh, sinh viên học hiệu quả',
    'Cập nhật xu hướng đề thi, phương pháp học mới'
  ]
  return (
    <Box>
      <Box width={'98vw'} height={'60vh'}
        position={'relative'}
        sx={{
          backgroundImage: `url(${news})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'none',
          backgroundSize: '100% 99%'
        }}
        display={'flex'} justifyContent={'center'} alignItems={'center'}
      >
        <Box top={10} right={0} >
          <motion.h1
            style={{ color: 'lightgreen' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Tham gia TestX Ngay!!
          </motion.h1>
        </Box>
      </Box>
      <Box width={'98vw'} height={'66vh'} display={'flex'} flexDirection={'column'} p={1}>
        <Box height={'48%'} width={'100%'} display={'flex'} flexDirection={'row'}>
          <Box height={'100%'} width={'50%'} display={'flex'} flexDirection={'column'}
            justifyContent={'center'} alignItems={'center'} bgcolor={'lightblue'} p={1} m={1} component={Paper}>
            <Box height={'30%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 1
                }}
              >
                <Typography sx={{fontSize: 35, mr: 20}}>
                  Thông báo quan trọng
                </Typography>
              </motion.div>
            </Box>
            <Box height={'70%'} mr={15}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 1
                }}
              >
                {infoImportance.map((value) => (
                  <Typography key={value}>{value}</Typography>
                ))}
              </motion.div>
            </Box>
          </Box>
          <Box height={'100%'} width={'50%'} display={'flex'} p={1} m={1} component={Paper}
           flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <Box height={'30%'} alignContent={'center'}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 1
                }}
              >
                <Typography sx={{fontSize: 35, mr: 20}}>
                  Cập nhật hệ thống
                </Typography>
              </motion.div>
            </Box>
            <Box height={'70%'}
            >
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 1
                }}
              >
                {updateSystem.map((value) => (
                  <Typography key={value}>{value}</Typography>
                ))}
              </motion.div>
            </Box>
          </Box>
        </Box>
        <Box height={'48%'} width={'100%'} display={'flex'} flexDirection={'row'} mt={1}>
          <Box height={'100%'} width={'50%'} display={'flex'} flexDirection={'column'}
            justifyContent={'center'} alignItems={'center'}m={1} p={1} component={Paper}>
            <Box height={'30%'} alignContent={'center'}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 1
                }}
              >
                <Typography sx={{fontSize: 35, mr: 20}}>
                  Mẹo học tập và ôn thi
                </Typography>
              </motion.div>
            </Box>
            <Box height={'70%'} ml={8}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 1
                }}
              >
                {TipAndTest.map((value) => (
                  <Typography key={value}>{value}</Typography>
                ))}
              </motion.div>
            </Box>
          </Box>
          <Box height={'100%'} width={'50%'} display={'flex'} pt={1} m={1} component={Paper}
           flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <Box height={'30%'} alignContent={'center'}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 1
                }}
              >
                <Typography sx={{fontSize: 35}}>
                  Tin tức giáo dục và liên quan
                </Typography>
              </motion.div>
            </Box>
            <Box height={'70%'} ml={12}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 1
                }}
              >
                {educationNew.map((value) => (
                  <Typography key={value}>{value}</Typography>
                ))}
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
