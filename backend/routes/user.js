import express from "express";
import pkg from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
const { createClient } = pkg;

const router = express.Router();


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// busca usuário por ID
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  const { data, error } = await supabase
    .from("oscars2025")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  res.json(data);
});

// toggle filme assistido
router.post("/watched", async (req, res) => {
  const { userId, movieId } = req.body;

  if (!userId || !movieId) {
    return res.status(400).json({ error: "userId e movieId são obrigatórios." });
  }


  const { data: user, error: userError } = await supabase
    .from("oscars2025")
    .select("*")
    .eq("id", userId)
    .single();

  if (userError || !user) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  let assistidos = user.assistidos || [];

 
  if (assistidos.includes(movieId)) {
    assistidos = assistidos.filter((id) => id !== movieId);
  } else {
    assistidos.push(movieId);
  }

 
  const { error: updateError } = await supabase
    .from("oscars2025")
    .update({ assistidos })
    .eq("id", userId);

  if (updateError) {
    return res.status(500).json({ error: "Erro ao atualizar assistidos." });
  }

  res.json({ success: true, assistidos });
});

export default router;
