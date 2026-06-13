import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoadingSpinner, ProtectedRoute } from '@/components'
import { AuthLayout, MainLayout } from '@/layouts'
import { ROUTES } from './paths'

const LoginPage = lazy(() => import('@/pages/Login').then((m) => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('@/pages/Register').then((m) => ({ default: m.RegisterPage })))
const DashboardPage = lazy(() => import('@/pages/Dashboard').then((m) => ({ default: m.DashboardPage })))
const CompaniesPage = lazy(() => import('@/pages/Companies').then((m) => ({ default: m.CompaniesPage })))
const CompanyDetailsPage = lazy(() =>
  import('@/pages/CompanyDetails').then((m) => ({ default: m.CompanyDetailsPage })),
)
const HRProfilePage = lazy(() => import('@/pages/HRProfile').then((m) => ({ default: m.HRProfilePage })))
const RemindersPage = lazy(() => import('@/pages/Reminders').then((m) => ({ default: m.RemindersPage })))
const CallingListPage = lazy(() => import('@/pages/CallingList').then((m) => ({ default: m.CallingListPage })))
const ActivityPage = lazy(() => import('@/pages/Activity').then((m) => ({ default: m.ActivityPage })))
const SearchPage = lazy(() => import('@/pages/Search').then((m) => ({ default: m.SearchPage })))

function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSpinner fullPage />}>{children}</Suspense>
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path={ROUTES.LOGIN}
          element={
            <LazyPage>
              <LoginPage />
            </LazyPage>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <LazyPage>
              <RegisterPage />
            </LazyPage>
          }
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <LazyPage>
                <DashboardPage />
              </LazyPage>
            }
          />
          <Route
            path={ROUTES.COMPANIES}
            element={
              <LazyPage>
                <CompaniesPage />
              </LazyPage>
            }
          />
          <Route
            path={ROUTES.COMPANY_DETAILS}
            element={
              <LazyPage>
                <CompanyDetailsPage />
              </LazyPage>
            }
          />
          <Route
            path={ROUTES.HR_PROFILE}
            element={
              <LazyPage>
                <HRProfilePage />
              </LazyPage>
            }
          />
          <Route
            path={ROUTES.REMINDERS}
            element={
              <LazyPage>
                <RemindersPage />
              </LazyPage>
            }
          />
          <Route
            path={ROUTES.CALLING_LIST}
            element={
              <LazyPage>
                <CallingListPage />
              </LazyPage>
            }
          />
          <Route
            path={ROUTES.ACTIVITY}
            element={
              <LazyPage>
                <ActivityPage />
              </LazyPage>
            }
          />
          <Route
            path={ROUTES.SEARCH}
            element={
              <LazyPage>
                <SearchPage />
              </LazyPage>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  )
}
