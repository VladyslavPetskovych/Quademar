import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashGate from './components/SplashGate'
import MainLayout from './components/layout/MainLayout'
import { LanguageProvider } from './i18n/LanguageContext'
import HomePage from './pages/HomePage'
import SuitesRoomsPage from './pages/SuitesRoomsPage'
import RestaurantBarPage from './pages/RestaurantBarPage'
import SpaPage from './pages/SpaPage'
import MomentsPage from './pages/MomentsPage'
import ContactsPage from './pages/ContactsPage'
import RoomDetailPage from './pages/RoomDetailPage'
import RulesPage from './pages/RulesPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <LanguageProvider>
      <SplashGate>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="suites-rooms/:roomSlug" element={<RoomDetailPage />} />
              <Route path="suites-rooms" element={<SuitesRoomsPage />} />
              <Route path="restaurant-bar" element={<RestaurantBarPage />} />
              <Route path="spa" element={<SpaPage />} />
              <Route path="moments" element={<MomentsPage />} />
              <Route path="rules" element={<RulesPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="contacts" element={<ContactsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </SplashGate>
    </LanguageProvider>
  )
}
