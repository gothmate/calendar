'use client'

import { Header } from "@/components/Header"
import styles from "@/app/page.module.sass"
import style from "../../components/Calendar/page.module.sass"
import { ChangeEvent, useState } from "react"
import { ICadastro } from "@/types/interfaces"

export default function Cadastro() {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState<number | null>(null)
    const [phone, setPhone] = useState<number | null>(null)
    const [seguradora, setSeguradora] = useState('')
    const [plano, setPlano] = useState('')
    const [carteira, setCarteira] = useState<number | null>(null)

    async function cadastraPaciente(cadastro: ICadastro) {
      const res = await fetch('/api/db', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(cadastro),
      })
      return res.json()
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let cadastro: ICadastro = {
            nome: nome,
            cpf: cpf,
            telefone: phone,
            seguradora: seguradora,
            plano: plano,
            carteira: carteira
        }
        
        const res = await cadastraPaciente(cadastro)
        console.log(res)

        setNome('')
        setCpf(null)
        setPhone(null)
        setSeguradora('')
        setPlano('')
        setCarteira(null) 
    }

    function handleNome(e: ChangeEvent<HTMLInputElement>):void {
        setNome(e.target.value)
    }
    function handleCpf(e: ChangeEvent<HTMLInputElement>):void {
        setCpf(Number(e.target.value))
    }
    function handlePhone(e: ChangeEvent<HTMLInputElement>):void {
        setPhone(Number(e.target.value))
    }
    function handleSeguradora(e: ChangeEvent<HTMLInputElement>):void {
        setSeguradora(e.target.value)
    }
    function handlePlano(e: ChangeEvent<HTMLInputElement>):void {
        setPlano(e.target.value)
    }
    function handleCarteira(e: ChangeEvent<HTMLInputElement>):void {
        setCarteira(Number(e.target.value))
    }


  return (
    <>
      <Header />
      <main className={styles.main}>
        <div>
          <h1>Cadastros</h1>
          <form action="submit" onSubmit={handleSubmit} className={style.form}>
            <div className={styles.inputcontainer}>
              <input
                type="text"
                name="nome"
                className={`${styles.input} ${styles.invert}`}
                onChange={(e) => handleNome(e)}
                placeholder="Nome completo"
              />
              <input
                type="text"
                name="cpf"
                className={`${styles.input} ${styles.invert}`}
                onChange={(e) => handleCpf(e)}
                placeholder="CPF somente números"
              />
              <input
                type="text"
                name="telefone"
                className={`${styles.input} ${styles.invert}`}
                onChange={(e) => handlePhone(e)}
                placeholder="Telefone somente números"
              />
              <input
                type="text"
                name="seguradora"
                className={`${styles.input} ${styles.invert}`}
                onChange={(e) => handleSeguradora(e)}
                placeholder="Seguradora"
              />
              <input
                type="text"
                name="plano"
                className={`${styles.input} ${styles.invert}`}
                onChange={(e) => handlePlano(e)}
                placeholder="Plano"
              />
              <input
                type="text"
                name="carteira"
                className={`${styles.input} ${styles.invert}`}
                onChange={(e) => handleCarteira(e)}
                placeholder="Carteirinha somente números"
              />
            </div>
            <div className={styles.createBtn}>
              <button type="submit" className={styles.btn}>
                Enviar
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
