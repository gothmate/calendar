export class ValidaCPF {
    private cpfLimpo: string;
  
    constructor(private cpfEnviado: string) {
      this.cpfLimpo = cpfEnviado.replace(/\D+/g, '');
    }
  
    valida(): boolean {
      if (!this.cpfLimpo) return false;
      if (this.cpfLimpo.length !== 11) return false;
      if (this.isSequence()) return false;
  
      const cpfParcial = this.cpfLimpo.slice(0, -2);
      const digitoUm = this.criaDigito(cpfParcial);
      const digitoDois = this.criaDigito(cpfParcial + digitoUm);
      const novoCPF = cpfParcial + digitoUm + digitoDois;
  
      return novoCPF === this.cpfLimpo;
    }
  
    private isSequence(): boolean {
      const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
      return sequencia === this.cpfLimpo;
    }
  
    private criaDigito(cpfParcial: string): string {
      const cpfArray = Array.from(cpfParcial);
      let regressivo = cpfArray.length + 1;
  
      const total = cpfArray.reduce((ac, val) => {
        ac += regressivo * parseInt(val, 10);
        regressivo--;
        return ac;
      }, 0);
  
      const digito = 11 - (total % 11);
      return digito > 9 ? '0' : String(digito);
    }
  }
  