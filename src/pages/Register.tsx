import { useState, type FormEvent } from "react";
import "./../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"success" | "error" | "">("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        setMensagem("Usuário cadastrado com sucesso!");
        setTipoMensagem("success");
        setUsuario("");
        setSenha("");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMensagem(data.error || "Erro ao cadastrar.");
        setTipoMensagem("error");
      }
    } catch (erro) {
      console.error(erro);
      setMensagem("Erro de conexão com o servidor.");
      setTipoMensagem("error");
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p className={`mensagem ${tipoMensagem}`}>{mensagem}</p>}
          <p style={{ marginTop: "20px", textAlign: "center" }}>
          Já tem conta? <Link to="/login">Fazer login</Link>
      </p>
    </div>
    
  );
};