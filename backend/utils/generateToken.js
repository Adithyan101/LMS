import jwt from "jsonwebtoken";

export const genrateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });


  return res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1day
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    })
    .json({ sucess: true, message, user });
};
