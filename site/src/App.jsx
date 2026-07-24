import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashGate from './components/SplashGate'
import MainLayout from './components/layout/MainLayout'
import { LanguageProvider } from './i18n/LanguageContext'
import HomePage from './pages/HomePage'

// Home stays eager (LCP route); the rest load on demand to keep the entry bundle small.
const SuitesRoomsPage = lazy(() => import('./pages/SuitesRoomsPage'))
const RestaurantBarPage = lazy(() => import('./pages/RestaurantBarPage'))
const SpaPage = lazy(() => import('./pages/SpaPage'))
const MomentsPage = lazy(() => import('./pages/MomentsPage'))
const GuardamarPage = lazy(() => import('./pages/GuardamarPage'))
const ContactsPage = lazy(() => import('./pages/ContactsPage'))
const RoomDetailPage = lazy(() => import('./pages/RoomDetailPage'))
const RulesPage = lazy(() => import('./pages/RulesPage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <LanguageProvider>
      <SplashGate>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="suites-rooms/:roomSlug" element={<RoomDetailPage />} />
                <Route path="suites-rooms" element={<SuitesRoomsPage />} />
                <Route path="restaurant-bar" element={<RestaurantBarPage />} />
                <Route path="spa" element={<SpaPage />} />
                <Route path="moments" element={<MomentsPage />} />
                <Route path="moments/guardamar" element={<GuardamarPage />} />
                <Route path="rules" element={<RulesPage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="contacts" element={<ContactsPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SplashGate>
    </LanguageProvider>
  )
}
