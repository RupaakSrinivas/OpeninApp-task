import axios from "axios";

export async function getProfile(access_token: string) {
  try {
    const data = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
