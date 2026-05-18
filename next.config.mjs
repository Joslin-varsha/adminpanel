/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.100.34', '0.0.0.0', 'localhost:3000'],
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/screen/login',
      },
      {
        source: '/login',
        destination: '/screen/login',
      },
      {
        source: '/Login',
        destination: '/screen/login',
      },
      {
        source: '/dashboard',
        destination: '/screen/dashboard',
      },
      {
        source: '/Dashboard',
        destination: '/screen/dashboard',
      },
      {
        source: '/workers',
        destination: '/screen/workers',
      },
      {
        source: '/Workers',
        destination: '/screen/workers',
      },
      {
        source: '/users',
        destination: '/screen/users',
      },
      {
        source: '/Users',
        destination: '/screen/users',
      },
      {
        source: '/bookings',
        destination: '/screen/bookings',
      },
      {
        source: '/Bookings',
        destination: '/screen/bookings',
      },
      {
        source: '/payments',
        destination: '/screen/payments',
      },
      {
        source: '/Payments',
        destination: '/screen/payments',
      },
      {
        source: '/invoices',
        destination: '/screen/invoices',
      },
      {
        source: '/Invoices',
        destination: '/screen/invoices',
      },
      {
        source: '/reports',
        destination: '/screen/reports',
      },
      {
        source: '/Reports',
        destination: '/screen/reports',
      },
     
    ];
  },
};

export default nextConfig;
