import { useContextSelector } from 'use-context-selector'
import { Header } from '../../Components/Header';
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { Summary } from "../../Components/Summary";
import { SearchForm } from "./Components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

    return (
      <div>
        <Header />
        <Summary />
  
        <TransactionsContainer>
        <SearchForm />
          <TransactionsTable>
            <tbody>
              {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
              )
            })}
            </tbody>
          </TransactionsTable>
        </TransactionsContainer>
      </div>
    );
  }