import axios, { AxiosError } from 'axios';

export const getPage = async (subdomain: string, path: string) => {
  try {
    const { data, status } = await axios.get(
      `${process.env.API_ENDPOINT}/api/v2/internal/deployment/${subdomain}/static-props-temp-jan-2023`,
      {
        params: {
          path,
          basePath: process.env.BASE_PATH,
        },
        headers: { Authorization: `Bearer ${process.env.ADMIN_TOKEN}` },
      }
    );
    return { data, status };
  } catch (error) {
    const axiosError = error as AxiosError;

    // Show a 404 page instead of crashing
    if (axiosError?.response?.status === 400 || axiosError?.response?.status === 404) {
      return { data: {}, status: axiosError?.response.status };
    } else {
      throw error;
    }
  }
};
