'use client';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps): React.ReactElement {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center',
          background: '#fff',
        }}
      >
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
          Something went wrong
        </h1>
        <p style={{ marginBottom: '1.5rem', color: '#555' }}>
          Please try again or call us at (555) 000-0000.
        </p>
        <p style={{ marginBottom: '1.5rem', color: '#555', fontSize: '0.875rem' }}>
          firstdueadvisors.com
        </p>
        <button
          onClick={reset}
          style={{
            background: '#0a1628',
            color: '#fff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
