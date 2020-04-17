import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateAppointmentDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let valorInicial: Balance = {
      income: 0,
      outcome: 0,
      total: 0
    }

    const income = this.transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === "income") {
        return {
          income: accumulator.income += currentValue.value,
          outcome: accumulator.outcome,
          total: accumulator.total += currentValue.value
        }
      }

      if (currentValue.type === "outcome") {
        return {
          income: accumulator.income,
          outcome: accumulator.outcome += currentValue.value,
          total: accumulator.total -= currentValue.value
        }
      }

      return accumulator;
    }, valorInicial)

    console.log(income)

    return income;
  }

  public create({ title, value, type }: CreateAppointmentDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
