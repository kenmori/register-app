
import { UserModel } from "entitiy/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import { UserResponse } from "types/UserResponse";
import { AuthInput } from "../types/AuthInput"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("input") { email, password }: AuthInput
  ): Promise<UserResponse> {
    // 1. check for an exsting email
    const existingUser = await UserModel.findOne({ email })
    if(existingUser){
      throw new Error("Email already in use")
    }
    // 2. create a new user with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword })
    await user.save()

    // 3. store user id on the token payload
    const payload = {
      id: user.id
    }

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || "afafafafafaf"
    );

    return { user, token };
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg("input") { email, password }: AuthInput
  ): Promise<UserResponse> {
    // 1. check for an exsting email
    const existingUser = await UserModel.findOne({ email })
    if(!existingUser){
      throw new Error("Invalid login")
    }
    // 2. check if the password is valid
    const valied = await bcrypt.compare(existingUser.password, password)

    if(!valied){
      throw new Error("password is invalid");
    }

    // 3. store user id on the token payload
    const payload = {
      id: existingUser.id
    }

    const token = jwt.sign(
      payload,
      process.env.SESSON_SCRET || "ffafafafafa"
    )
    return { user: existingUser.id, token };
  }
}
