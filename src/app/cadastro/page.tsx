'use client'

import { Header } from "@/components/Header"
import styles from "@/app/page.module.sass"
import style from "../../components/Calendar/page.module.sass"
import { ChangeEvent, useState } from "react"
import { ICadastro } from "@/types/interfaces"
import { capitalizeFirstLetter, formatarTelefone, formatCPF } from "@/wrappers/wrapperFunctions"
import Link from "next/link"

export default function Cadastro() {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState<string>('')
    const [phone, setPhone] = useState<number | null>(null)
    const [seguradora, setSeguradora] = useState('')
    const [plano, setPlano] = useState('')
    const [carteira, setCarteira] = useState('')

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
        setCpf('')
        setPhone(null)
        setSeguradora('')
        setPlano('')
        setCarteira('') 


    }

    function handleNome(e: ChangeEvent<HTMLInputElement>):void {
        setNome(e.target.value.toLowerCase())
    }
    function handleCpf(e: ChangeEvent<HTMLInputElement>):void {
        setCpf(e.target.value)
    }
    function handlePhone(e:string):void {
        setPhone(Number(e))
        console.log("Phone: ", phone)
    }
    function handleSeguradora(e: ChangeEvent<HTMLInputElement>):void {
        setSeguradora(e.target.value.toLowerCase())
    }
    function handlePlano(e: ChangeEvent<HTMLInputElement>):void {
        setPlano(e.target.value.toLowerCase())
    }
    function handleCarteira(e: ChangeEvent<HTMLInputElement>):void {
        setCarteira(e.target.value)
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
                value={capitalizeFirstLetter(nome)}
                placeholder="Nome completo"
              />
              <input
                type="text"
                name="cpf"
                className={`${styles.input} ${styles.invert}`}
                onChange={(e) => handleCpf(e)}
                value={formatCPF(cpf)}
                placeholder="CPF somente números"
              />
              <input
                type="text"
                name="telefone"
                className={`${styles.input} ${styles.invert}`}
                onChange={(e) => handlePhone(e.target.value.replace(/\D/g, ''))}
                value={formatarTelefone(String(phone).replace(/\D/g, ''))}
                placeholder="Somente números DDD+Telefone"
              />
              <input
                type="text"
                name="seguradora"
                className={`${styles.input} ${styles.invert}`}
                value={capitalizeFirstLetter(seguradora)}
                onChange={(e) => handleSeguradora(e)}
                placeholder="Seguradora"
              />
              <input
                type="text"
                name="plano"
                className={`${styles.input} ${styles.invert}`}
                onChange={(e) => handlePlano(e)}
                value={capitalizeFirstLetter(plano)}
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
              <Link href={'/'} className={styles.btnR}>Voltar</Link>
              <button type="submit" className={styles.btnG}>
                Enviar
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
