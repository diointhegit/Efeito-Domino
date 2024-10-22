
export default function Page() {
  return (
    <form>
      <label htmlFor="name">Nome:</label>
      <input type="text" id="name" name="name" required/>

      <label htmlFor="email">E-mail:</label>
      <input type="email" id="email" name="email" required/>

      <label htmlFor="dob">Data de Nascimento:</label>
      <input type="date" id="dob" name="dob" required/>

      <label htmlFor="password">Senha:</label>
      <input type="password" id="password" name="password" required/>

      <label htmlFor="confirmPassword">Confirmação de Senha:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required/>

      <button type="submit">Cadastrar</button>
    </form>
  )
}
