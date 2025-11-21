import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import background from '../../assets/backgroud2.jpg'
import background2 from '../../assets/dongLucp1.jpg'
import AndroidIcon from '@mui/icons-material/Android';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AttractionsIcon from '@mui/icons-material/Attractions';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from "react";
// import TestFree from "./Homepage/TestFree";
import DialogStart from "./Homepage/DialogStart";
import StartPractice from "./Homepage/StartPractice";
// import { Outlet } from "react-router-dom";
import html_css from '../../assets/html-css.png'
import react from '../../assets/reactjs-ts.png'
import php from '../../assets/php.jpg'
import mssql from '../../assets/mssql.png';
import javaS from '../../assets/JavaScript.jpg'
import c_plus from '../../assets/c-logo.png'
// import cSharp from '../../assets/c#.png'
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate()
  const [openStart, setOpenStart] = useState<boolean>(false)
  const [openStartPractice, setOpenStartPractice] = useState<boolean>(false);
  const handleOpenStart = () => setOpenStart(true)
  const handleCloseStart = () => setOpenStart(false)

  const handleClosePractice = () => setOpenStartPractice(false);
  const tokenUser = localStorage.getItem('tokenUser')
  const handleStartLogon = () => {
    setOpenStartPractice(true)
    // if(!tokenUser){
    //   return <StartPractice open={openStartPractice} handleClose={handleClosePractice} />
    // } 
    // return <Excersice />
  }
  return <Box
    display={'flex'}
    flexDirection={'column'}
  >
    <Box
      sx={{
        width: '99vw',
        height: '90vh',
        backgroundImage: `url(${background})`,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Grid container spacing={3}
        display={'flex'} flexDirection={'row'}
        justifyContent={'space-around'}
        width={'100%'} bgcolor={'lightblue'} height={'100%'}>
        <Grid width={'36%'} bgcolor={'transparent'}>
          <Grid width={'100%'} height={'32%'} bgcolor={'transparent'}>
          </Grid>
          <Grid height={'68%'} bgcolor={'transparent'}>
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeIn' }}
            >
              <Box sx={{ pl: 7 }}>
                <Typography component={'h3'} variant="h3">
                  Test preparation that makes a difference
                </Typography>
                <Typography component={'h5'} variant="h5">
                  Prepare with us – Pass your test – Get the job
                </Typography>
                <Box>
                  <Button size="large"
                    color="secondary"
                    variant="contained"
                    sx={{
                      outline: 'none',
                      '&:focus': {
                        outline: 'none'
                      }
                    }}
                    onClick={handleOpenStart}>
                    Start Free Test
                  </Button>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        <Grid width={'25%'} bgcolor={'transparent'}>
        </Grid>
        <Grid width={'32%'}>
          <Grid width={'100%'} height={'70%'}>
            <Grid width={'100%'} height={'30%'}>

            </Grid>
            <Grid width={'100%'} height={'70%'}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1, ease: 'easeOut'
                }}
              >
                <Card sx={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  <CardContent>
                    <Typography component={'h2'} variant="h2">
                      Luyện tập
                    </Typography>
                    <Typography component={'h6'} variant="h6">
                      Chúng tôi giúp bạn trở nên vip hơn.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="large" variant="contained" color="success"
                      sx={{
                        outline: 'none',
                        '&:focus': {
                          outline: 'none'
                        }
                      }}
                      onClick={handleStartLogon}
                    >
                      Tham gia tại đây
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
          <Grid></Grid>
          <Grid></Grid>
        </Grid>
      </Grid>
    </Box>
    <Box width={'99vw'} height={'30vh'} bgcolor={'lightseagreen'}
      display={'flex'}
      justifyContent={'space-around'}
      alignContent={'center'}
      alignItems={'center'}
    >
      <Box width={'15%'} display={'flex'} alignItems={'center'} justifyContent={'center'}
        component={'button'} onClick={() => alert('như cặc')}
        sx={{
          '&:hover': {
            backgroundColor: 'lightgray'
            ,
            borderColor: 'none'
          },
          '&:active': {
            transform: 'translate(0px)',
            background: 'white'
          }
        }}
      >
        <AndroidIcon sx={{ fontSize: 100 }} />
      </Box>
      <Box width={'15%'} display={'flex'} alignItems={'center'} justifyContent={'center'}
        component={'button'} onClick={() => alert('như cặc')}
        sx={{
          '&:hover': {
            backgroundColor: 'lightgray'
            ,
            borderColor: 'none'
          },
          '&:active': {
            transform: 'translate(0px)',
            background: 'white'
          }
        }}
      >
        <ContactSupportIcon sx={{ fontSize: 100 }} />
      </Box>
      <Box width={'15%'} display={'flex'} alignItems={'center'} justifyContent={'center'}
        component={'button'} onClick={() => alert('như cặc')}
        sx={{
          '&:hover': {
            backgroundColor: 'lightgray'
            ,
            borderColor: 'none'
          },
          '&:active': {
            transform: 'translate(0px)',
            background: 'white'
          }
        }}
      >
        <AttractionsIcon sx={{ fontSize: 100 }} />
      </Box>
      <Box width={'15%'} display={'flex'} alignItems={'center'} justifyContent={'center'}
        component={'button'} onClick={() => alert('như cặc')}
        sx={{
          '&:hover': {
            backgroundColor: 'lightgray'
            ,
            borderColor: 'none'
          },
          '&:active': {
            transform: 'translate(0px)',
            background: 'white'
          }
        }}
      >
        <BorderColorIcon sx={{ fontSize: 100 }} />
      </Box>
      <Box width={'15%'} display={'flex'} alignItems={'center'} justifyContent={'center'}
        component={'button'} onClick={() => alert('như cặc')}
        sx={{
          borderColor: 'none',
          outline: 'none',
          '&:hover': {
            outline: 'none',
            backgroundColor: 'lightgray',
            borderColor: 'none'
          },
          '&:active': {
            transform: 'translate(0px)',
            background: 'white'
          }
        }}
      >
        <MiscellaneousServicesIcon sx={{ fontSize: 100 }} />
      </Box>
    </Box>
    <Box width={'99vw'} height={'85vh'}>
      <Grid container width={'100%'} height={'100%'}
        display={'flex'}
        flexDirection={'row'}
      >
        <Grid size={3}>
        </Grid>
        <Grid size={6}>
          <Box width={'100%'} height={'100%'}
            display={'flex'} justifyContent={'center'} flexDirection={'column'}
            alignItems={'center'}
          >
            <Box>
              <Typography component={'h3'} variant="h3" pl={5}>
                Chuẩn bị cho bài kiểm tra năng khiếu
              </Typography>
            </Box>
            <Box p={5}>
              <Typography>
                Giải phóng tiềm năng của bạn: Vượt qua bài kiểm tra năng khiếu nhân viên hoặc kỳ thi tuyển sinh vào trường một cách dễ dàng với các bài kiểm tra thực hành trực tuyến được thiết kế riêng của chúng tôi.
              </Typography>
              <Typography>
                Hãy luyện tập với một trong các bài kiểm tra năng khiếu miễn phí của chúng tôi, hoặc nâng cao trình độ của bạn với các gói luyện thi toàn diện. Đăng ký ngay và bắt đầu chuẩn bị ngay hôm nay.
              </Typography>
            </Box>
            <Typography sx={{ pb: 2 }}>
              Want to try a free aptitude test? Try our free Cognitive Ability Test.
            </Typography>
            <Box>
              <Button color="success" variant="contained">
                Free Cognitive Ability Test
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid size={3}>
        </Grid>
      </Grid>
    </Box>
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1, ease: 'easeOut'
      }}
    >
      <Box width={'99vw'} height={'40vh'} mt={1}>
        <Grid container spacing={3}
          width={'100%'} display={'flex'} flexDirection={'row'}
          height={'100%'}
          columns={24}>
          <Grid size={2}></Grid>
          <Grid size={5} bgcolor={'lightgreen'}>
            <Card sx={{ width: '100%', height: '100%', backgroundColor: 'lightpink' }}  >
              <CardHeader
                avatar={
                  <Avatar>
                    <SupportAgentIcon />
                  </Avatar>
                }
              />
              <CardContent>
                <Typography>
                  Hỗ trợ online 24/7
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={5} bgcolor={'lightcyan'}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                }
                title='Người dùng'
                subheader
              >
              </CardHeader>
              <CardContent>
                <Typography>
                  Số người dùng hiện tại
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={5} bgcolor={'lightgoldenrodyellow'}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <AssuredWorkloadIcon />
                  </Avatar>
                }
                title='Ngân hàng câu hỏi'
              />
              <CardContent>
                <Typography>
                  Câu hỏi đươc cập nhật mới theo ngày
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={5} bgcolor={'lightpink'}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <SubjectIcon />
                  </Avatar>
                }
                title='Số lượng đề thi'
              />
              <CardContent>
                <Typography>
                  Số lượng đề thi
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={2}></Grid>
        </Grid>
      </Box>
    </motion.div>
    <Box width={'99vw'} height={'20vh'} mt={2}>
      <Grid container width={'100%'} height={'100%'}>
        <Grid size={3}></Grid>
        <Grid size={6}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
            width={'100%'}
          >
            <Typography component={'h4'} variant="h4">
              Thực hành theo môn
            </Typography>
            <Typography>
              Tìm môn thi phù hợp với nhu cầu của bạn, chọn môn thi ở phía dưới.
            </Typography>
          </Box>
        </Grid>
        <Grid size={3}></Grid>
      </Grid>
    </Box>
    <Box width={'99vw'} height='86vh'
      display={'flex'} flexDirection={'column'} gap={3}
    >
      <Grid width={'100%'} height={'50%'} container columns={24}
        display={'flex'} flexDirection={'row'} spacing={3} mb={4}
      >
        <Grid size={2}></Grid>
        <Grid size={5}
          sx={{
            transition: '0.5s',
            '&:hover': {
              transition: '0.5s ease',
              transform: 'translateY(-10px)',
              boxShadow: '4px 4px 6px lightgray'
            }
          }}
        >
          <Card sx={{
            width: '100%', height: '100%', outline: 'none',
            '&:focus, &:hover': {
              outline: 'none',
              borderColor: 'white'
            }
          }} component={'button'} onDoubleClick={() => alert('thần đằng')}>
            <CardHeader title='Thiết kế website với HTML-CSS' />
            <CardMedia
              component={'img'}
              image={html_css}
            />
            <CardContent>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={5}
          sx={{
            transition: '0.5s',
            '&:hover': {
              transition: '0.5s ease',
              transform: 'translateY(-10px)',
              boxShadow: '4px 4px 6px lightgray'
            }
          }}
        >
          <Card sx={{
            width: '100%', height: '100%', outline: 'none',
            '&:focus, &:hover': {
              outline: 'none',
              borderColor: 'white'
            }
          }} component={'button'} onDoubleClick={() => alert('thần đằng')}>
            <CardHeader title='ReactJS - TS' />
            <CardMedia
              component={'img'}
              width={'150px'}
              height={'150px'}
              image={react}
            />
            <CardContent>

            </CardContent>
          </Card>
        </Grid>
        <Grid size={5}
          sx={{
            transition: '0.5s',
            '&:hover': {
              transition: '0.5s ease',
              transform: 'translateY(-10px)',
              boxShadow: '4px 4px 6px lightgray'
            }
          }}
        >
          <Card sx={{
            width: '100%', height: '100%', outline: 'none',
            '&:focus, &:hover': {
              outline: 'none',
              borderColor: 'white'
            }
          }} component={'button'} onDoubleClick={() => alert('thần đằng')}>
            <CardHeader title='Lập trình với PHP' />
            <CardMedia
              component={'img'}
              image={php}
            />
            <CardContent>

            </CardContent>
          </Card>
        </Grid>
        <Grid size={5}
          sx={{
            transition: '0.5s',
            '&:hover': {
              transition: '0.5s ease',
              transform: 'translateY(-10px)',
              boxShadow: '4px 4px 6px lightgray'
            }
          }}
        >
          <Card sx={{
            width: '100%', height: '100%',
            outline: 'none',
            '&:focus, &:hover': {
              outline: 'none',
              borderColor: 'white'
            }
          }} component={'button'} onDoubleClick={() => alert('thần đằng')}>
            <CardHeader title='Cơ sở dữ liệu(MSSQL)'></CardHeader>
            <CardMedia
              component={'div'}
              image={mssql}
            />
            <CardContent>

            </CardContent>
          </Card>
        </Grid>
        <Grid size={2}></Grid>
      </Grid>
      <Grid width={'100%'} height={'50%'} container columns={24} mt={1}
        display={'flex'} flexDirection={'row'} spacing={3}
      >
        <Grid size={2}></Grid>
        <Grid height={'106%'} size={5} sx={{
          transition: '0.5s',
          '&:hover': {
            transition: '0.5s ease',
            transform: 'translateY(-10px)',
            boxShadow: '4px 4px 6px lightgray'
          }
        }} >
          <Card sx={{
            width: '100%', height: '100%',
            outline: 'none',
            '&:focus, &:hover': {
              outline: 'none',
              borderColor: 'white'
            }
          }} component={'button'} onDoubleClick={() => alert('thần đằng')}>
            <CardHeader title='Lập trình Javascript'></CardHeader>
            <CardMedia
              component={'img'}
              height={'205px'}
              image={javaS}
            />
            <CardContent>

            </CardContent>
          </Card>
        </Grid>
        <Grid height={'106%'} size={5} sx={{
          transition: '0.5s',
          '&:hover': {
            transition: '0.5s ease',
            transform: 'translateY(-10px)',
            boxShadow: '4px 4px 6px lightgray'
          }
        }}>
          <Card sx={{
            width: '100%', height: '100%',
            outline: 'none',
            '&:focus, &:hover': {
              outline: 'none',
              borderColor: 'white'
            }
          }} component={'button'} onDoubleClick={() => alert('thần đằng')}>
            <CardHeader title='Lập trình Java'></CardHeader>
            <CardMedia
              component={'img'}
            // image={java}
            />
            <CardContent>

            </CardContent>
          </Card>
        </Grid>
        <Grid height={'106%'} size={5} sx={{
          transition: '0.5s',
          '&:hover': {
            transition: '0.5s ease',
            transform: 'translateY(-10px)',
            boxShadow: '4px 4px 6px lightgray'
          }
        }}>
          <Card sx={{
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            outline: 'none',
            '&:focus, &:hover': {
              outline: 'none',
              borderColor: 'white'
            }
          }} component={'button'}
            onClick={() => alert('con cặc')}
          >
            <CardHeader title='Lập trình C#' />
            <CardMedia
              component={'img'}
            // image={cSharp}
            />
            <CardContent>
            </CardContent>
          </Card>
        </Grid>
        <Grid height={'106%'} size={5} sx={{
          transition: '0.5s',
          '&:hover': {
            transition: '0.5s ease',
            transform: 'translateY(-10px)',
            boxShadow: '4px 4px 6px lightgray'
          }
        }}>
          <Card sx={{
            width: '100%', height: '100%', cursor: 'pointer', outline: 'none',
            '&:hover': {
              borderColor: 'white',
            },
            '&:focus': {
              outline: 'none',             // cho cả trường hợp focus bằng tab
            },
            '&:focus-visible': {
              outline: 'none',
              // Nếu mày vẫn muốn người dùng biết đang focus (accessibility tốt hơn)
              // thì thay vì outline mặc định, dùng cái gì đó đẹp hơn:
              boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.5)', // ví dụ viền trắng mờ
              // hoặc
              // border: '2px solid white',
            },

          }} component={'button'} onClick={() => alert('con cặc')}>
            <CardHeader title='Lập trình với C/C++' sx={{ padding: 1 }} />
            <CardMedia
              component={'img'}
              height={'200px'}
              image={c_plus}
            />
            <CardContent>

            </CardContent>
          </Card>
        </Grid>
        <Grid size={2}></Grid>
      </Grid>
    </Box>
    <Box width={'99vw'} height={'90vh'} mt={15}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Box width={'100%'} height={'100%'} p={10}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#ccccff',
              alignItems: 'center', gap: 4
            }}>
            <Box width={'70%'}>
              <Typography component={'h2'} variant="h2">
                Giải phóng tiềm năng của bạn
              </Typography>
              <Typography>
                Nâng cao kỹ năng và vượt trội trong bài kiểm tra năng khiếu trước khi tuyển dụng với nền tảng luyện thi của chúng tôi.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined">Bắt đầu</Button>
              <Button variant="outlined">Kiểm tra miến phí</Button>
            </Box>
          </Box>
        </Grid>
        <Grid size={6}>
          <Box width={'100%'} height={'100%'}
            sx={{
              backgroundImage: `url(${background2})`,
              backgroundRepeat: 'no-repeat',
              backgroundOrigin: 'revert',
              backgroundSize: 'auto'
            }}
          >
            <Typography>
              Okkk....
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
    <DialogStart open={openStart} handleClose={handleCloseStart} />
    <StartPractice open={openStartPractice} handleClose={handleClosePractice} />
  </Box>
}