import AddCoursePage from "../pages/AddCoursePage";
import AddSessionPage from "../pages/AddSessionPage";
import CourseInfoPage from "../pages/CourseInfoPage";
import LoginLecturer from "../pages/LoginLecturer";
import LoginStudent from "../pages/LoginStudent";
import NotFoundPage from "../pages/NotFoundPage";
import Lecturer from "../pages/Lecturer";
import ForgotPassword from "../pages/ForgotPassword"

export const routes = [
    {
        path: '/lecturer',
        page: LoginLecturer,
        title: 'Login Page',
        role: 'Lecturer',
        animatedBg: true,
        header: true
    },
    {
        path: '/',
        page: LoginStudent,
        title: 'Login Page',
        role: 'Student',
        animatedBg: true,
        header: true
    },
    {
        path: '*',
        page: NotFoundPage,
        title: '404',
        role: '404'
    },
    {
        path: '/lecturer/dashboard/add-course',
        page: AddCoursePage,
        title: 'New Course',
        animatedBg: true,
        role: 'lecturer',
        header: true
    },
    {
        path: '/lecturer/dashboard/add-session',
        page: AddSessionPage,
        title: 'New Attendance',
        animatedBg: true,
        role: 'lecturer',
        header: true
    },
    {
        path: '/lecturer/dashboard/:course',
        page: CourseInfoPage,
        title: 'Course Information',
        role: 'lecturer',
        header: true
    },
    {
        path: '/lecturer/dashboard',
        page: Lecturer,
        title: 'Course List',
        role: 'lecturer',
        header: true
    },
    {
        path: '/forgot',
        page: ForgotPassword,
        title: 'Forgot Password',
        role: 'student',
        animatedBg: true,
        header: true
    }
]