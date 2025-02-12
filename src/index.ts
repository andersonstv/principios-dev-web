import * as express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import { UserRepository } from "./repository/userRepository";

dotenv.config();

const app = express(); 
app.use(express.json());

const userRepository = new UserRepository();

app.post("/users", async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await userRepository.createUser(name, email, password);
        res.json(user);
    } catch (error: any) {      
        res.status(500).json({message: "Erro ao criar o usuário", error: error.message});
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        res.json(users);
    } catch (error:any) {
        res.status(500).json({message: "Erro ao buscar os usuários", error: error.message});
    }
});

sequelize.sync({force: true}).then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}).catch((error) => {
    console.log("Erro ao conectar com o banco de dados", error);
});