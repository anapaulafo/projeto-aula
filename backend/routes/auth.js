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
    // debug: log the received credentials
    console.log('[DEBUG] /login received body:', { usuario, senha });

    // fetch by usuario only, then compare senha server-side to help debug
    const { data, error } = await supabase
      .from("oscars2025")
      .select("*")
      .eq("usuario", usuario)
      .maybeSingle(); // evita erro se não encontrar

    // debug: log supabase response
    console.log('[DEBUG] supabase select returned:', { data, error });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar usuário." });
    }

    if (!data) {
      return res.status(401).json({ error: "Usuário ou senha incorretos." });
    }

    // compare password server-side (plain text comparison for now)
    if (data.senha !== senha) {
      console.log('[DEBUG] senha mismatch: sent="%s" stored="%s"', senha, data.senha);
      return res.status(401).json({ error: "Usuário ou senha incorretos." });
    }

    res.json({
      message: "Login realizado com sucesso!",
      user: {
        id: data.id,
        usuario: data.usuario,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

export default router;