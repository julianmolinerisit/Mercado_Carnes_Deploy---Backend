import cookie from "cookie";

const handler = (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Compara las credenciales con las credenciales almacenadas en .env
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      // Genera una cookie de autenticación
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60, // Duración de la cookie en segundos
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json("Succesful");
    } else {
      res.status(400).json("Wrong Credentials!");
    }
  }
};

export default handler;
