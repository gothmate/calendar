import { NextResponse } from 'next/server'
import mysql, { Pool } from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool: Pool = mysql.createPool({
    host: '127.0.0.1',
    user: process.env.HOMOLOGACAO_USERNAME!,
    password: process.env.HOMOLOGACAO_PASSWORD!,
    database: 'calendar'
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { nome, cpf, telefone, seguradora, plano, carteira } = body

        const query = `
            INSERT INTO pacientes (nome, cpf, telefone, seguradora, plano, carteira)
            VALUES (?, ?, ?, ?, ?, ?)
        `
        await pool.query(query, [nome, cpf, telefone, seguradora, plano, carteira])

        return NextResponse.json({ message: 'Paciente cadastrado com sucesso!' })
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao cadastrar paciente' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const query = `SELECT * FROM calendar.pacientes;`
        const data = await pool.query(query,[])
        return NextResponse.json({ res: data })
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao obter dados'}, { status: 500 })
    }
}
