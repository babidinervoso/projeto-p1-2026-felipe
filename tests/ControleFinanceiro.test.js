const ControleFinanceiro = require("../src/services/controleFinanceiroService")

describe("Sistema de Controle Financeiro", () => {

    test("1 - Inicia com saldo 0", () => {
        const sistema = new ControleFinanceiro()
        expect(sistema.calcularSaldo()).toBe(0)
    })

    test("2 - Adicionar receita aumenta saldo", () => {
        const sistema = new ControleFinanceiro()
        sistema.adicionarReceita("Salário", 1000)
        expect(sistema.calcularSaldo()).toBe(1000)
    })

    test("3 - Adicionar despesa diminui saldo", () => {
        const sistema = new ControleFinanceiro()
        sistema.adicionarDespesa("Conta", 200)
        expect(sistema.calcularSaldo()).toBe(-200)
    })

    test("4 - Saldo correto com múltiplas transações", () => {
        const sistema = new ControleFinanceiro()
        sistema.adicionarReceita("Salário", 1000)
        sistema.adicionarDespesa("Aluguel", 500)
        expect(sistema.calcularSaldo()).toBe(500)
    })

    test("5 - Sistema detecta prejuízo", () => {
        const sistema = new ControleFinanceiro()
        sistema.adicionarDespesa("Conta", 300)
        expect(sistema.estaNoPrejuizo()).toBe(true)
    })

    test("6 - Sistema não está em prejuízo quando saldo positivo", () => {
        const sistema = new ControleFinanceiro()
        sistema.adicionarReceita("Venda", 300)
        expect(sistema.estaNoPrejuizo()).toBe(false)
    })

    test("7 - Não permite receita negativa", () => {
        const sistema = new ControleFinanceiro()
        expect(() => sistema.adicionarReceita("Erro", -10)).toThrow()
    })

    test("8 - Não permite despesa negativa", () => {
        const sistema = new ControleFinanceiro()
        expect(() => sistema.adicionarDespesa("Erro", -10)).toThrow()
    })

    test("9 - Lista transações corretamente", () => {
        const sistema = new ControleFinanceiro()
        sistema.adicionarReceita("Salário", 1000)
        expect(sistema.listarTransacoes().length).toBe(1)
    })

    test("10 - Saldo zero quando receita e despesa iguais", () => {
        const sistema = new ControleFinanceiro()
        sistema.adicionarReceita("Salário", 500)
        sistema.adicionarDespesa("Conta", 500)
        expect(sistema.calcularSaldo()).toBe(0)
    })
})