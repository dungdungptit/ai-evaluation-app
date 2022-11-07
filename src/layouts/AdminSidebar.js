import { Stack } from '@mui/system'
import React from 'react'

const AdminSidebar = () => {
  return (
    <Stack sx={{
      display: { xs: 'none', lg: 'flex' },
      minWidth: { xs: 0, lg: 280 },
    }}>
      <div>AdminSidebar</div>
    </Stack>
  )
}

export default AdminSidebar