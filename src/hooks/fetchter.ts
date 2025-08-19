export const fetchData = async (endpoint: string) => {
  try {
    console.log('fetchData - Fetching from:', endpoint);
    
    const res = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store', // ✅ Prevent caching issues in production
      next: { revalidate: 0 } // ✅ Always fetch fresh data
    });

    console.log('fetchData - Response status:', res.status);
    console.log('fetchData - Response ok:', res.ok);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('fetchData - Data received:', data);
    console.log('fetchData - Data.images:', data?.images);
    
    return data;
  } catch (error) {
    console.error('fetchData - Error:', error);
    throw error; // Re-throw to let the calling component handle it
  }
};
