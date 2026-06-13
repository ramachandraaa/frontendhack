import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BusinessIcon from '@mui/icons-material/Business'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import TimelineIcon from '@mui/icons-material/Timeline'
import LogoutIcon from '@mui/icons-material/Logout'
import { GlobalSearch, ThemeToggle } from '@/components'
import { useAuth } from '@/hooks'
import { ROUTES } from '@/routes/paths'
import { getDisplayName } from '@/utils/format'

const DRAWER_WIDTH = 260

const navItems = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: <DashboardIcon /> },
  { label: 'Companies', path: ROUTES.COMPANIES, icon: <BusinessIcon /> },
  { label: 'Calling List', path: ROUTES.CALLING_LIST, icon: <PhoneInTalkIcon /> },
  { label: 'Reminders', path: ROUTES.REMINDERS, icon: <NotificationsIcon /> },
  { label: 'Activity Feed', path: ROUTES.ACTIVITY, icon: <TimelineIcon /> },
]

export function MainLayout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const displayName = getDisplayName(user?.firstName, user?.lastName, user?.username)

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ px: 2 }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          Company CRM
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1, px: 1, py: 2 }}>
        {navItems.map((item) => {
          const isActive =
            item.path === ROUTES.DASHBOARD
              ? location.pathname === ROUTES.DASHBOARD
              : location.pathname.startsWith(item.path)
          return (
            <ListItemButton
              key={item.path}
              selected={isActive}
              onClick={() => {
                navigate(item.path)
                setMobileOpen(false)
              }}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          )
        })}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" gap={1.5} mb={1}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 14 }}>
            {displayName.slice(0, 2).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email ?? user?.username}
            </Typography>
          </Box>
        </Box>
        <ListItemButton
          onClick={() => {
            logout()
            navigate(ROUTES.LOGIN)
          }}
          sx={{ borderRadius: 2, color: 'error.main' }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          {isMobile && (
            <IconButton edge="start" onClick={() => setMobileOpen(!mobileOpen)}>
              <MenuIcon />
            </IconButton>
          )}
          <Box flex={1} display="flex" justifyContent={{ xs: 'stretch', md: 'center' }}>
            <GlobalSearch />
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <ThemeToggle />
            <Typography variant="body2" fontWeight={600} display={{ xs: 'none', sm: 'block' }}>
              {displayName}
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: 8,
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
