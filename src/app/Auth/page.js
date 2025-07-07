import AuthPage from '../../components/AuthForm/authPage';

// Metadata for the page (optional but recommended)
export const metadata = {
  title: 'Sign In | Bab Al Khokha',
  description: 'Sign in to your Bab Al Khokha account or create a new one',
  keywords: 'login, sign up, authentication, Bab Al Khokha',
};

export default function Auth() {
  return (
    <div>
      <AuthPage />
    </div>
  );
}