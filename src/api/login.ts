import request from "@/utils/request";
import { LoginRequest, LoginResponse } from "@/api/schema/loginSchema";
import { Rows } from "@/api/schema/indexSchema";

export function login(params: LoginRequest): Promise<Rows<LoginResponse>>{
    return request.post("/user/PC/loginSuccess", params)
}