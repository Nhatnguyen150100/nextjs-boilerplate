import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <Container className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Typography variant="h1" className="text-6xl font-bold text-red-500">
        404
      </Typography>
      <Typography variant="h5" className="mt-4 text-gray-700">
        Oops! Page not found.
      </Typography>
      <Typography component="pre">{error.message}</Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary" className="mt-6">
          Go to Homepage
        </Button>
      </Link>
    </Container>
  );
};

export default ErrorPage;
