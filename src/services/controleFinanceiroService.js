const Transacao = require("../models/Transacao")

class ControleFinanceiro {
    constructor() {
        this.transacoes = []
    }

    adicionarReceita(descricao, valor) {
        if (valor <= 0) {
            throw new Error("Valor inválido")
        }

        this.transacoes.push(new Transacao(descricao, valor, "receita"))
    }

    adicionarDespesa(descricao, valor) {
        if (valor <= 0) {
            throw new Error("Valor inválido")
        }

        this.transacoes.push(new Transacao(descricao, valor, "despesa"))
    }

    calcularSaldo() {
        return this.transacoes.reduce((saldo, t) => {
            return t.tipo === "receita"
                ? saldo + t.valor
                : saldo - t.valor
        }, 0)
    }

    estaNoPrejuizo() {
        return this.calcularSaldo() < 0
    }

    listarTransacoes() {
        return this.transacoes
    }
}

module.exports = ControleFinanceiro