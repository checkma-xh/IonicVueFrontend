import axios from "axios";

export async function verificationCodeVerify ( email: string, verificationCode: string ) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    };
    const data = {
      email: email,
      verificationCode: verificationCode
    };
    const response = await axios.post(
      "http://localhost:3000/auth/verification-code/verify",
      data,
      config
    );
    return response.data;
  } catch ( error ) {
    console.error( "Error fetching data:", error );
  }
}
