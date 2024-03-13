import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage.jsx'
import RegisterPage from './pages/registerPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import TaskFormPage from './pages/taskFormPage.jsx'
import TaskPage from './pages/tasksPage.jsx'
import Navbar from './components/Navbar.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { TaskProvider } from './context/taskContext.jsx'
import { ProtectedRoute } from './protectedRoute.jsx'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className='container mx-auto px-10'>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/logout" />

              <Route element={<ProtectedRoute />}>
                <Route path="/profile" />
                <Route path="/tasks" element={<TaskPage />} />
                <Route path="/tasks/create" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
              </Route>
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App