import { Route, Routes } from 'react-router-dom'
import { AdminGate } from './AdminLayout'
import AdminLayout from './AdminLayout'
import Login from './pages/Login'
import Ringkasan from './pages/Ringkasan'
import Pesanan from './pages/Pesanan'
import Pelanggan from './pages/Pelanggan'
import Layanan from './pages/Layanan'
import Pemasukan from './pages/Pemasukan'
import Pengeluaran from './pages/Pengeluaran'
import Laporan from './pages/Laporan'
import Pengaturan from './pages/Pengaturan'
import AdminPlaceholder from './pages/AdminPlaceholder'

/** Rute panel admin — shell terpisah dari landing. */
export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route element={<AdminGate />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Ringkasan />} />
          <Route path="pesanan" element={<Pesanan />} />
          <Route path="pelanggan" element={<Pelanggan />} />
          <Route path="layanan" element={<Layanan />} />
          <Route path="pemasukan" element={<Pemasukan />} />
          <Route path="pengeluaran" element={<Pengeluaran />} />
          <Route path="laporan" element={<Laporan />} />
          <Route path="pengaturan" element={<Pengaturan />} />
          <Route path="*" element={<AdminPlaceholder title="Halaman" />} />
        </Route>
      </Route>
      <Route path="*" element={<AdminPlaceholder title="Halaman" />} />
    </Routes>
  )
}
