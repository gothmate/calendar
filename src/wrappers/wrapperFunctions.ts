import { KeyboardEvent, MouseEvent } from 'react'
import { ValidaCPF } from './cpfValidator'

export function bloquearCopiarColar(event: KeyboardEvent<HTMLFormElement>) {
    if (event.ctrlKey && (event.key === 'c' || event.key === 'v')) {
        event.preventDefault()
        alert('Copiar e colar estão desativados neste formulário.')
    }
}

export function bloquearCliqueDireito(event: MouseEvent<HTMLElement>) {
    event.preventDefault()
    alert('Clique direito está desativado.')
}

export function capitalizeFirstLetter(str: string) {
    return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

export function setDate() {
    const dataOriginal = new Date()
    const horasAjustadas = dataOriginal.getUTCHours() - 3
    dataOriginal.setUTCHours(horasAjustadas)
    return dataOriginal.toISOString()
}

export function formatData(date: Date) {
    const newDate = new Date(date)
    const formmated = newDate.toISOString().split("T")[0]
    return formmated
}

export function formatCPF(str: string) {
    let cpfInput = str.replace(/\D/g, "")
    let formattedCpf = cpfInput
    
    if (cpfInput.length === 11) {
        formattedCpf = `${cpfInput.slice(0, 3)}.${cpfInput.slice(3, 6)}.${cpfInput.slice(6, 9)}-${cpfInput.slice(9)}`
        const testCpf = new ValidaCPF(formattedCpf)
        if(testCpf.valida()){
            return formattedCpf
        }
        alert("CPF inválido!")
        return ''
    }
    return formattedCpf
}

export function formatarTelefone(numero: string) {
    console.log("Número recebido:", numero)
    if (numero.length < 10) {
        return numero
    } 
    if(numero.length >= 10) {
        return numero.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    } 
}

export async function getCep(cep: string) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        console.log(data);
        
        return JSON.stringify(data);
    } catch (err) {
        console.log("Erro:", err);
        throw err;
    }
}