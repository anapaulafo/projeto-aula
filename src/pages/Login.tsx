import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      const resposta = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem("usuario", data.usuario);
        localStorage.setItem("userId", data.id.toString());
        localStorage.setItem("assistidos", JSON.stringify(data.assistidos || []));

        setUsuario("");
        setSenha("");
        navigate("/home");
      } else {
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

      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Não tem conta? <Link to="/register">Criar cadastro</Link>
      </p>
    </div>
  );
};
