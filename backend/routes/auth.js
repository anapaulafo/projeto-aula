import express from "express";
import pkg from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
const { createClient } = pkg;

const router = express.Router();


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// CADASTRO
router.post("/register", async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ error: "Preencha usuário e senha." });
  }

  
  const { data: existente } = await supabase
    .from("oscars2025")
    .select("*")
    .eq("usuario", usuario)
    .single();

  if (existente) {
    return res.status(400).json({ error: "Usuário já cadastrado." });
  }

  
  const { error } = await supabase
    .from("oscars2025")
    .insert([{ usuario, senha, assistidos: [] }]);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao cadastrar usuário." });
  }

  res.json({ message: "Usuário cadastrado com sucesso!" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ error: "Preencha usuário e senha." });
  }

  try {
    // Busca apenas pelo usuário
    const { data, error } = await supabase
      .from("oscars2025")
      .select("*")
      .eq("usuario", usuario.trim())
      .single();

    if (error || !data) {
      return res.status(401).json({ error: "Usuário ou senha incorretos." });
    }

    // Compara a senha manualmente
    if (data.senha !== senha.trim()) {
      return res.status(401).json({ error: "Usuário ou senha incorretos." });
    }

  res.json({
  message: "Login realizado com sucesso!",
  id: data.id,
  usuario: data.usuario,
  assistidos: data.assistidos || []
});



  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
});




export default router;