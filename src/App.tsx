
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import BodyTalk from "./pages/BodyTalk";
import SkillBridge from "./pages/SkillBridge";
import AbleQuests from "./pages/AbleQuests";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <Layout>
                <Home />
              </Layout>
            } />
            <Route path="/bodytalk" element={
              <ProtectedRoute>
                <Layout>
                  <BodyTalk />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/skillbridge" element={
              <Layout>
                <SkillBridge />
              </Layout>
            } />
            <Route path="/ablequests" element={
              <ProtectedRoute>
                <Layout>
                  <AbleQuests />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={
              <Layout>
                <NotFound />
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
