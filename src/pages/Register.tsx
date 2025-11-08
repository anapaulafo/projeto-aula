import { useState } from "react";
import "./../styles/Register.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        setMensagem("Usuário cadastrado com sucesso!");
        setUsuario("");
        setSenha("");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMensagem(data.message || "Erro ao cadastrar.");
      }
    } catch (erro) {
      console.error(erro);
      setMensagem("Erro de conexão com o servidor.");
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
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};
