import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      const resposta = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await resposta.json();
      console.log("Resposta do servidor:", data); // 👀 log para depuração

      if (resposta.ok) {
        setMensagem("Login realizado com sucesso!");
        localStorage.setItem("usuario", usuario); // sessão simples
        setUsuario("");
        setSenha("");

        setTimeout(() => navigate("/"), 1000);
      } else {
        // o backend retorna "error", não "message"
        setMensagem(data.error || data.message || "Usuário ou senha incorretos.");
      }
    } catch (erro) {
      console.error("Erro na conexão:", erro);
      setMensagem("Erro de conexão com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};