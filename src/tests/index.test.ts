import request from 'supertest'
import { app } from "../app";
import { test,expect } from "vitest";


test("get products",()=>{
    expect(true);
})

test("Iniciar sesión de usuario", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({
        email: 'Fernandorar65@gmail.com',
        password: 'Mierdamierda123'
    });
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
});
