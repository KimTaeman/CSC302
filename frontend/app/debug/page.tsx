import { getTeams } from '../lib/strapi-server';

export default async function DebugPage() {
  // Test the API call
  const teams = await getTeams();

  // Also test the direct API call
  let rawApiResponse = null;
  let apiError = null;

  try {
    const STRAPI_URL =
      process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const response = await fetch(
      `${STRAPI_URL}/api/teams?populate[students][fields][0]=name&populate[students][fields][1]=studentId&sort[0]=score%3Adesc&pagination[pageSize]=100`,
      {
        next: { revalidate: 0 }, // Don't cache for debugging
      }
    );

    if (response.ok) {
      rawApiResponse = await response.json();
    } else {
      apiError = `${response.status} ${response.statusText}`;
    }
  } catch (error) {
    apiError = error instanceof Error ? error.message : 'Unknown error';
  }

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Debug Information</h1>

        <div className='bg-white p-6 rounded-lg shadow mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Environment Variables</h2>
          <div className='space-y-2 font-mono text-sm'>
            <div>
              <strong>NEXT_PUBLIC_STRAPI_URL:</strong>{' '}
              {process.env.NEXT_PUBLIC_STRAPI_URL || 'Not set'}
            </div>
            <div>
              <strong>STRAPI_API_TOKEN:</strong>{' '}
              {process.env.STRAPI_API_TOKEN ? 'Set (hidden)' : 'Not set'}
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow mb-6'>
          <h2 className='text-xl font-semibold mb-4'>
            Processed Teams Data ({teams.teams.length} teams)
          </h2>
          <pre className='bg-gray-100 p-4 rounded text-xs overflow-auto max-h-64'>
            {JSON.stringify(teams, null, 2)}
          </pre>
        </div>

        <div className='bg-white p-6 rounded-lg shadow mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Raw API Response</h2>
          {apiError ? (
            <div className='text-red-600 font-mono'>Error: {apiError}</div>
          ) : (
            <pre className='bg-gray-100 p-4 rounded text-xs overflow-auto max-h-64'>
              {JSON.stringify(rawApiResponse, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
