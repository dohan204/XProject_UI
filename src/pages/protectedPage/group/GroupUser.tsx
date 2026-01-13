import { Box, Button, Table, TableBody, Skeleton, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material'
import React, { useState } from 'react'
import NewGroup from './NewGroup';
import axios, { AxiosError } from 'axios';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import { useAuth } from '../../../context/AuthContext';
import ReviewsIcon from '@mui/icons-material/Reviews';

interface Group {
  group_id: number,
  group_name: string,
  group_status: boolean,
  created_At: string,
  created_By: string,
  role_group: string
}

export default function GroupUser() {
  const [openAddGroup, setOpenAddGroup] = React.useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [group, setGroup] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null); // ĐỔI THÀNH Group | null

  const handleOpenAddGroup = () => setOpenAddGroup(true);
  const handleCloseAddGroup = () => setOpenAddGroup(false);

  const responseGroup = async () => {
    setLoading(true)
    try {
      const response = await axios.get<Group[]>('https://api.testx.space/api/Group/GetGroupsByUser', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setGroup(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status === 404) {
          setErrorMessage('Bạn chưa có nhóm nào.')
        } else if (err.status === 500) {
          setErrorMessage('Lỗi server')
        }
      }
    } finally {
      setLoading(false);
    }
  }

  const TableSkeleton = () => (
    <>
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton animation="wave" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  console.log('group dang chon: ', selectedGroup)

  React.useEffect(() => {
    responseGroup();
  }, [])

  return (
    <>
      <Box width={'97vw'} height={'auto'}>
        <Box width={'100%'} sx={{
          display: 'flex',
          m: 1,
          p: 2
        }}>
          <Box width={'50%'} display={'flex'} justifyContent={'flex-start'}>
            <Typography fontSize={'30px'}>
              Danh sách nhóm của bạn
            </Typography>
          </Box>
          <Box width={'50%'} display={'flex'} justifyContent={'flex-end'}>
            <Button variant='contained' onClick={handleOpenAddGroup}
              sx={{
                mr: 10
              }}>Tạo nhóm mới</Button>
          </Box>
        </Box>
        <Box width={'100%'} display={'flex'} flexDirection={'row'}>
          <Box m={3} width={'35%'}>
            <Typography fontSize={20}>
              Danh sach nhom
            </Typography>
            <Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Tên nhóm</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? <TableSkeleton />
                      : group.length > 0 ?
                        group.map((g, i) => (
                          <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{g.group_name}</TableCell>
                            <TableCell>{g.group_status ? 'Online' : 'Offline'}</TableCell>
                            <TableCell>
                              {g.role_group === "Leader" ? (
                                <>
                                  <IconButton>
                                    <ManageAccountsIcon />
                                  </IconButton>
                                  <IconButton onClick={() => setSelectedGroup(g)}> {/* ĐỔI setSelectedGroup(true) THÀNH setSelectedGroup(g) */}
                                    <ReviewsIcon />
                                  </IconButton>
                                </>
                              ) : <IconButton onClick={() => setSelectedGroup(g)}> {/* CŨNG ĐỔI CHỖ NÀY */}
                                <ReviewsIcon />
                              </IconButton>}
                            </TableCell>
                          </TableRow>
                        )) : <TableRow>
                          <TableCell colSpan={4}>{errorMessage}</TableCell>
                        </TableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Box m={3} width={'60%'}>
            {selectedGroup && <GroupDetails group={selectedGroup} />} {/* TRUYỀN PROPS group */}
          </Box>
        </Box>
        <NewGroup open={openAddGroup} handleClose={handleCloseAddGroup} />
      </Box>
    </>
  )
}

// THÊM INTERFACE VÀ PROPS CHO GroupDetails
interface GroupDetailsProps {
  group: Group;
}

function GroupDetails({ group }: GroupDetailsProps) {

  
  return (
    <Box>
      <Typography fontSize={20} mb={2}>
        Chi tiết nhóm: {group.group_name}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên Thành viên</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Ngày Tham gia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} align="center">
                Chưa có dữ liệu thành viên
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}