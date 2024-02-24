import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import FeedPage from "../pages/FeedPage"
import CommentsPage from "../pages/CommentPage"
import ErrorPage from "../pages/ErrorPage"

const Router = () => {
    return (      
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element ={<LoginPage />} />
                    <Route path="/signup" element ={<SignupPage />} />
                    <Route path="/" element ={<FeedPage />} />
                    <Route path="/posts/:post_id/comments" element ={<CommentsPage />} />
                    <Route path="*" element ={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
    )
}

export default Router